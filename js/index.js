const formulario = document.getElementById("formulario");
const usuario = formulario.usuario;
const password = formulario.password;
const inputs = document.getElementsByTagName("input");
const expresiones = {
  usuario: /^[a-zA-Z0-9]{4,20}$/,
  password: /^[a-zA-Z0-9]{6,10}$/,
};
const validaciones = {
  usuario: false,
  password: false,
};

function limpiarInputs() {
  usuario.value = "";
  password.value = "";
}

function asignarEventosInputs() {
  limpiarInputs();
  for (let index = 0; index < inputs.length; index++) {
    inputs[index].addEventListener("blur", validarFormulario);
    inputs[index].addEventListener("keyup", validarFormulario);
  }
}

function validarFormulario(e) {
  switch (e.target.id) {
    case "usuario":
      validarCampo(
        usuario.value,
        expresiones.usuario,
        "error_usuario",
        "usuario"
      );
      break;
    case "password":
      validarCampo(
        password.value,
        expresiones.password,
        "error_password",
        "password"
      );
      break;
    default:
      break;
  }
}

function validarCampo(valor, expresion, textoSpan, nombre) {
  let span = document.getElementById(textoSpan);
  if (!expresion.test(valor)) {
    span.style.display = "block";
    validaciones[nombre] = false;
  } else {
    span.style.display = "none";
    validaciones[nombre] = true;
  }
}

function enviarFormulario(e) {
  let contador = 0;
  for (let key in validaciones) {
    if (validaciones[key] === true) {
      contador++;
    }
  }
  if (contador === 2) {
    e.target.submit();
    e.target.reset();
  } else {
    document.getElementById("error_usuario").style.display = "block";
    document.getElementById("error_password").style.display = "block";
  }
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  enviarFormulario(e);
});

asignarEventosInputs();

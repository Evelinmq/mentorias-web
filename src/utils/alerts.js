import Swal from "sweetalert2";

/* CONFIGURACIÓN GLOBAL PARA TODAS LAS ALERTAS*/
export const swalBase = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    confirmButton: "swal-confirm-btn",
    cancelButton: "swal-cancel-btn"
  }
});


export const alertaCamposCaracteres = (mensaje = "Solo se permiten letras en este campo") => {
  return swalBase.fire({
    icon: "error",
    title: "Error",
    text: mensaje
  });
};

export const alertaCamposVacios = () => {
  return swalBase.fire({
    icon: "warning",
    title: "Campos incompletos",
    text: "Debes completar todos los campos del formulario"
  });
};

export const alertaExito = (mensaje = "Operación realizada correctamente") => {
  return swalBase.fire({
    icon: "success",
    title: "Éxito",
    text: mensaje
  });
};

export const alertaError = (mensaje = "Ocurrió un error") => {
  return swalBase.fire({
    icon: "error",
    title: "Error",
    text: mensaje
  });
};

export const confirmarEliminar = async () => {

  const resultado = await swalBase.fire({
    icon: "warning",
    title: "¿Eliminar registro?",
    text: "Esta acción no se puede deshacer",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  });

  return resultado.isConfirmed;
};

export const confirmarDesactivarUsuario = async () => {

  const resultado = await swalBase.fire({
    icon: "question",
    title: "¿Desactivar usuario?",
    text: "El usuario no podrá acceder al sistema",
    showCancelButton: true,
    confirmButtonText: "Desactivar",
    cancelButtonText: "Cancelar"
  });

  return resultado.isConfirmed;
};

export const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
});

export const confirmarRechazarSolicitud = async () => {
  return await Swal.fire({
    title: "¿Rechazar solicitud?",
    text: "El usuario no será aceptado en el sistema",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Rechazar",
    cancelButtonText: "Cancelar",
    customClass: {
      confirmButton: "swal-confirm-btn",
      cancelButton: "swal-cancel-btn"
    },
    buttonsStyling: false
  }).then(result => result.isConfirmed);
};

//Esto es lo qi deben importar en sus archivos para hacer uso de las alertas:
// import { ... } from "../../utils/alerts";

//Los estilos css para las alertas se encuentran dentro de App.css
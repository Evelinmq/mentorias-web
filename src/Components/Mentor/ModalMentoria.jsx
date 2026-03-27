import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Input from "../Common/Input";   
import Button from "../Common/Input"; 
import "../Admin/ModalesGlobal.css";

function ModalMentoria({ cerrar }) {
  const { register, handleSubmit } = useForm();

  const validacionTexto = {
    required: "Este campo es obligatorio",
    pattern: {
      value: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+(?: [a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]+)*$/,
      message: "No se permiten caracteres especiales ni espacios vacíos"
    }
  };

  const alEnviar = (data) => {
    Swal.fire({
      title: "¡Guardado!",
      text: "La mentoría se registró con éxito.",
      icon: "success",
      confirmButtonColor: "#28a745"
    }).then(() => cerrar());
  };

  const alFallar = () => {
    Swal.fire({
      title: "Datos inválidos",
      text: "Revisa que no existan caracteres especiales o campos vacíos.",
      icon: "error",
      confirmButtonColor: "#dc3545"
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Agregar mentoría</h2>

        <form className="modal-grid" onSubmit={handleSubmit(alEnviar, alFallar)}>
          <div className="modal-column">
            {/* Usando tu componente Input */}
            <Input type="date" name="fecha" register={register} rules={{ required: true }} />
            <Input type="time" name="horaInicio" register={register} rules={{ required: true }} />
            <Input type="time" name="horaFin" register={register} rules={{ required: true }} />

            <select className="modal-select" {...register("edificio", { required: true })}>
              <option value="">Edificio</option>
              <option value="A">Edificio A</option>
            </select>
          </div>

          <div className="modal-column">
            <select className="modal-select" {...register("cuatri", { required: true })}>
              <option value="">Cuatrimestre</option>
              <option value="1">1ero</option>
            </select>

            <select className="modal-select" {...register("materia", { required: true })}>
              <option value="">Materia</option>
              <option value="Programacion">Programación</option>
            </select>

            <select className="modal-select" {...register("aula", { required: true })}>
              <option value="">Aula</option>
              <option value="101">101</option>
            </select>
          </div>

          <div className="modal-actions">
            <Button 
              text="Cancelar" 
              className="btn-cancelar" 
              onClick={cerrar} 
            />
            <Button 
              text="Guardar" 
              type="submit" 
              className="btn-guardar" 
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalMentoria;
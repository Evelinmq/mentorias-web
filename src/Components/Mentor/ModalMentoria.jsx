import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Common/Input";
import "../Admin/ModalesGlobal.css";

import { enviarDatos } from "../../utils/api";

import {
  alertaExito,
  alertaError,
  alertaCamposVacios
} from "../../utils/alerts";

function ModalMentoria({ cerrar, fechaPredefinida }) {
  const hoy = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fecha: fechaPredefinida || hoy,
    },
  });

  const soloTexto = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/;

  const alEnviar = async (data) => {
    try {
      if (data.horaFin <= data.horaInicio) {
        await alertaError("La hora fin debe ser mayor a la hora inicio");
        return;
      }

      const payload = {
        ...data,
        aula: parseInt(data.aula),
      };
      await enviarDatos("/api/mentorias", payload);

      await alertaExito("La mentoría se registró con éxito");

      cerrar();

    } catch (error) {
      console.error(error);
      await alertaError("No se pudo guardar la mentoría");
    }
  };

  const onError = async () => {
    await alertaCamposVacios();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container-custom">
        <h2 className="modal-title">Agregar mentoría</h2>

        <form onSubmit={handleSubmit(alEnviar, onError)}>
          <div className="modal-grid">

            {/* IZQUIERDA */}
            <div className="modal-column">

              <div className="form-group">
                <label>Fecha</label>
                <Input
                  type="date"
                  name="fecha"
                  register={register}
                  rules={{ required: "La fecha es obligatoria" }}
                  min={hoy}
                />
                {errors.fecha && <span className="error">{errors.fecha.message}</span>}
              </div>

              <div className="form-group">
                <label>Hora inicio</label>
                <Input
                  type="time"
                  name="horaInicio"
                  register={register}
                  rules={{ required: "Hora inicio obligatoria" }}
                />
                {errors.horaInicio && <span className="error">{errors.horaInicio.message}</span>}
              </div>

              <div className="form-group">
                <label>Hora fin</label>
                <Input
                  type="time"
                  name="horaFin"
                  register={register}
                  rules={{ required: "Hora fin obligatoria" }}
                />
                {errors.horaFin && <span className="error">{errors.horaFin.message}</span>}
              </div>

              <div className="form-group">
                <label>Edificio</label>
                <select
                  className="modal-select"
                  {...register("edificio", {
                    required: "Selecciona un edificio",
                  })}
                >
                  <option value="">Selecciona</option>
                  <option value="A">Edificio A</option>
                </select>
                {errors.edificio && <span className="error">{errors.edificio.message}</span>}
              </div>

            </div>

            {/* DERECHA */}
            <div className="modal-column">

              <div className="form-group">
                <label>Cuatrimestre</label>
                <select
                  className="modal-select"
                  {...register("cuatri", {
                    required: "Selecciona un cuatrimestre",
                  })}
                >
                  <option value="">Selecciona</option>
                  <option value="1">1ero</option>
                </select>
                {errors.cuatri && <span className="error">{errors.cuatri.message}</span>}
              </div>

              <div className="form-group">
                <label>Materia</label>
                <Input
                  type="text"
                  name="materia"
                  register={register}
                  rules={{
                    required: "La materia es obligatoria",
                    pattern: {
                      value: soloTexto,
                      message: "No se permiten caracteres especiales",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "No puede estar vacío",
                  }}
                />
                {errors.materia && <span className="error">{errors.materia.message}</span>}
              </div>

              <div className="form-group">
                <label>Aula</label>
                <Input
                  type="text"
                  name="aula"
                  register={register}
                  rules={{
                    required: "El aula es obligatoria",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Solo números permitidos",
                    },
                  }}
                />
                {errors.aula && <span className="error">{errors.aula.message}</span>}
              </div>

            </div>

          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={cerrar}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalMentoria;
import React from "react";
import { useForm } from "react-hook-form";
import Input from "../Common/Input";
import "../Admin/ModalesGlobal.css";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { enviarDatos } from "../../utils/api";
import { useEffect, useState } from "react";
import { obtenerDatos } from "../../utils/api";

import {
  alertaExito,
  alertaError,
  alertaCamposVacios
} from "../../utils/alerts";

function ModalMentoria({ cerrar, fechaPredefinida, usuario }) {
  const hoy = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
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
    if (!usuario?.id) {
      await alertaError("Usuario no válido");
      return;
    }

    if (data.horaFin <= data.horaInicio) {
      await alertaError("La hora fin debe ser mayor a la hora inicio");
      return;
    }

    const formatearHora = (hora) => hora + ":00";

    const payload = {
      fecha: data.fecha,
      horaInicio: formatearHora(data.horaInicio),
      horaFin: formatearHora(data.horaFin),

      cuatrimestre: parseInt(data.cuatri),
      cupo: 5,
      mentor: { id: usuario.id },

      espacio: { id: parseInt(data.aula) },
      materia: { id: parseInt(data.materia) }
    };

    console.log("PAYLOAD:", payload);

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

  const [edificios, setEdificios] = useState([]);
  const [cuatrimestres, setCuatrimestres] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [aulasFiltradas, setAulasFiltradas] = useState([]);

  const edificioSeleccionado = watch("edificio");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const ed = await obtenerDatos("/api/edificios");
        const ma = await obtenerDatos("/api/materias");
        const au = await obtenerDatos("/api/espacios");
        const cuatrisUnicos = [...new Set(ma.map(m => m.cuatrimestre))];

        console.log("EDIFICIOS:", ed);
        console.log("MATERIAS:", ma);
        console.log("AULAS:", au);

        setEdificios(ed);
        setCuatrimestres(cuatrisUnicos);
        setMaterias(ma);
        setAulas(au);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  useEffect(() => {
    if (!edificioSeleccionado) {
      setAulasFiltradas([]);
      return;
    }

    const edificio = edificios.find(
        (e) => String(e.id) === String(edificioSeleccionado)
    );

    if (edificio && edificio.espacios) {
      setAulasFiltradas(edificio.espacios);
    } else {
      setAulasFiltradas([]);
    }
  }, [edificioSeleccionado, edificios]);


  const horaInicioActu = watch("horaInicio");
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
                  rules={{
                    required: "Hora fin obligatoria",
                    validate: (value) => {
                      if (!horaInicioActu) return true;
                      return value > horaInicioActu || "La hora fin debe ser mayor a la hora inicio";
                    }
                  }}
                />
                {errors.horaFin && <span className="error">{errors.horaFin.message}</span>}
              </div>

              <div className="form-group">
                <label className="label">Edificio</label>
                <select className="modal-select"
                  {...register("edificio", { required: true })}>
                  <option value="">Selecciona</option>
                  {edificios.map((ed) => (
                    <option key={ed.id} value={ed.id}>
                      {ed.nombre}
                    </option>
                  ))}
                </select>
                {errors.edificio && <span className="error">{errors.edificio.message}</span>}
              </div>

            </div>

            {/* DERECHA */}
            <div className="modal-column">

              <div className="form-group">
                <label>Cuatrimestre</label>
                <select {...register("cuatri", { required: true })}>
                  <option value="">Selecciona</option>
                  {cuatrimestres.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.cuatri && <span className="error">{errors.cuatri.message}</span>}
              </div>

              <div className="form-group">
                <label>Materia</label>
                <select {...register("materia", { required: true })}>
                  <option value="">Selecciona</option>
                  {materias.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
                {errors.materia && <span className="error">{errors.materia.message}</span>}
              </div>

              <div className="form-group">
                <label>Aula</label>
                <select {...register("aula", { required: true })}
                        disabled={!edificioSeleccionado}>
                  <option value="">
                    {!edificioSeleccionado
                        ? "Primero selecciona edificio"
                        : aulasFiltradas.length === 0
                            ? "No hay aulas"
                            : "Selecciona"}
                  </option>
                  {aulasFiltradas.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
                </select>
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
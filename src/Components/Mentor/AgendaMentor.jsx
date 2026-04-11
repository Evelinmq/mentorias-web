import MentoriaCard from "../Common/MentoriaCard";
import { useEffect, useState } from "react";
import { obtenerDatos } from "../../utils/api";

function AgendaMentor({ mentorias, diaSeleccionado, onAceptar, onCancelar }) {
  const fechaSeleccionada = diaSeleccionado
    ? new Date(diaSeleccionado).toISOString().split("T")[0]
    : null;

  const mentoriasDelDia = mentorias.filter((m) => m.fecha === fechaSeleccionada);
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    const cargarEdificios = async () => {
      try {
        const data = await obtenerDatos("/api/edificios");
        setEdificios(data);
      } catch (error) {
        console.error("Error cargando edificios:", error);
      }
    };

    cargarEdificios();
  }, []);

  return (
    <div className="agenda-container">
      <h3 className="agenda-title">Agenda</h3>

      {diaSeleccionado && mentoriasDelDia.length > 0 ? (
        mentoriasDelDia.map((m, index) => (
          <MentoriaCard
            key={m.id}
            m={m}
            edificios={edificios}
            onAceptar={onAceptar}
            onCancelar={onCancelar}
          />
        ))
      ) : (
        <p className="no-data">No hay mentorías para este día</p>
      )}
    </div>
  );
}

export default AgendaMentor;
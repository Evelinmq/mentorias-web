import MentoriaCard from "../Common/MentoriaCard";

function AgendaMentor({ mentorias, diaSeleccionado, onAceptar, onCancelar }) {
  const fechaSeleccionada = diaSeleccionado
    ? new Date(diaSeleccionado).toISOString().split("T")[0]
    : null;

  const mentoriasDelDia = mentorias.filter((m) => m.fecha === fechaSeleccionada);

  return (
    <div className="agenda-container">
      <h3 className="agenda-title">Agenda</h3>

      {diaSeleccionado && mentoriasDelDia.length > 0 ? (
        mentoriasDelDia.map((m, index) => (
          <MentoriaCard
            key={m.id}
            m={m}
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
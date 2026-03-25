import React from "react";

const MentoriaCard = ({ data, extraContent, status }) => {
  return (
    <div className="mentoria-card">
      {status && <div className={`card-status-dot ${status}`} />}

      <div className="card-header">
        <span className="card-email">{data.email}</span>
        <span className="card-fecha">{data.fecha}</span>
      </div>

      <p className="card-nombre">{data.nombre}</p>

      <hr className="card-divider" />

      <div className="card-field">
        <span className="card-label">Materia:</span>
        <span className="card-value">{data.materia}</span>
      </div>

      {data.tema && (
        <div className="card-field">
          <span className="card-label">Tema:</span>
          <span className="card-value">{data.tema}</span>
        </div>
      )}

      {extraContent}

      <div className="card-meta">
        <span className="card-meta-item">{data.aula}</span>
        <span className="card-meta-item">{data.hora}</span>
      </div>
    </div>
  );
};

export default MentoriaCard;
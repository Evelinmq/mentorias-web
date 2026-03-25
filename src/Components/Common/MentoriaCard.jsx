import React from "react";

const IconAula = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
    </svg>
);

const IconHora = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

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
                <span className="card-meta-item">
                    <IconAula /> {data.aula}
                </span>
                <span className="card-meta-item">
                    <IconHora /> {data.hora}
                </span>
            </div>
        </div>
    );
};

export default MentoriaCard;
// AprendizCard.jsx
import React from "react";

const IconAula = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconHora = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const IconPersonas = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const AprendizCard = ({ m, extraContent }) => {
    // Formatear fecha a DD/MM/AAAA si viene como YYYY-MM-DD
    const formatearFecha = (fechaStr) => {
        if(!fechaStr) return "";
        const [y, m, d] = fechaStr.split('-');
        return `${d}/${m}/${y}`;
    };

    return (
        <div className="card-agenda-custom">
            {/* Línea lateral de color */}
            <div className="card-status-sidebar"></div>

            <div className="card-content-wrapper">
                {/* Header: Email y Fecha */}
                <div className="card-header-top">
                    <span className="mentor-email">{m?.mentor?.correo || "usuario@utez.edu.mx"}</span>
                    <span className="fecha-top">{formatearFecha(m?.fecha)}</span>
                </div>

                {/* Nombre del Mentor y Cupo al mismo nivel */}
                <div className="card-row-principal">
                    <h2 className="mentor-name-title">
                        {m?.mentor ? `${m.mentor.nombre} ${m.mentor.apellidoP}` : "Sin nombre"}
                    </h2>
                    <div className="cupo-indicator">
                        <IconPersonas />
                        <span>{m?.inscritos || 0}/{m?.cupo || 5}</span>
                    </div>
                </div>

                <hr className="card-divider" />

                {/* Materia */}
                <div className="materia-section">
                    <p className="label-small">Materia:</p>
                    <h3 className="materia-name">{m?.materia?.nombre || "Sin Materia"}</h3>
                </div>

                {/* Espacio para el Input (TemaInput) */}
                {extraContent && (
                    <div className="extra-content-area">
                        {extraContent}
                    </div>
                )}

                {/* Footer: Aula y Horario */}
                <div className="card-footer-info">
                    <div className="info-item-footer">
                        <IconAula />
                        <span>{m?.espacio?.nombre || "Por asignar"}</span>
                    </div>
                    <div className="info-item-footer">
                        <IconHora />
                        <span>{m?.horaInicio?.slice(0, 5)} - {m?.horaFin?.slice(0, 5)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AprendizCard;
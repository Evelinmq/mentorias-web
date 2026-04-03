import React from "react";

const IconAula = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: '5px' }}>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconHora = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginRight: '5px' }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const ESTADO_CONFIG = {
    'aceptada':    { color: '#22c55e' },
    'agendada':    { color: '#22c55e' },
    'pendiente':   { color: '#64748b' },
    'cancelada':   { color: '#ef4444' },
    'sin alumnos': { color: '#94a3b8' },
};

const MentoriaCard = ({ m, onAceptar, onCancelar, extraContent, tema }) => {
    const estadoNombre = m?.estado?.nombre?.toLowerCase() || 'pendiente';
    const { color: estadoColor } = ESTADO_CONFIG[estadoNombre] || ESTADO_CONFIG['pendiente'];

    return (
        <div className="card-agenda" style={{ borderLeft: `4px solid ${estadoColor}` }}>
            <div className="card-header">
                <span className="mentor-email">{m?.mentor?.email || "usuario@utez.edu.mx"}</span>
                <span className="fecha-card">{m?.fecha}</span>
            </div>

            <div className="card-body">
                {/* Nombre + dot */}
                <div className="info-principal">
                    <h4>{m?.mentor ? `${m.mentor.nombre} ${m.mentor.apellidoP}` : "Sin nombre"}</h4>
                    <div className="status-dot" style={{ backgroundColor: estadoColor }} />
                </div>

                {/* Materia */}
                <div className="detalle-row">
                    <span className="label">Materia:</span>
                    <span className="valor">{m?.materia?.nombre || "N/A"}</span>
                </div>

                {/* Tema — solo si existe */}
                {(tema || m?.temas?.length > 0) && (
                    <div className="detalle-row">
                        <span className="label">Tema:</span>
                        <span className="valor">
                            {tema || m?.temas?.[0]?.nombre || "Sin tema"}
                        </span>
                    </div>
                )}

                {/* Espacio y hora */}
                <div className="icon-info-grid">
                    <div className="icon-item">
                        <IconAula />
                        <span>{m?.espacio?.nombre || "Por asignar"}</span>
                    </div>
                    <div className="icon-item">
                        <IconHora />
                        <span>{m?.horaInicio?.slice(0, 5)} - {m?.horaFin?.slice(0, 5)}</span>
                    </div>
                </div>

                {/* Contenido dinámico */}
                {extraContent && (
                    <div className="extra-content">{extraContent}</div>
                )}

                {/* Botones — solo si se pasan las funciones */}
                {(onAceptar || onCancelar) && (
                    <div className="comentario-section">
                        <div className="card-buttons">
                            {onAceptar && (
                                <button className="btn-aceptar" onClick={() => onAceptar?.(m.id)}>
                                    Aceptar
                                </button>
                            )}
                            {onCancelar && (
                                <button className="btn-cancelar-agenda" onClick={() => onCancelar?.(m.id)}>
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentoriaCard;
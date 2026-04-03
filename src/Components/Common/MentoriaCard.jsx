import React from "react";

// Iconos 
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

const MentoriaCard = ({ m, onAceptar, onCancelar }) => {
    const nombreEstadoBD = m.estado?.nombre?.toLowerCase().trim() || '';

    const mappingEstados = {
        'aceptada': 'aceptadas',
        'cancelada': 'canceladas',
        'pendiente': 'pendientes',
        'sin alumnos': 'sin-alumnos',
        'por aceptar': 'pendientes'
    };

    const estadoClase = mappingEstados[nombreEstadoBD] || 'sin-alumnos';

    return (
        <div className={`card-agenda ${estadoClase}`}>
            <div className="card-header">
                <span className="mentor-email">{m.alumno?.email || "Espacio libre"}</span>
                <span className="fecha-card">{m.fecha}</span>
            </div>

            <div className="card-body">
                <div className="info-principal">
                    <h4>{m.alumno?.nombre || "Disponible"}</h4>
                    <span className={`status-dot ${estadoClase}`}></span>
                </div>

                <div className="detalle-row">
                    <span className="label">Materia:</span>
                    <span className="valor">{m.materia?.nombre || "N/A"}</span>
                </div>

                <div className="detalle-row">
                    <span className="label">Tema:</span>
                    <span className="valor">{m.tema || "Sin tema especificado"}</span>
                </div>

                <div className="icon-info-grid">
                    <div className="icon-item">
                        <IconAula />
                        <span>{m.espacio?.nombre || "Por asignar"}</span>
                    </div>
                    <div className="icon-item">
                        <IconHora />
                        <span>{m.horaInicio?.slice(0, 5)} - {m.horaFin?.slice(0, 5)}</span>
                    </div>
                </div>

                <div className="comentario-section">
                    <div className="input-group">
                        <label>Comentario</label>
                        <input type="text" placeholder="Razón de asesoría..." disabled />
                    </div>

                    <div className="card-buttons">
                        {nombreEstadoBD !== 'cancelada' ? (
                            <>
                                {(nombreEstadoBD === 'pendiente' || nombreEstadoBD === 'por aceptar') && (
                                    <button className="btn-aceptar" onClick={() => onAceptar(m.id)}>
                                        Aceptar
                                    </button>
                                )}
                                <button className="btn-cancelar-agenda" onClick={() => onCancelar(m.id)}>
                                    {nombreEstadoBD === 'sin alumnos' ? 'Eliminar' : 'Cancelar'}
                                </button>
                            </>
                        ) : ( 
                            <span className="texto-cancelado">Asesoría Cancelada</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentoriaCard;
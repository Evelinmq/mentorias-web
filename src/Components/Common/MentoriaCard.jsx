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

    const mentor = m.mentor;

    const alumnosActuales = m.alumnos?.length || 0;
    const cupo = m.cupo ?? 5;
    const cupoLleno = alumnosActuales >= cupo;

    const estadoNombre = m.estado?.nombre?.toLowerCase() || '';

    let estadoClase = 'sin-alumnos';

    if (alumnosActuales > 0) {
        estadoClase = 'pendientes';
    }

    if (estadoNombre.includes('aceptada')) {
        estadoClase = 'aceptadas';
    }

    if (estadoNombre.includes('cancelada')) {
        estadoClase = 'canceladas';
    }

    if (cupoLleno && estadoClase === 'pendientes') {
        estadoClase = 'aceptadas';
    }

    return (
        <div className={`card-agenda ${estadoClase}`}>
            <div className="card-header">
                <span className="mentor-email">{mentor?.correo}</span>
                <span className="fecha-card">{m.fecha}</span>
            </div>

            <div className="card-body">
                <div className="info-principal">
                    <h4>{mentor?.nombre}</h4>
                    <span className={`status-dot ${estadoClase}`}></span>
                </div>

                <div className="detalle-row space-between">
                    <div>
                        <span className="label">Materia:</span>
                        <span className="valor"> {m.materia?.nombre || "N/A"}</span>
                    </div>

                    <div>
                        <span className="label">Alumnos:</span>
                        <span className="valor"> {alumnosActuales}/{cupo}</span>
                    </div>
                </div>

                <div className="detalle-row">
                    <span className="label">Tema:</span>
                    <span className="valor">
                        {m.temas?.length > 0
                            ? m.temas[0].nombre
                            : "Sin tema especificado"}
                    </span>
                </div>

                <div className="icon-info-grid">
                    <div className="icon-item">
                        <IconAula />
                        <span>{m.espacio?.nombre || "Por asignar"}</span>
                    </div>
                    <div className="icon-item">
                        <IconHora />
                        <span>
                            {m.horaInicio?.slice(0, 5)} - {m.horaFin?.slice(0, 5)}
                        </span>
                    </div>
                </div>

                <div className="comentario-section">
                    <label>Comentario</label>

                    <div className="comentario-row">
                        <input
                            type="text"
                            placeholder="Razón de asesoría..."
                            disabled
                        />

                        {estadoClase !== 'canceladas' ? (
                            <>
                                {estadoClase === 'pendientes' && !cupoLleno && (
                                    <button
                                        className="btn-aceptar"
                                        onClick={() => onAceptar(m.id)}
                                    >
                                        Aceptar
                                    </button>
                                )}

                                {!cupoLleno && (
                                    <button
                                        className="btn-cancelar-agenda"
                                        onClick={() => onCancelar(m.id)}
                                    >
                                        {estadoClase === 'sin-alumnos'
                                            ? 'Eliminar'
                                            : 'Cancelar'}
                                    </button>
                                )}
                            </>
                        ) : (
                            <span className="texto-cancelado">
                                Asesoría Cancelada
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentoriaCard;
// AprendizCard.jsx
import React from "react";

const IconAula = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconHora = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const IconPersonas = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const AprendizCard = ({ m, extraContent, variant = "solicitar" }) => {
    if (!m) return null; // 🔥 PROTECCIÓN TOTAL

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return "";
        const [y, mo, d] = fechaStr.split("-");
        return `${d}/${mo}/${y}`;
    };

    const estatus = m?.estatus === "confirmada" ? "confirmada" : "por-aceptar";
    const isAgendada = variant === "agendada";

    const accentClass = isAgendada
        ? estatus === "confirmada"
            ? "aprendiz-card__accent--confirmada"
            : "aprendiz-card__accent--por-aceptar"
        : "aprendiz-card__accent--solicitar";

    const mentorNombre = m?.mentor?.nombre || "";
    const iniciales = mentorNombre ? mentorNombre.charAt(0).toUpperCase() : "M";

    return (
        <div className={`aprendiz-card ${isAgendada ? "aprendiz-card--agendada" : ""}`}>
            <div className={`aprendiz-card__accent ${accentClass}`} />

            <div className="aprendiz-card__body">

                <div className="aprendiz-card__header">
                    <span className="aprendiz-card__email">
                        {m?.mentor?.correo || "usuario@utez.edu.mx"}
                    </span>
                    <div className="aprendiz-card__header-right">
                        <span className="aprendiz-card__fecha">
                            {formatearFecha(m?.fecha)}
                        </span>
                        {isAgendada && (
                            <span className={`aprendiz-card__status-dot aprendiz-card__status-dot--${estatus}`} />
                        )}
                    </div>
                </div>

                <div className="aprendiz-card__principal">
                    <h2 className="aprendiz-card__nombre">
                        {m?.mentor
                            ? `${m.mentor.nombre} ${m.mentor.apellidoP}`
                            : "Sin nombre"}
                    </h2>
                    {!isAgendada && (
                        <div className="aprendiz-card__cupo">
                            <IconPersonas />
                            <span>{m?.inscritos || 0}/{m?.cupo || 5}</span>
                        </div>
                    )}
                </div>

                <hr className="aprendiz-card__divider" />

                <div className="aprendiz-card__field">
                    <p className="aprendiz-card__label">Materia:</p>
                    <span className="aprendiz-card__value">
                        {m?.materia?.nombre || "Sin Materia"}
                    </span>
                </div>

                {isAgendada && m?.tema && (
                    <div className="aprendiz-card__field">
                        <p className="aprendiz-card__label">Tema:</p>
                        <span className="aprendiz-card__value aprendiz-card__value--tema">
                            {m.tema}
                        </span>
                    </div>
                )}

                {!isAgendada && extraContent && (
                    <div className="aprendiz-card__input-area">
                        {extraContent}
                    </div>
                )}

                <div className="aprendiz-card__footer">
                    <div className="aprendiz-card__footer-info">
                        <div className="aprendiz-card__footer-item">
                            <IconAula />
                            <span>{m?.espacio?.nombre || "Por asignar"}</span>
                        </div>

                        <div className="aprendiz-card__footer-item">
                            <IconHora />
                            <span>
                                {(typeof m?.horaInicio === "string" ? m.horaInicio.slice(0, 5) : "-")}
                                {" - "}
                                {(typeof m?.horaFin === "string" ? m.horaFin.slice(0, 5) : "")}
                            </span>
                        </div>
                    </div>

                    {isAgendada && (
                        <div className="aprendiz-card__avatar">
                            {m?.mentor?.foto ? (
                                <img
                                    src={m.mentor.foto}
                                    alt={mentorNombre}
                                    className="aprendiz-card__avatar-img"
                                />
                            ) : (
                                <span className="aprendiz-card__avatar-inicial">
                                    {iniciales}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AprendizCard;
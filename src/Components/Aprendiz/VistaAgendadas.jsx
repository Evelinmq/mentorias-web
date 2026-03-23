import "./shared.css";
import "./VistaAgendadas.css";

// DATOS MOCK ////////////////////////////////////
const MENTORIAS = [
    {
        id: 1,
        email: "20243ds149@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Andres Manuel Lopez Obrador",
        materia: "Contaduría I",
        tema: "Evasion de impuestos",
        aula: "A2 – Docencia II",
        hora: "13:00 – 14:00",
        confirmada: true,
    },
    {
        id: 2,
        email: "20223ds182@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Diaz Peña",
        materia: "Matematica aplicada",
        tema: "Ecuaciones diferenciales",
        aula: "A12 – Docencia V",
        hora: "13:00 – 14:00",
        confirmada: false,
    },
    {
        id: 3,
        email: "20241ds301@utez.edu.mx",
        fecha: "02/02/2026",
        nombre: "María Fernanda Ruiz",
        materia: "Cálculo Integral",
        tema: "Integrales por partes",
        aula: "B3 – Docencia I",
        hora: "10:00 – 11:00",
        confirmada: true,
    },
];

// ICONOS ///////////////////////
const IconLocation = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconClock = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

// MENTORIA CARD /////////////////////
function MentoriaCard({ mentoria }) {
    const statusClass = mentoria.confirmada ? "confirmada" : "por-aceptar";

    return (
        <div className="mentoria-card">
            <div className={`card-status-dot ${statusClass}`} />
            <div className="card-header">
                <span className="card-email">{mentoria.email}</span>
                <span className="card-fecha">{mentoria.fecha}</span>
            </div>
            <p className="card-nombre">{mentoria.nombre}</p>
            <hr className="card-divider" />
            <div className="card-field">
                <span className="card-label">Materia:</span>
                <span className="card-value">{mentoria.materia}</span>
            </div>
            <div className="card-field">
                <span className="card-label">Tema:</span>
                <span className="card-value">{mentoria.tema}</span>
            </div>
            <div className="card-meta">
                <span className="card-meta-item"><IconLocation /> {mentoria.aula}</span>
                <span className="card-meta-item"><IconClock /> {mentoria.hora}</span>
            </div>
        </div>
    );
}

// VISTA ///////////////////////////////////
export default function VistaAgendadas() {
    return (
        <>
            <div className="legend">
                <span className="legend-item"><span className="dot confirmada" /> Confirmada</span>
                <span className="legend-item"><span className="dot por-aceptar" /> Por aceptar</span>
            </div>

            {MENTORIAS.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-text">No tienes mentorías agendadas.</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {MENTORIAS.map((m) => (
                        <MentoriaCard key={m.id} mentoria={m} />
                    ))}
                </div>
            )}
        </>
    );
}
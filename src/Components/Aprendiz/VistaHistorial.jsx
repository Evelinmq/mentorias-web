import "./shared.css";
import "./VistaHistorial.css";

// DATOS MOCK POR FAVOR BORRAAAAAAR//////////////////
const HISTORIAL = [
    { id: 1, email: "20243ds153@utez.edu.mx", fecha: "13/12/2025", nombre: "John Marston Gonzales", materia: "Inglés IV", tema: "Phrasal Verbs", aula: "A6 – Docencia I", hora: "13:00 – 14:00", tipo: "tomada" },
    { id: 2, email: "20243ds153@utez.edu.mx", fecha: "07/12/2025", nombre: "John Marston Gonzales", materia: "Inglés IV", tema: "Pasado perfecto", aula: "A12 – Docencia V", hora: "08:00 – 10:00", tipo: "tomada" },
    { id: 3, email: "20223ds182@utez.edu.mx", fecha: "30/01/2026", nombre: "Gustavo Diaz Peña", materia: "Matematica Aplicada", tema: "Ecuaciones diferenciales", aula: "A12 – Docencia V", hora: "13:00 – 14:00", tipo: "cancelada", motivoCancelacion: "Me dio viruela :c" },
];

// ICONOS ////////////////////////////////
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

// HISTORIAL CARD /////////////////////////////
function HistorialCard({ item }) {
    const tomada = item.tipo === "tomada";

    return (
        <div className={`mentoria-card historial-card ${tomada ? "historial-tomada" : "historial-cancelada"}`}>
            <div className={`card-status-dot ${tomada ? "confirmada" : "por-aceptar"}`} />
            <div className="card-header">
                <span className="card-email">{item.email}</span>
                <span className="card-fecha">{item.fecha}</span>
            </div>
            <p className="card-nombre">{item.nombre}</p>
            <hr className="card-divider" />
            <div className="card-field">
                <span className="card-label">Materia:</span>
                <span className="card-value">{item.materia}</span>
            </div>
            <div className="card-field">
                <span className="card-label">Tema:</span>
                <span className="card-value">{item.tema}</span>
            </div>
            {!tomada && item.motivoCancelacion && (
                <div className="card-field">
                    <span className="card-label">Motivo de la cancelacion:</span>
                    <span className="card-motivo">{item.motivoCancelacion}</span>
                </div>
            )}
            <div className="card-meta">
                <span className="card-meta-item"><IconLocation /> {item.aula}</span>
                <span className="card-meta-item"><IconClock /> {item.hora}</span>
            </div>
        </div>
    );
}

// VISTA ///////////////////////////
export default function VistaHistorial() {
    return (
        <>
            <div className="legend">
                <span className="legend-item"><span className="dot confirmada" /> Asesoría Tomada</span>
                <span className="legend-item"><span className="dot por-aceptar" /> Canceladas</span>
            </div>

            {HISTORIAL.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-text">No hay registros en tu historial.</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {HISTORIAL.map((item) => (
                        <HistorialCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </>
    );
}
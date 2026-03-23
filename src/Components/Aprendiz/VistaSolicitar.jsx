import { useState } from "react";
import "./shared.css";
import "./VistaSolicitar.css";

// DATOS MOCK ////////////////////////////////////
const MENTORES_DISPONIBLES = [
    { id: 1, email: "20243ds149@utez.edu.mx", nombre: "Gustavo Diaz Peña", materia: "Matematica aplicada", aula: "A2 – Docencia II", hora: "08:00 – 10:00", cupos: "2/5" },
    { id: 2, email: "20243ds148@utez.edu.mx", nombre: "Gustavo Diaz Peña", materia: "Matematica aplicada", aula: "A2 – Docencia II", hora: "08:00 – 10:00", cupos: "2/5" },
    { id: 3, email: "20243ds148@utez.edu.mx", nombre: "Gustavo Diaz Peña", materia: "Física II", aula: "A2 – Docencia II", hora: "08:00 – 10:00", cupos: "2/5" },
];

const MATERIAS = ["Todas", "Matematica aplicada", "Contaduría I", "Cálculo Integral", "Física II"];

// ICONOS //////////////////////////////////////
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

const IconUsers = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const IconChevron = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

// SOLICITUD CARD //////////////////////////////
function SolicitudCard({ mentor }) {
    const [tema, setTema] = useState("");

    const handleConfirmar = () => {
        if (!tema.trim()) return;
        alert(`Solicitud enviada a ${mentor.nombre}\nTema: ${tema}`);
        setTema("");
    };

    return (
        <div className="mentoria-card solicitud-card">
            <div className="card-header">
                <span className="card-email">{mentor.email}</span>
                <span className="card-fecha">30/01/2026</span>
            </div>
            <div className="card-nombre-row">
                <p className="card-nombre">{mentor.nombre}</p>
                <span className="card-cupos"><IconUsers /> {mentor.cupos}</span>
            </div>
            <hr className="card-divider" />
            <div className="card-field">
                <span className="card-label">Materia:</span>
                <span className="card-value">{mentor.materia}</span>
            </div>
            <div className="solicitud-tema-row">
                <input
                    className="solicitud-tema-input"
                    type="text"
                    placeholder="Proponer tema"
                    value={tema}
                    onChange={(e) => setTema(e.target.value)}
                />
                <button className="solicitud-tema-add" title="Agregar tema">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>
            <div className="card-meta">
                <span className="card-meta-item"><IconLocation /> {mentor.aula}</span>
                <span className="card-meta-item"><IconClock /> {mentor.hora}</span>
            </div>
            <button className={`confirmar-btn ${tema.trim() ? "active" : ""}`} onClick={handleConfirmar}>
                Confirmar
            </button>
        </div>
    );
}

// VISTA /////////////////////////////////////
export default function VistaSolicitar() {
    const [materiaFiltro, setMateriaFiltro] = useState("Todas");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const mentoresFiltrados =
        materiaFiltro === "Todas"
            ? MENTORES_DISPONIBLES
            : MENTORES_DISPONIBLES.filter((m) => m.materia === materiaFiltro);

    return (
        <div className="solicitud-view">
            <div className="solicitud-filtro">
                <div className="dropdown-wrapper">
                    <button className="dropdown-btn" onClick={() => setDropdownOpen((o) => !o)}>
                        <span>{materiaFiltro}</span>
                        <IconChevron />
                    </button>
                    {dropdownOpen && (
                        <ul className="dropdown-list">
                            {MATERIAS.map((m) => (
                                <li
                                    key={m}
                                    className={`dropdown-item ${materiaFiltro === m ? "selected" : ""}`}
                                    onClick={() => { setMateriaFiltro(m); setDropdownOpen(false); }}
                                >
                                    {m}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {mentoresFiltrados.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-text">No hay mentores disponibles para esta materia.</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {mentoresFiltrados.map((m) => (
                        <SolicitudCard key={m.id} mentor={m} />
                    ))}
                </div>
            )}
        </div>
    );
}
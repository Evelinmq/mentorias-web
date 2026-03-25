import { useState } from "react";
import MentoriaCard from "../Common/MentoriaCard";
import "./VistaSolicitar.css";

const MENTORES = [
    {
        id: 1,
        email: "20243dc148@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Díaz Peña",
        materia: "Matematica aplicada",
        aula: "A2 - Docencia 8",
        hora: "08:00 - 10:00",
        cupos: { actuales: 2, total: 5 },
    },
    {
        id: 2,
        email: "20243dc148@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Díaz Peña",
        materia: "Ecuaciones diferenciales",
        aula: "A2 - Docencia 8",
        hora: "08:00 - 10:00",
        cupos: { actuales: 2, total: 5 },
    },
    {
        id: 3,
        email: "20243dc148@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Díaz Peña",
        materia: "Matematica aplicada",
        aula: "A2 - Docencia 8",
        hora: "08:00 - 10:00",
        cupos: { actuales: 2, total: 5 },
    },
];

// Íconos
const IconPersonas = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const IconFiltro = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
);

// Input + botón de tema por tarjeta
function TemaInput({ onConfirmar }) {
    const [tema, setTema] = useState("");

    return (
        <>
            <div className="solicitud-tema-row">
                <input
                    className="solicitud-tema-input"
                    type="text"
                    placeholder="Proponer tema"
                    value={tema}
                    onChange={(e) => setTema(e.target.value.trimStart())}
                />
                <button
                    className="solicitud-tema-add"
                    disabled={!tema.trim()}
                    onClick={() => onConfirmar(tema)}
                    type="button"
                >
                    +
                </button>
            </div>
            <button
                className={`confirmar-btn ${tema.trim() ? "active" : ""}`}
                disabled={!tema.trim()}
                onClick={() => onConfirmar(tema)}
                type="button"
            >
                Confirmar
            </button>
        </>
    );
}

// Dropdown de filtro
function FiltroMateria({ materias, seleccionada, onChange }) {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="dropdown-wrapper">
            <button
                className="dropdown-btn"
                onClick={() => setAbierto((v) => !v)}
                type="button"
            >
                {seleccionada ?? "Todas las materias"}
                <IconFiltro />
            </button>

            {abierto && (
                <ul className="dropdown-list">
                    <li
                        className={`dropdown-item ${seleccionada === null ? "selected" : ""}`}
                        onClick={() => { onChange(null); setAbierto(false); }}
                    >
                        Todas las materias
                    </li>
                    {materias.map((m) => (
                        <li
                            key={m}
                            className={`dropdown-item ${seleccionada === m ? "selected" : ""}`}
                            onClick={() => { onChange(m); setAbierto(false); }}
                        >
                            {m}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default function VistaSolicitar() {
    const [filtro, setFiltro] = useState(null);

    const materias = [...new Set(MENTORES.map((m) => m.materia))];
    const mentoresFiltrados = filtro
        ? MENTORES.filter((m) => m.materia === filtro)
        : MENTORES;

    const handleConfirmar = (mentor, tema) => {
        // Aquí irá tu llamada a la API
        alert(`Solicitud enviada a ${mentor.nombre} — Tema: ${tema}`);
    };

    return (
        <div className="solicitud-view">
            {/* Filtro */}
            <div className="solicitud-filtro">
                <FiltroMateria
                    materias={materias}
                    seleccionada={filtro}
                    onChange={setFiltro}
                />
            </div>

            {/* Cards */}
            <div className="cards-grid">
                {mentoresFiltrados.map((m) => (
                    <MentoriaCard
                        key={m.id}
                        data={m}
                        extraContent={
                            <>
                                {/* Cupos — va dentro de extraContent para aparecer entre tema y meta */}
                                <div className="card-nombre-row">
                                    <span className="card-cupos">
                                        <IconPersonas /> {m.cupos.actuales}/{m.cupos.total}
                                    </span>
                                </div>

                                <TemaInput onConfirmar={(tema) => handleConfirmar(m, tema)} />
                            </>
                        }
                    />
                ))}
            </div>
        </div>
    );
}
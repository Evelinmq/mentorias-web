import { useState } from "react";
import "./DashboardAprendiz.css";

// ── Mock data ─────────────────────────────────────────────────────────────────
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

const HISTORIAL = [
  {
    id: 4,
    email: "20201ds010@utez.edu.mx",
    fecha: "15/01/2026",
    nombre: "Carlos Mendoza Torres",
    materia: "Física II",
    tema: "Movimiento armónico",
    aula: "A5 – Docencia III",
    hora: "09:00 – 10:00",
    confirmada: true,
  },
];

const MENTORES_DISPONIBLES = [
  {
    id: 1,
    email: "20243ds149@utez.edu.mx",
    nombre: "Gustavo Diaz Peña",
    materia: "Matematica aplicada",
    aula: "A2 – Docencia II",
    hora: "08:00 – 10:00",
    cupos: "2/5",
  },
  {
    id: 2,
    email: "20243ds148@utez.edu.mx",
    nombre: "Gustavo Diaz Peña",
    materia: "Matematica aplicada",
    aula: "A2 – Docencia II",
    hora: "08:00 – 10:00",
    cupos: "2/5",
  },
  {
    id: 3,
    email: "20243ds148@utez.edu.mx",
    nombre: "Gustavo Diaz Peña",
    materia: "Matematica aplicada",
    aula: "A2 – Docencia II",
    hora: "08:00 – 10:00",
    cupos: "2/5",
  },
];

const MATERIAS = ["Todas", "Matematica aplicada", "Contaduría I", "Cálculo Integral", "Física II"];

// ── Icons (inline SVG) ───────────────────────────────────────────────────────
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

// ── MentoriaCard ─────────────────────────────────────────────────────────────
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
        <span className="card-meta-item">
          <IconLocation /> {mentoria.aula}
        </span>
          <span className="card-meta-item">
          <IconClock /> {mentoria.hora}
        </span>
        </div>
      </div>
  );
}

// ── SolicitudCard ─────────────────────────────────────────────────────────────
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
          <span className="card-cupos">
          <IconUsers /> {mentor.cupos}
        </span>
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
          <button
              className="solicitud-tema-add"
              onClick={() => {}}
              title="Agregar tema"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>

        <div className="card-meta">
        <span className="card-meta-item">
          <IconLocation /> {mentor.aula}
        </span>
          <span className="card-meta-item">
          <IconClock /> {mentor.hora}
        </span>
        </div>

        <button
            className={`confirmar-btn ${tema.trim() ? "active" : ""}`}
            onClick={handleConfirmar}
        >
          Confirmar
        </button>
      </div>
  );
}

// ── SolicitudView ─────────────────────────────────────────────────────────────
function SolicitudView() {
  const [materiaFiltro, setMateriaFiltro] = useState("Todas");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mentoresFiltrados =
      materiaFiltro === "Todas"
          ? MENTORES_DISPONIBLES
          : MENTORES_DISPONIBLES.filter((m) => m.materia === materiaFiltro);

  return (
      <div className="solicitud-view">
        {/* Buscador por materia */}
        <div className="solicitud-filtro">
          <div className="dropdown-wrapper">
            <button
                className="dropdown-btn"
                onClick={() => setDropdownOpen((o) => !o)}
            >
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

        {/* Cards de mentores */}
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

// ── Main Component ───────────────────────────────────────────────────────────
export default function DashboardAprendiz() {
  const [tab, setTab] = useState("agendadas");

  const data =
      tab === "agendadas"
          ? MENTORIAS
          : tab === "historial"
              ? HISTORIAL
              : [];

  return (
      <div className="dashboard-body">
        {/* ── SIDEBAR ── */}
        <aside className="sidebar">
          {[
            { key: "agendadas", label: "Agendadas" },
            { key: "solicitar", label: "Solicitar" },
            { key: "historial", label: "Historial" },
          ].map(({ key, label }) => (
              <button
                  key={key}
                  className={`sidebar-btn ${tab === key ? "active" : ""}`}
                  onClick={() => setTab(key)}
              >
                {label}
              </button>
          ))}
        </aside>

        {/* ── CONTENT ── */}
        <main className="content">
          {/* Legend — solo en agendadas e historial */}
          {tab !== "solicitar" && (
              <div className="legend">
            <span className="legend-item">
              <span className="dot confirmada" /> Confirmada
            </span>
                <span className="legend-item">
              <span className="dot por-aceptar" /> Por aceptar
            </span>
              </div>
          )}

          {tab === "solicitar" ? (
              <SolicitudView />
          ) : data.length === 0 ? (
              <div className="empty-state">
                <p className="empty-text">No hay registros para mostrar.</p>
              </div>
          ) : (
              <div className="cards-grid">
                {data.map((m) => (
                    <MentoriaCard key={m.id} mentoria={m} />
                ))}
              </div>
          )}
        </main>
      </div>
  );
}
import { useState } from "react";
import MentoriaCard from "../Common/MentoriaCard";
import "./VistaSolicitar.css";
import Swal from 'sweetalert2';


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
    const [error, setError] = useState("");

    const handleChange = (e) => {
        // Evitamos espacios al inicio
        const value = e.target.value.trimStart();
        setTema(value);

        // Lógica de validación en tiempo real
        if (value.length > 0 && value.length < 5) {
            setError("El tema debe tener al menos 5 caracteres.");
        } else if (value.length > 50) {
            setError("El tema es muy largo (máx. 50 caracteres).");
        } else {
            setError(""); // Si todo está bien, limpiamos el error
        }
    };

    // Evaluamos si el formulario es válido para habilitar los botones
    const isValid = tema.trim().length >= 5 && tema.trim().length <= 50;

    return (
        <>
            <div className="solicitud-tema-row">
                <input
                    // Le agregamos una clase dinámica si hay error para pintar el borde rojo (opcional en tu CSS)
                    className={`solicitud-tema-input ${error ? "input-error" : ""}`}
                    type="text"
                    placeholder="Proponer tema (ej. Derivadas)"
                    value={tema}
                    onChange={handleChange}
                    maxLength={55} // Previene que sigan escribiendo infinitamente
                />
                <button
                    className="solicitud-tema-add"
                    disabled={!isValid}
                    onClick={() => onConfirmar(tema)}
                    type="button"
                >
                    +
                </button>
            </div>

            {/* Mensaje de error visual (puedes ajustar los estilos en tu CSS) */}
            {error && (
                <span style={{ color: "#d9534f", fontSize: "0.75rem", display: "block", marginBottom: "8px", marginTop: "-4px" }}>
                    {error}
                </span>
            )}

            <button
                className={`confirmar-btn ${isValid ? "active" : ""}`}
                disabled={!isValid}
                onClick={() => {
                    onConfirmar(tema);
                    setTema(""); // Limpia el input después de confirmar
                }}
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

const handleConfirmar = async (mentor, tema) => {
        // Mostramos una alerta de confirmación ANTES de agendar
        const confirmacion = await Swal.fire({
            title: '¿Confirmar mentoría?',
            html: `Estás a punto de solicitar una mentoría con <b>${mentor.nombre}</b><br/>Tema: <i>"${tema}"</i>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6', // Puedes cambiarlo por el azul de tu proyecto
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, solicitar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                // Aquí irá tu llamada real a la API (tu función enviarDatos de api.js)
                // await enviarDatos('/api/mentorias/solicitar', { mentorId: mentor.id, tema: tema });

                // Simulamos una carga de medio segundo
                await new Promise(resolve => setTimeout(resolve, 500));

                // Alerta de éxito
                Swal.fire({
                    title: '¡Solicitud enviada!',
                    text: `Tu mentoría sobre "${tema}" ha sido agendada con éxito.`,
                    icon: 'success',
                    confirmButtonText: 'Entendido'
                });

                // (Opcional) Aquí podrías actualizar el estado para descontar los cupos

            } catch (error) {
                // Alerta de error si falla la API
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo enviar la solicitud. Intenta de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            }
        }
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
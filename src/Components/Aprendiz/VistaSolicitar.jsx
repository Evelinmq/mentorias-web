import { useState, useEffect } from "react";
import MentoriaCard from "../Common/MentoriaCard";
import Button from "../Common/Button";
import "./VistaSolicitar.css";
import Swal from 'sweetalert2';
import { obtenerDatos, enviarDatos } from "../../utils/api";

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

function TemaInput({ onConfirmar, sinCupos }) {
    const [tema, setTema] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const value = e.target.value.trimStart();
        setTema(value);
        if (value.length > 0 && value.length < 5) {
            setError("Mínimo 5 caracteres.");
        } else if (value.length > 50) {
            setError("Máximo 50 caracteres.");
        } else {
            setError("");
        }
    };

    const isValid = tema.trim().length >= 5 && tema.trim().length <= 50;

    const handleConfirmar = () => {
        if (!isValid) return;
        onConfirmar(tema);
        setTema("");
        setError("");
    };

    // SI NO HAY CUPOS CANCELA EL AGREGADO (AUNQUE NO SE SI MEJOR SIMPLEMENTE NO MOSTRARLO)
    if (sinCupos) {
        return (
            <div className="tema-input-wrapper">
                <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                    Sin cupos disponibles
                </p>
            </div>
        );
    }

    return (
        <div className="tema-input-wrapper">
            <div className="solicitud-tema-row">
                <input
                    className={`solicitud-tema-input ${error ? "input-error" : ""}`}
                    type="text"
                    placeholder="Proponer tema (ej. Derivadas)"
                    value={tema}
                    onChange={handleChange}
                    maxLength={55}
                />
            </div>
            {error && <span className="tema-error">{error}</span>}
            <Button
                text="Confirmar"
                className={`confirmar-btn ${isValid ? "active" : ""}`}
                disabled={!isValid}
                onClick={handleConfirmar}
                type="button"
            />
        </div>
    );
}

function FiltroMateria({ materias, seleccionada, onChange }) {
    const [abierto, setAbierto] = useState(false);
    return (
        <div className="dropdown-wrapper">
            <button className="dropdown-btn" onClick={() => setAbierto((v) => !v)} type="button">
                {seleccionada ?? "Todas las materias"}
                <IconFiltro />
            </button>
            {abierto && (
                <ul className="dropdown-list">
                    <li className={`dropdown-item ${seleccionada === null ? "selected" : ""}`}
                        onClick={() => { onChange(null); setAbierto(false); }}>
                        Todas las materias
                    </li>
                    {materias.map((m) => (
                        <li key={m}
                            className={`dropdown-item ${seleccionada === m ? "selected" : ""}`}
                            onClick={() => { onChange(m); setAbierto(false); }}>
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
    const [mentorias, setMentorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const cargarMentorias = async () => {
        try {
            setLoading(true);
            const [mentorias, inscripciones] = await Promise.all([
                obtenerDatos('/api/mentorias'),
                obtenerDatos('/api/mentorias-usuarios')
            ]);

            const conteoPorMentoria = inscripciones.reduce((acc, i) => {
                const id = i.mentoria?.id;
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});

            const mentoriasConCupos = mentorias.map(m => ({
                ...m,
                inscritos: conteoPorMentoria[m.id] || 0,
                cuposDisponibles: m.cupo - (conteoPorMentoria[m.id] || 0)
            }));

            setMentorias(mentoriasConCupos);
        } catch (error) {
            console.error('Error al cargar mentorías:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarMentorias(); }, []);

    const materias = [...new Set(mentorias.map((m) => m.materia?.nombre).filter(Boolean))];
    const mentoriasFiltradas = filtro
        ? mentorias.filter((m) => m.materia?.nombre === filtro)
        : mentorias;

    const handleConfirmar = async (mentoria, tema) => {
        const confirmacion = await Swal.fire({
            title: '¿Confirmar mentoría?',
            html: `Mentoría con <b>${mentoria.mentor?.nombre} ${mentoria.mentor?.apellidoP}</b><br/>Tema: <i>"${tema}"</i>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1a2e6e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, solicitar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                await enviarDatos('/api/mentorias-usuarios', {
                    mentoria: { id: mentoria.id },
                    usuario: { id: user.id }
                });
                Swal.fire({ title: '¡Solicitud enviada!', icon: 'success', confirmButtonText: 'Entendido' });
                cargarMentorias();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message || 'No se pudo enviar la solicitud.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                });
            }
        }
    };

    if (loading) return <p style={{ padding: '2rem' }}>Cargando mentorías...</p>;

    return (
        <div className="solicitud-view">
            <div className="solicitud-filtro">
                <FiltroMateria materias={materias} seleccionada={filtro} onChange={setFiltro} />
            </div>

            {mentoriasFiltradas.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-text">No hay mentorías disponibles</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {mentoriasFiltradas.map((m) => (
                        <MentoriaCard
                            key={m.id}
                            m={m}
                            extraContent={
                                <>
                                    <div className="card-cupos-row">
                                        <IconPersonas />
                                        <span className="card-cupos">
                                             {m.cuposDisponibles} / {m.cupo} cupos disponibles
                                        </span>
                                    </div>
                                    <TemaInput
                                        onConfirmar={(tema) => handleConfirmar(m, tema)}
                                        sinCupos={m.cuposDisponibles <= 0}
                                    />                                </>
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
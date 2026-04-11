import { useState, useEffect } from "react";
import AprendizCard from "../Aprendiz/AprendizCard";
import Button from "../Common/Button";
import "./VistaSolicitar.css";
import Swal from 'sweetalert2';
import { obtenerDatos, enviarDatos } from "../../utils/api";

const IconPersonas = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const IconFiltro = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);

function TemaInput({ onConfirmar, sinCupos, temaExistente, yaInscrito }) {
    const [tema, setTema] = useState("");
    const [error, setError] = useState("");

    if (yaInscrito) {
        return (
            <div className="tema-input-wrapper">
                <p style={{
                    color: '#6b7280',
                    fontSize: '13px',
                    fontWeight: 600,
                    textAlign: 'center',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '6px'
                }}>
                    ✓ Ya estás inscrito en esta mentoría
                </p>
            </div>
        );
    }

    if (temaExistente) {
        return (
            <div className="input-container-figma">
                <div className="solicitud-tema-row">
                    <input
                        className="solicitud-tema-input"
                        value={temaExistente}
                        disabled
                        style={{
                            backgroundColor: '#f3f4f6',
                            color: '#6b7280',
                            cursor: 'not-allowed'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button
                        text="Confirmar"
                        className="btn-confirmar-figma"
                        disabled={false}
                        onClick={() => onConfirmar(temaExistente)}
                    />
                </div>
            </div>
        );
    }

    if (sinCupos) {
        return (
            <div className="tema-input-wrapper">
                <p style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                    Sin cupos disponibles
                </p>
            </div>
        );
    }

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

    return (
        <div className="input-container-figma">
            <div className="solicitud-tema-row">
                <input
                    className="solicitud-tema-input"
                    placeholder="Proponer tema"
                    value={tema}
                    onChange={handleChange}
                />
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                </div>
            </div>
            {error && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{error}</p>}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button
                    text="Confirmar"
                    className="btn-confirmar-figma"
                    disabled={!isValid}
                    onClick={() => {
                        if (!isValid) return;
                        onConfirmar(tema);
                        setTema("");
                        setError("");
                    }}
                />
            </div>
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
    const [filtroSeleccionado, setFiltroSeleccionado] = useState(null);
    const [mentorias, setMentorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edificios, setEdificios] = useState([]);

    const cargarMentorias = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("usuario"));
            const userId = user?.usuario?.id || user?.id;

            const [listaMentorias, conteo, misIds, ed] = await Promise.all([
                obtenerDatos('/api/mentorias/proximas'),
                obtenerDatos('/api/mentorias-usuarios/conteo'),
                obtenerDatos(`/api/mentorias-usuarios/usuario/${userId}`),
                obtenerDatos('/api/edificios')
            ]);

            setEdificios(ed);

            const yaInscritoSet = new Set(misIds);

            const mentoriasConCupos = listaMentorias.map(m => ({
                ...m,
                inscritos: conteo[m.id] || 0,
                cuposDisponibles: m.cupo - (conteo[m.id] || 0),
                yaInscrito: yaInscritoSet.has(m.id)
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

    const mentoriasFiltradas = filtroSeleccionado
        ? mentorias.filter((m) => m.materia?.nombre === filtroSeleccionado)
        : mentorias;

    const handleConfirmar = async (mentoria, tema) => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        const userId = user?.usuario?.id || user?.id;

        if (!userId) {
            console.error("userId undefined:", user);
            return;
        }

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
                await enviarDatos(
                    `/api/mentorias-usuarios?tema=${encodeURIComponent(tema)}`,
                    {
                        mentoria: { id: mentoria.id },
                        usuario: { id: userId }
                    }
                );

                Swal.fire({
                    title: '¡Solicitud enviada!',
                    icon: 'success',
                    confirmButtonColor: '#132D63'  
                });
                cargarMentorias();
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error'
                });
            }
        }
    };

    if (loading) return <p style={{ padding: '2rem' }}>Cargando mentorías...</p>;

    return (
        <div className="solicitud-view">
            <div className="solicitud-filtro">
                <FiltroMateria
                    materias={materias}
                    seleccionada={filtroSeleccionado}
                    onChange={setFiltroSeleccionado}
                />
            </div>

            {mentoriasFiltradas.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-text">No hay mentorías disponibles</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {mentoriasFiltradas
                        .filter(m => m && m.mentor && m.id)
                        .map((m) => (
                            <AprendizCard
                                key={m.id}
                                m={m}
                                edificios={edificios}
                                extraContent={
                                    <>
                                        <div className="card-cupos-row">
                                        </div>
                                        <TemaInput
                                            onConfirmar={(tema) => handleConfirmar(m, tema)}
                                            sinCupos={m.cuposDisponibles <= 0}
                                            temaExistente={m.temas?.[0]?.nombre || null}
                                            yaInscrito={m.yaInscrito}
                                        />
                                    </>
                                }
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
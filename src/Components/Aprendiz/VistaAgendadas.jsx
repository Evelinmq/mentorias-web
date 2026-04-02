import { useState, useEffect } from "react";
import MentoriaCard from "../Common/MentoriaCard";
import { obtenerDatos } from "../../utils/api";

export default function VistaAgendadas() {
    const [inscripciones, setInscripciones] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const cargarInscripciones = async () => {
        try {
            setLoading(true);
            const data = await obtenerDatos('/api/mentorias-usuarios');
            const misInscripciones = data.filter(i => i.usuario?.id === user?.id);
            setInscripciones(misInscripciones);
        } catch (error) {
            console.error('Error al cargar inscripciones:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarInscripciones(); }, []);

    if (loading) return <p style={{ padding: '2rem' }}>Cargando mentorías...</p>;

    if (inscripciones.length === 0) {
        return (
            <div className="empty-state">
                <p className="empty-text">No tienes mentorías agendadas</p>
            </div>
        );
    }

    return (
        <>
            {/* Leyenda */}
            <div className="legend">
                <span className="legend-item">
                    <span className="dot" style={{ backgroundColor: '#22c55e' }} /> Confirmada
                </span>
                <span className="legend-item">
                    <span className="dot" style={{ backgroundColor: '#64748b' }} /> Por aceptar
                </span>
            </div>

            <div className="cards-grid">
                {inscripciones.map((inscripcion) => (
                    <MentoriaCard
                        key={inscripcion.id}
                        m={inscripcion.mentoria}
                        tema={inscripcion.tema}
                    />
                ))}
            </div>
        </>
    );
}
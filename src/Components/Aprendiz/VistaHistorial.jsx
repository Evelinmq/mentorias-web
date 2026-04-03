import { useState, useEffect } from "react";
import AprendizCard from "../Aprendiz/AprendizCard";
import { obtenerDatos } from "../../utils/api";

export default function VistaHistorial() {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerDatos('/api/mentorias-usuarios');
                const misHistorial = data.filter(
                    i => i.usuario?.id === user?.id && i.estado !== 'activa'
                );
                setHistorial(misHistorial);
            } catch (error) {
                console.error('Error al cargar historial:', error);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    if (loading) return <p style={{ padding: '2rem' }}>Cargando historial...</p>;

    if (historial.length === 0) {
        return (
            <div className="empty-state">
                <p className="empty-text">No tienes historial de mentorías</p>
            </div>
        );
    }

    return (
        <>
            <div className="legend">
                <span className="legend-item">
                    <span className="dot" style={{ backgroundColor: '#22c55e' }} /> Asesoría Tomada
                </span>
                <span className="legend-item">
                    <span className="dot" style={{ backgroundColor: '#64748b' }} /> Canceladas
                </span>
            </div>

            <div className="cards-grid">
                {historial.map((inscripcion) => (
                    <AprendizCard
                        key={inscripcion.id}
                        m={inscripcion.mentoria}
                        tema={inscripcion.tema}
                        extraContent={
                            inscripcion.estado === 'cancelada' && inscripcion.motivoCancelacion ? (
                                <div className="motivo-cancelacion">
                                    <span className="label">Motivo de la cancelación:</span>
                                    <span className="valor">{inscripcion.motivoCancelacion}</span>
                                </div>
                            ) : null
                        }
                    />
                ))}
            </div>
        </>
    );
}
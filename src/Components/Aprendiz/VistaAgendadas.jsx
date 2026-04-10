import { useState, useEffect } from "react";
import AprendizCard from "../Aprendiz/AprendizCard";
import { obtenerDatos } from "../../utils/api";

export default function VistaAgendadas() {
    const [mentorias, setMentorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("usuario"));
                const userId = user?.usuario?.id || user?.id;

                const misMentorias = await obtenerDatos(
                    `/api/mentorias-usuarios/usuario/${userId}/detalle`
                );

                setMentorias(misMentorias);
            } catch (error) {
                console.error('Error al cargar agendadas:', error);
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>;

    if (mentorias.length === 0) {
        return (
            <div className="empty-state">
                <p className="empty-text">No tienes mentorías agendadas</p>
            </div>
        );
    }

    return (
        <>
            <div className="legend">
                <span className="legend-item">
                    <span className="dot confirmada" /> Confirmada
                </span>
                <span className="legend-item">
                    <span className="dot por-aceptar" /> Por aceptar
                </span>
            </div>

            <div className="cards-grid">
                {mentorias.map((m) => (
                    <AprendizCard
                        key={m.id}
                        m={{
                            ...m,
                            tema: m.temas?.[0]?.nombre || "Sin tema",
                            estatus: m.estado?.nombre?.toLowerCase().includes("aceptada")
                                ? "confirmada"
                                : "por-aceptar"
                        }}
                        variant="agendada"
                    />
                ))}
            </div>
        </>
    );
}
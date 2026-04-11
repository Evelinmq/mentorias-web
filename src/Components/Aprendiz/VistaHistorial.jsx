import { useState, useEffect } from "react";
import AprendizCard from "../Aprendiz/AprendizCard";
import { obtenerDatos } from "../../utils/api";

export default function VistaHistorial() {
    const [historial, setHistorial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edificios, setEdificios] = useState([]);

    useEffect(() => {
        const cargar = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("usuario"));
                const userId = user?.usuario?.id || user?.id;

                if (!userId) return;

                const [data, ed] = await Promise.all([
                    obtenerDatos(`/api/mentorias-usuarios/usuario/${userId}/historial`),
                    obtenerDatos("/api/edificios")
                ]);

                setHistorial(data);
                setEdificios(ed);
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
                    <span className="dot" style={{ backgroundColor: '#64748b' }} /> Cancelada
                </span>
            </div>

            <div className="cards-grid">
                {historial.map((m) => (
                    <AprendizCard
                        key={m.id}
                        m={{
                            ...m,
                            tema: m.temas?.[0]?.nombre || "Sin tema",
                            estatus: m.estado?.nombre === "Cancelada"
                                ? "por-aceptar"
                                : "confirmada"
                        }}
                        edificios={edificios}
                        variant="agendada"
                    />
                ))}
            </div>
        </>
    );
}
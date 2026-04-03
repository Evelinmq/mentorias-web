import { useState, useEffect } from "react";
import Button from "../Common/Button";
import CalendarioMentor from "./CalendarioMentor";
import AgendaMentor from "./AgendaMentor";
import ModalMentoria from "./ModalMentoria";
import "./DashboardMentor.css";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

import { obtenerDatos, actualizarDatos } from "../../utils/api";

function DashboardMentor() {
    const [showModal, setShowModal] = useState(false);
    const [diaSeleccionado, setDiaSeleccionado] = useState(new Date().toISOString().split("T")[0]);
    const [mentorias, setMentorias] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const hoy = new Date().toISOString().split("T")[0];
    const esFechaPasada = diaSeleccionado < hoy;

    const cargarMentorias = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || !usuario.id) return;

    try {
        const data = await obtenerDatos(`/api/mentorias/mentor/${usuario.id}`);
        setMentorias(data);
    } catch (error) {
        console.error("Error cargando mentorías:", error);
    }
};

    useEffect(() => {
        if (usuario?.id) {
            cargarMentorias();
        }
    }, [usuario]);

    const aceptarMentoria = async (id) => {
        try {
            await actualizarDatos(`/api/mentorias/${id}/aceptar`, {});
            await cargarMentorias();
        } catch (error) {
            console.error("Error al aceptar mentoría:", error);
        }
    };

    const cancelarMentoria = async (id) => {
        try {
            await actualizarDatos(`/api/mentorias/${id}/cancelar`, {});
            await cargarMentorias();
        } catch (error) {
            console.error("Error al cancelar mentoría:", error);
        }
    };

    return (
        <div className="dashboard-mentor">
            <div className="dashboard-body">
                <aside>
                    <Button
                        className="btn-asesorias active"
                        text="Asesorías"
                    />
                </aside>

                <main className="main-content">
                    <div className="calendario-container">
                        <Button
                            className="btn-agregar"
                            onClick={() => setShowModal(true)}
                            disabled={esFechaPasada}
                            text={esFechaPasada ? "No disponible" : "+ Agregar"}
                            style={esFechaPasada ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                        />

                        <h2 className="section-title">Calendario Asesorías</h2>
                        <CalendarioMentor
                            mentorias={mentorias}
                            onSeleccionarDia={setDiaSeleccionado}
                        />
                    </div>
                </main>

                <aside className="agenda-sidebar">
                    <AgendaMentor
                        mentorias={mentorias}
                        diaSeleccionado={diaSeleccionado}
                        onAceptar={aceptarMentoria}
                        onCancelar={cancelarMentoria}
                    />
                </aside>
            </div>

            {showModal && (
                <ModalMentoria
                    usuario={usuario}
                    cerrar={() => {
                        setShowModal(false);
                        cargarMentorias();
                    }}
                    fechaPredefinida={diaSeleccionado}
                />
            )}
        </div>
    );
}

export default DashboardMentor;
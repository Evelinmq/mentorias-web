import { useState } from "react";

import Header from "../All/Header";
import Sidebar from "../Common/Sidebar";
import Button from "../Common/Button";

import CalendarioMentor from "./CalendarioMentor";
import AgendaMentor from "./AgendaMentor";
import ModalMentoria from "./ModalMentoria";

function DashboardMentor() {
    const [showModal, setShowModal] = useState(false);
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    const mentorias = [
        {
            id: 1,
            fecha: "2026-02-19",
            alumno: "Kimberly Guadalupe",
            materia: "Estructuras de programación",
            hora: "13:00 - 14:00",
            estado: "pendiente"
        },
        {
            id: 2,
            fecha: "2026-02-19",
            alumno: "Ian DPR",
            materia: "Base de datos",
            hora: "15:00 - 16:00",
            estado: "confirmado"
        },
        {
            id: 3,
            fecha: "2026-02-20",
            alumno: "Jackson Wang",
            materia: "Java",
            hora: "11:00 - 12:00",
            estado: "aceptado"
        }
    ];

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
                        text="+ Agregar"
                    />
                        <h2 className="section-title">Calendario Asesorías</h2>
                        <CalendarioMentor
                            mentorias={mentorias}
                            onSeleccionarDia={setDiaSeleccionado}
                            mesActual="Febrero 2026"
                        />
                    </div>
                </main>

                <aside className="agenda-sidebar">
                    <AgendaMentor
                        mentorias={mentorias}
                        diaSeleccionado={diaSeleccionado}
                    />
                </aside>
            </div>

            {showModal && (
                <ModalMentoria
                    cerrar={() => setShowModal(false)}
                    fechaPredefinida={diaSeleccionado}
                />
            )}
        </div>
    );
}

export default DashboardMentor;
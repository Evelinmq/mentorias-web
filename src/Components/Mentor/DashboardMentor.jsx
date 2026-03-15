import { useState } from "react";
import "./DashboardMentor.css";

import CalendarioMentor from "./CalendarioMentor";
import AgendaMentor from "./AgendaMentor";
import ModalMentoria from "./ModalMentoria";

function DashboardMentor() {

    const [showModal, setShowModal] = useState(false);

    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    const mentorias = [
        {
            fecha: "2026-02-19",
            alumno: "Kimberly Guadalupe",
            materia: "Estructura de programación",
            hora: "13:00 - 14:00"
        },
        {
            fecha: "2026-02-19",
            alumno: "Ian DPR",
            materia: "Base de datos",
            hora: "15:00 - 16:00"
        },
        {
            fecha: "2026-02-20",
            alumno: "Jackson Wang",
            materia: "Java",
            hora: "11:00 - 12:00"
        }
    ];

    return (

        <div className="mentor-container">

            <div className="mentor-header">

                <button
                    className="btn-agregar"
                    onClick={() => setShowModal(true)}
                >
                    + Agregar
                </button>

            </div>

            <div className="mentor-content">

                <div className="mentor-calendario">

                    <CalendarioMentor
                        mentorias={mentorias}
                        onSeleccionarDia={setDiaSeleccionado}
                    />

                </div>

                <div className="mentor-agenda">

                    <AgendaMentor
                        mentorias={mentorias}
                        diaSeleccionado={diaSeleccionado}
                    />

                </div>

            </div>

            {showModal && <ModalMentoria cerrar={() => setShowModal(false)} />}

        </div>

    )

}

export default DashboardMentor;
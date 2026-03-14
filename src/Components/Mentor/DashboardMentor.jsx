import { useState } from "react";
import "./DashboardMentor.css";

import CalendarioMentor from "./CalendarioMentor";
import AgendaMentor from "./AgendaMentor";
import ModalMentoria from "./ModalMentoria";

function DashboardMentor(){

    const [showModal,setShowModal] = useState(false);

    return(

        <div className="mentor-container">

            <div className="mentor-header">

                <button 
                className="btn-agregar"
                onClick={()=>setShowModal(true)}
                >
                    + Agregar
                </button>

            </div>

            <div className="mentor-content">

                <div className="mentor-calendario">
                    <CalendarioMentor/>
                </div>

                <div className="mentor-agenda">
                    <AgendaMentor/>
                </div>

            </div>

            {showModal && <ModalMentoria cerrar={()=>setShowModal(false)}/>}

        </div>

    )
}

export default DashboardMentor;

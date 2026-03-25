import React from "react";
import { alertaExito, confirmarRechazarSolicitud } from "../../utils/alerts";

import iconCheck from '../../assets/TickIcon.png';
import iconCross from '../../assets/CrossIcon.png';

const PendingActions = ({ user }) => {

    const aceptarSolicitud = () => {
        console.log("Solicitud aceptada", user);
        alertaExito("Usuario aceptado");
    };

    const rechazarSolicitud = async () => {
        const confirmar = await confirmarRechazarSolicitud();

        if (confirmar) {
            console.log("Solicitud rechazada", user);
            alertaExito("Se ha rechazado la solicitud del usuario");
        }
    };

    return (
        <>
            <button className="btn-accion btn-check" onClick={aceptarSolicitud}>
                <img src={iconCheck} alt="Aceptar" />
            </button>

            <button className="btn-accion btn-cross" onClick={rechazarSolicitud}>
                <img src={iconCross} alt="Rechazar" />
            </button>
        </>
    );
};

export default PendingActions;
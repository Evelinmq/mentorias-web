import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SeleccionRol.css";

function SolicitudPendiente() {
    const navigate = useNavigate();

    return (
        <div className="rol-container">
            <div className="Circulo1"/><div className="circulo2"/>

            <div className="rol-card">
                <img src={logo} alt="UTEZ" className="rol-logo" />
                <div className="solicitud-header">
                    <h2 className="solicitud-title">Solicitud de cuenta</h2>
                </div>
                
                <div className="solicitud-body">
                    <p>Tu solicitud de registro ha sido recibida y está en proceso de revisión por nuestro equipo administrativo.</p>
                    
                    <div className="notificacion-check">
                        <input type="checkbox" id="notify" />
                        <label htmlFor="notify">Deseas recibir una notificación una vez que tu cuenta sea aprobada.</label>
                    </div>
                </div>

                <button className="btn-rol" onClick={() => navigate("/login")}>
                    Aceptar
                </button>
            </div>
        </div>
    );
}

export default SolicitudPendiente;
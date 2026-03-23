import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./SeleccionRol.css";

function SeleccionRol() {
    const navigate = useNavigate();

    const elegirRol = (rol) => {
        navigate(rol === "mentor" ? "/mentor/dashboard" : "/aprendiz/dashboard");
    };

    return (
        <div className="rol-container">
            <div className="Circulo1"/><div className="circulo2"/><div className="circulo3"/>
            
            <div className="rol-card">
                <img src={logo} alt="UTEZ" className="rol-logo" />
                <h2 className="rol-title">¿Qué rol deseas usar?</h2>
                
                <div className="rol-buttons">
                    <button className="btn-rol" onClick={() => elegirRol("mentor")}>
                        Mentor
                    </button>
                    <button className="btn-rol" onClick={() => elegirRol("aprendiz")}>
                        Aprendiz
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeleccionRol;
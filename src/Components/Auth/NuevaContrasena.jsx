import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function NuevaContrasena() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");

    const guardarPassword = () => {

        if (password !== confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // simulación
        alert("Contraseña actualizada");

        navigate("/login");

    }

    return (

        <div className="creacion-contenedor">

            <div className="Circulo1" />
            <div className="circulo2" />
            <div className="circulo3" />
            <div className="circulo4" />
            <div className="circulo5" />
            <div className="circulo6" />

            <div className="cuenta-box">

                <img src={logo} className="cuenta-logo" />

                <h2 className="cuenta-title">
                    Recuperación de Contraseña
                </h2>

                <div className="password-group">

                    <div className="input-group">

                        <label>Contraseña</label>

                        <input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    <div className="input-group">

                        <label>Confirmar Contraseña</label>

                        <input
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                        />

                    </div>

                </div>

                <button
                    className="btn"
                    onClick={guardarPassword}
                >
                    Guardar
                </button>

            </div>

        </div>

    )

}

export default NuevaContrasena;
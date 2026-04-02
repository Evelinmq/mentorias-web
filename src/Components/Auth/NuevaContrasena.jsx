import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Common/AuthLayout";
import FormField from "../Common/FormField";
import Button from "../Common/Button";

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
        <AuthLayout>
            <img src={logo} className="cuenta-logo" alt="Logo" />

            <h2 className="cuenta-title">
                Recuperación de Contraseña
            </h2>

            <div className="password-group">
                <FormField
                    label="Contraseña"
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <FormField
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                />
            </div>

            <Button
                text="Guardar"
                className="btn"
                onClick={guardarPassword}
            />
        </AuthLayout>
    );

}

export default NuevaContrasena;
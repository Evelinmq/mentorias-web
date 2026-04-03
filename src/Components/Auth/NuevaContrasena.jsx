import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../Common/AuthLayout";
import FormField from "../Common/FormField";
import Button from "../Common/Button";

function NuevaContrasena() {

    const location = useLocation();
    const navigate = useNavigate();

    // Recuperamos el correo del "state" de la navegación anterior
    const correo = location.state?.correoDestino || "";

    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");

    const handleGuardar = async () => {
        if (password.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (password !== confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/usuarios/actualizar-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correo: correo,
                    nuevaPassword: password
                })
            });

            if (response.ok) {
                alert("¡Contraseña actualizada! Ahora puedes iniciar sesión.");
                navigate("/login");
            } else {
                alert("Hubo un error al actualizar. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <AuthLayout>
            <img src={logo} className="cuenta-logo" alt="Logo" />
            <h2 className="cuenta-title">Nueva Contraseña</h2>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Estás cambiando la contraseña para: <br/><strong>{correo}</strong>
            </p>

            <div className="password-group">
                <FormField
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="Escribe tu nueva clave"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <FormField
                    label="Confirmar Contraseña"
                    type="password"
                    placeholder="Repite tu nueva clave"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                />
            </div>

            <Button
                text="Actualizar y Entrar"
                className="btn"
                onClick={handleGuardar}
            />
        </AuthLayout>
    );
}

export default NuevaContrasena;
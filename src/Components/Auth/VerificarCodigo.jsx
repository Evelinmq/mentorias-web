import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../Common/AuthLayout";
import Button from "../Common/Button";
import PinInput from "../Common/PinInput";

function VerificarCodigo() {
    const location = useLocation();
    const navigate = useNavigate();
    const correo = location.state?.correoDestino || "";

    const [codigo, setCodigo] = useState(["", "", "", "", ""]);

    // Esta función se encarga de enviar el código al backend
    const enviarAlBackend = async (codigoArray) => {
        const codigoString = codigoArray.join("");
        // Solo enviamos si realmente tenemos los 5 dígitos
        if (codigoString.length === 5) {
            try {
                const response = await fetch("http://localhost:8080/api/usuarios/verificar-codigo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        correo: correo, // Verifica que 'correo' no sea ""
                        codigo: codigoString
                    })
                });

                if (response.ok) {
                    // USAR NAVEGACIÓN EXPLÍCITA
                    navigate("/nueva-password", {
                        state: { correoDestino: correo },
                        replace: true // Evita que al darle "atrás" vuelva a la verificación
                    });
                } else {
                    alert("Código incorrecto o expirado.");
                    // Limpiamos el código para que el usuario intente de nuevo
                    setCodigo(["", "", "", "", ""]);
                }
            } catch (error) {
                console.error("Error en la petición:", error);
            }
        }
    };

    const handleChange = (valor, index, e) => {
        const nuevoCodigo = [...codigo];
        nuevoCodigo[index] = valor;
        setCodigo(nuevoCodigo);

        // Salto visual entre inputs
        if (valor && e && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }

        // Salto automático al Backend cuando se llena el último
        if (nuevoCodigo.every(digito => digito !== "")) {
            enviarAlBackend(nuevoCodigo);
        }
    };

    //Función para reenviar el código
    const handleReenviar = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/usuarios/recuperar-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: correo })
            });
            if (response.ok) {
                alert("Se ha enviado un nuevo código a " + correo);
            }
        } catch (error) {
            console.error("Error al reenviar:", error);
        }
    };

    return (
        <AuthLayout>
            <img src={logo} className="cuenta-logo" alt="Logo" />
            <h2 className="cuenta-title">Verifica tu correo</h2>
            <p className="cuenta-subtitle">Hemos enviado un código a: <br/><strong>{correo}</strong></p>

            <PinInput
                length={5}
                values={codigo}
                onChange={handleChange}
            />

            <div className="botones-recuperacion">
                <Button
                    text="Volver"
                    className="btn-secundario"
                    onClick={() => navigate("/login")}
                />
                <Button
                    text="Reenviar código"
                    className="btn"
                    onClick={handleReenviar}
                />
            </div>
        </AuthLayout>
    );
}

export default VerificarCodigo;
import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Common/AuthLayout";
import Button from "../Common/Button";
import PinInput from "../Common/PinInput";

function VerificarCodigo() {

    const navigate = useNavigate();
    const [codigo, setCodigo] = useState(["", "", "", "", ""]);

    const handleChange = (valor, index) => {

        const nuevoCodigo = [...codigo];
        nuevoCodigo[index] = valor;
        setCodigo(nuevoCodigo);

    }

    const verificarCodigo = () => {

        // simulación
        navigate("/nueva-password");

    }

    return (
        <AuthLayout>
            <img src={logo} className="cuenta-logo" alt="Logo" />

            <h2 className="cuenta-title">
                Recuperación de Contraseña
            </h2>

            <p>
                Introduce el código que enviamos a tu correo
            </p>

            <PinInput
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
                    text="Verificar"
                    className="btn"
                    onClick={verificarCodigo}
                />
            </div>
        </AuthLayout>
    );

}

export default VerificarCodigo;
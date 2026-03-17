import React, { useState } from "react";
import "./Recuperacion.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

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

        <div className="creacion-contenedor">

            <div className="Circulo1" />
            <div className="circulo2" />
            <div className="circulo3" />
            <div className="circulo4" />
            <div className="circulo5" />
            <div className="circulo6" />
            <div className="circulo8" />

            <div className="cuenta-box">

                <img src={logo} className="cuenta-logo" />

                <h2 className="cuenta-title">
                    Recuperación de Contraseña
                </h2>

                <p>
                    Introduce el código que enviamos a tu correo
                </p>

                <div className="codigo-container">

                    {codigo.map((c, index) => (

                        <input
                            key={index}
                            maxLength="1"
                            className="codigo-input"
                            value={c}
                            onChange={(e) => handleChange(e.target.value, index)}
                        />

                    ))}

                </div>

                <div className="botones-recuperacion">

                    <button
                        className="btn-secundario"
                        onClick={() => navigate("/login")}
                    >
                        Volver
                    </button>

                    <button
                        className="btn"
                        onClick={verificarCodigo}
                    >
                        Reenviar
                    </button>

                </div>

            </div>

        </div>

    )

}

export default VerificarCodigo;
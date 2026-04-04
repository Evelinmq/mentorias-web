import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Registro.css";
import { alertaCamposCaracteres, alertaCamposVacios, alertaExito, alertaError } from "../../utils/alerts";
import { enviarDatos, obtenerDatos } from "../../utils/api";

import AuthLayout from "../Common/AuthLayout";
import Input from "../Common/Input";
import Button from "../Common/Button";
import Select from "../Common/Select";

function Registro() {
    const navigate = useNavigate();
    const [carreras, setCarreras] = useState([]);

    const [formData, setFormData] = useState({
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        carrera: "",
        email: "",
        password: "",
        rol: ""
    });

    useEffect(() => {
        const cargarCarreras = async () => {
            try {
                const data = await obtenerDatos('/api/carreras');
                const opcionesCarreras = data.map(c => ({ value: c.id, label: c.nombre }));
                setCarreras(opcionesCarreras);
            } catch (error) {
                console.error("Error al cargar carreras:", error);
            }
        };
        cargarCarreras();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegistro = async (e) => {
        e.preventDefault();

        const { nombre, apellidoPaterno, apellidoMaterno, carrera, email, password, rol } = formData;

        if (!nombre.trim() || !apellidoPaterno.trim() || !apellidoMaterno.trim() || !carrera || !email || !password || !rol) {
            alertaCamposVacios();
            return;
        }

        const regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!regexNombres.test(nombre) || !regexNombres.test(apellidoPaterno) || !regexNombres.test(apellidoMaterno)) {
            alertaCamposCaracteres("Los nombres y apellidos solo deben contener letras.");
            return;
        }

        const usuariosData = {
            nombre: nombre.trim(),
            apellidoPaterno: apellidoPaterno.trim(),
            apellidoMaterno: apellidoMaterno.trim(),
            email: email,
            password: password,
            carreraId: Number(carrera),
            rolesIds: rol === "2" ? [2] : [3],
            estado_usuario: 3
        };

        try {
            await enviarDatos('/api/usuarios', usuariosData);
            alertaExito("Usuario en espera de aprobación");
            navigate("/login");
        } catch (error) {
            alertaError("Error al procesar el registro");
        }
    };

    return (
        <AuthLayout>
            <img src={logo} className="login-logo" alt="Logo" />
            <h1 className="cuenta-title">Registro</h1>

            <form onSubmit={handleRegistro}>
                <div className="form-row" style={{ display: 'flex', gap: '10px' }}>
                    <Input
                        placeholder="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <Input
                        placeholder="Apellido Paterno"
                        name="apellidoPaterno"
                        value={formData.apellidoPaterno}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Input
                        placeholder="Apellido Materno"
                        name="apellidoMaterno"
                        value={formData.apellidoMaterno}
                        onChange={handleChange}
                    />
                    <Select
                        name="carrera"
                        placeholder="Selecciona Carrera"
                        options={carreras}
                        register={(name) => ({
                            name,
                            onChange: handleChange
                        })}
                    />
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <Input
                        type="email"
                        placeholder="Correo"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ marginTop: '10px' }}>
                    <Select
                        name="rol"
                        placeholder="¿Cómo deseas unirte?"
                        options={[
                            { value: "2", label: "Mentor" },
                            { value: "3", label: "Aprendiz" }
                        ]}
                        register={(name) => ({
                            name,
                            onChange: handleChange
                        })}
                    />
                </div>

                <Button
                    type="submit"
                    className="login-btn"
                    text="Crear Cuenta"
                    style={{ marginTop: '20px', width: '100%' }}
                />
            </form>

            <p className="register" onClick={() => navigate("/login")} style={{ cursor: 'pointer', marginTop: '15px' }}>
                ¿Ya tienes cuenta? <span>Inicia Sesión</span>
            </p>
        </AuthLayout>
    );
}

export default Registro;
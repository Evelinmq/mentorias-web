import React from "react";
import "./Registro.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Registro() {
    const navigate = useNavigate();

    return (
        <div className="creacion-contenedor">
            <div className="Circulo1"/>
            <div className="circulo2"/>
            <div className="circulo3"/>
            <div className="circulo4"/>
            <div className="circulo5"/>
            <div className="circulo6"/>
            <div className="circulo8"/>
            <div className="cuenta-box">
                <img src={logo} alt="Logo" className="cuenta-logo" />
                <h1 className="cuenta-title">Registro</h1>
                <form>
                    <div className="form-row">

                        <div className="input-group">
                    <label >Nombre</label>
                    <input type="text" id="nombre" placeholder="Ingrese su nombre" />
                    </div>

                    <div className="input-group">
                    <label >Apellido Paterno</label>
                    <input type="text" id="ApellidoPaterno" placeholder="Ingrese su apellido paterno" />
                    </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                    <label >Apellido Materno</label>
                    <input type="text" id="ApellidoMaterno" placeholder="Ingrese su apellido materno" />
                        </div>

                    <div className="input-group">
                    <label >Matrícula</label>
                    <input type="text" id="matricula" placeholder="Ingrese su matrícula" />
                    </div>

                    </div>

                    <div className="form-row">
                    <div className="input-group">
                    <label >Carrera</label>
                    <select id="carrera">
                        <option value="">Selecciona tu carrera:</option>
                        <option value="sistemas">Ingenieria en Sistemas</option>
                        <option value="administracion">Administracion</option>
                        <option value="mecatronica">Mecatronica</option>
                    </select>
                    </div>
                    <div className="input-group">
                    <label >Cuatrimestre</label>
                    <input type="text" id="cuatrimestre" placeholder="Ingrese su cuatrimestre" />
                    </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                    <label >Correo</label>
                    <input type="email" id="correo" placeholder="Ingrese su email" />
                    </div>

                    <div className="input-group">
                    <label >Contraseña</label>
                    <input type="password" id="password" placeholder="Ingrese su contraseña" />
                    </div>
                    <div className="input-group">
                    <label >Rol</label>
                    <select id="rol">
                        <option value="">Selecciona tu rol:</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Aprendiz">Aprendiz</option>
                    </select>
                    </div>
                    </div>
                    <button className="btn" type="submit">Crear Cuenta</button>
                </form>
            </div>
        </div>
    );
}

export default Registro;
import React from "react";
import "./Registro.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { alertaCamposCaracteres, alertaCamposVacios, alertaExito } from "../../utils/alerts";
import { enviarDatos } from "../../utils/api";
import { alertaError } from "../../utils/alerts";

function Registro() {
    const navigate = useNavigate();

    //Estado para los campos del formulario
    const [formData, setFormData] = React.useState({
        nombre: "",
        ApellidoPaterno: "",
        ApellidoMaterno: "",
        matricula: "",
        carrera: "",
        cuatrimestre: "",
        correo: "",
        password: "",
        rol: ""
    }); 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleRegistro = (e) => {
        e.preventDefault();



        //limpieza de espacio
        const { nombre, ApellidoPaterno, ApellidoMaterno, matricula, carrera, cuatrimestre, correo, password, rol } = formData;
        
        const n = nombre.trim();
        const ap = ApellidoPaterno.trim();
        const am = ApellidoMaterno.trim();

        // Validación de campos vacíos
        if (!n || !ap || !am || !matricula || !carrera || !cuatrimestre || !correo || !password || !rol) {
            alertaCamposVacios();
            return;
        }

        //validacion de caracteres
        const regexNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (nombre.trim() !== " " && !regexNombres.test(nombre.trim())) {
            alertaCamposCaracteres("El nombre solo debe contener letras.");
            return;
        }

        if (ApellidoPaterno.trim() !== " " && !regexNombres.test(ApellidoPaterno.trim())) {
            alertaCamposCaracteres("El apellido paterno solo debe contener letras.");
            return;
        }

        if (ApellidoMaterno.trim() !== " " && !regexNombres.test(ApellidoMaterno.trim())) {
            alertaCamposCaracteres("El apellido materno solo debe contener letras.");
            return;
        }

        // Aquí iría la lógica para enviar los datos al backend o realizar alguna acción con ellos
        const onSubmit = async (data) => {
            try {
                await enviarDatos('/api/usuarios', data);
                alertaExito("Usuario registrado correctamente");
            } catch (error) {
              alertaError("Error al procesar la solicitud");
              console.error("Error:", error);
            }
          };
        alertaExito();
        navigate("/login");
    };

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
                <form onSubmit={handleRegistro}>
                    <div className="form-row">

                        <div className="input-group">
                    <label >Nombre</label>
                    <input type="text" id="nombre" placeholder="Ingrese su nombre" 
                    value={formData.nombre} onChange={handleChange}/>
                    </div>

                    <div className="input-group">
                    <label >Apellido Paterno</label>
                    <input type="text" id="ApellidoPaterno" placeholder="Ingrese su apellido paterno"
                    value={formData.ApellidoPaterno} onChange={handleChange} />
                    </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                    <label >Apellido Materno</label>
                    <input type="text" id="ApellidoMaterno" placeholder="Ingrese su apellido materno"
                    value={formData.ApellidoMaterno} onChange={handleChange} />
                        </div>

                    <div className="input-group">
                    <label >Matrícula</label>
                    <input type="text" id="matricula" placeholder="Ingrese su matrícula" 
                    value={formData.matricula} onChange={handleChange}/>
                    </div>

                    </div>

                    <div className="form-row">
                    <div className="input-group">
                    <label >Carrera</label>
                    <select id="carrera" value={formData.carrera} onChange={handleChange}>
                        <option value="">Selecciona tu carrera:</option>
                        <option value="sistemas">Ingenieria en Sistemas</option>
                        <option value="administracion">Administracion</option>
                        <option value="mecatronica">Mecatronica</option>
                    </select>
                    </div>
                    <div className="input-group">
                    <label >Cuatrimestre</label>
                    <select id="cuatrimestre" value={formData.cuatrimestre} onChange={handleChange}>
                        <option value="">Selecciona tu cuatrimestre:</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    </div>
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                    <label >Correo</label>
                    <input type="email" id="correo" placeholder="Ingrese su email" 
                    value={formData.correo} onChange={handleChange}/>
                    </div>

                    <div className="input-group">
                    <label >Contraseña</label>
                    <input type="password" id="password" placeholder="Ingrese su contraseña" 
                    value={formData.password} onChange={handleChange}/>
                    </div>
                    <div className="input-group">
                    <label >Rol</label>
                    <select id="rol" value={formData.rol} onChange={handleChange}>
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
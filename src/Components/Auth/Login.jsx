import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { alertaCamposVacios } from "../../utils/alerts";
import logo from "../../assets/logo.png";
import "./Login.css";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault(); 

    if (correo === "" || password === "") {
      console.log("Debes de completar todos los campos");
      alertaCamposVacios();
      return;
    }

    alert("Login simulado correctamente (esto es momentaneo)");

    // SIMULACIÓN
    let rol = "admin";

    if (correo.includes("mentor")) {
      rol = "mentor";
    }
    if (correo.includes("aprendiz")) {
      rol = "aprendiz";
    }

    login(correo, rol);

    navigate("/dashboard");

  };

  return (

    <div className="login-contenedor">

      <div className="Circulo1" />
      <div className="circulo2" />
      <div className="circulo3" />
      <div className="circulo4" />
      <div className="circulo5" />
      <div className="circulo6" />
      <div className="circulo7" />
      <div className="circulo8" />

      <div className="login-box">

        <img src={logo} className="login-logo" />

        <h2 className="login-title">Inicio de Sesión</h2>

        <form onSubmit={handleLogin}>

          <label>Correo</label>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <p
            className="forgot"
            onClick={() => navigate("/verificar-codigo")}
            style={{ cursor: "pointer" }}
          >
            ¿Olvidaste tu contraseña?
          </p>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>

        </form>

        <p className="register" onClick={() => navigate("/registro")}>
          ¿No tienes cuenta? <span>Crear cuenta</span>
        </p>

      </div>

    </div>

  );

}

export default Login;
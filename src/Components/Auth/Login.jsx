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

  // Convertimos la función a asíncrona (async) para poder usar 'await' en la petición
  const handleLogin = async (e) => {
    e.preventDefault();

    if (correo === "" || password === "") {
      console.log("Debes de completar todos los campos");
      alertaCamposVacios();
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          // Spring Security espera los datos como si fuera un formulario HTML clásico
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: correo,
          password: password
        }),
        credentials: "include"
      });

      if (response.ok && !response.url.includes("error")) {

        // SE EXTRAE Y SE LEE EL JSON
        const data = await response.json();

        // SE TOMAN LOS DATOS DEL BACK ENDDDDDDDD
        const correoUsuario = data.correo;
        const rolAsignado = data.rol;

        login(correoUsuario, rolAsignado);

        if (rolAsignado === "admin") {
          navigate("/dashboard");
        } else if (rolAsignado === "mentor") {
          navigate("/mentor/dashboard");
        } else if (rolAsignado === "aprendiz") {
          navigate("/aprendiz/dashboard");
        }

      } else {
        alert("Correo o contraseña incorrectos");
      }

    } catch (error) {
      console.error("Error conectando con el backend:", error);
      alert("No se pudo conectar con el servidor. Verifica que Spring Boot esté encendido.");
    }
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
          <img src={logo} className="login-logo" alt="Logo" />
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

//No
export default Login;
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { alertaCamposVacios, alertaError, alertaExito } from "../../utils/alerts";
import logo from "../../assets/logo.png";
import "./Login.css";
import AuthLayout from "../Common/AuthLayout";
import FormField from "../Common/FormField";
import Button from "../Common/Button";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (correo === "" || password === "") {
      console.log("Debes de completar todos los campos");
      alertaCamposVacios();
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Cambiado a JSON
        },
        body: JSON.stringify({ // Enviar objeto JSON
          correo: correo,      // Asegúrate que estos nombres coincidan con los de tu LoginDTO en Java
          password: password
        })
      });


      const data = await response.json();

      if (response.ok) {

        alertaExito("Inicio de sesión exitoso");

        console.log("login exitoso:", data);

        localStorage.setItem("token", data.token);

        const correoUsuario = data.correo;
        const rolAsignado = data.rol ? data.rol.toLowerCase() : "";

        login(correoUsuario, rolAsignado, data.token);

    

        if (rolAsignado === "admin" || rolAsignado === "administrador" || rolAsignado === "role_admin") {
          navigate("/dashboard");
        } else if (rolAsignado === "mentor" || rolAsignado === "role_mentor") {
          navigate("/mentor/dashboard");
        } else if (rolAsignado === "aprendiz" || rolAsignado === "role_aprendiz") {
          navigate("/aprendiz/dashboard");
        } else {
          alert("Iniciaste sesión, pero tu rol es desconocido: " + rolAsignado);
          navigate("/aprendiz/dashboard");
        }

      } else {
       alertaError("Sigue en pendiente de aprobación o estan mal tu correo o contraseña");
      }

    } catch (error) {
      console.error("Error conectando con el backend:", error);
      alert("No se pudo conectar con el servidor. Verifica que Spring Boot esté encendido.");
    }
  };

  return (
      <AuthLayout>
        <img src={logo} className="login-logo" alt="Logo" />
        <h2 className="login-title">Inicio de Sesión</h2>

        <form onSubmit={handleLogin}>
          <FormField
              label="Correo"
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
          />

          <FormField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />

          <p className="forgot" onClick={() => navigate("/verificar-codigo")}>
            ¿Olvidaste tu contraseña?
          </p>

          <Button
              type="submit"
              className="login-btn"
              text="Iniciar Sesión"
          />
        </form>

        <p className="register" onClick={() => navigate("/registro")}>
          ¿No tienes cuenta? <span>Crear cuenta</span>
        </p>
      </AuthLayout>
  );
}

//No
export default Login;
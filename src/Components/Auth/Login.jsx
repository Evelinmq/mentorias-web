import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { alertaCamposVacios, alertaError, alertaExito } from "../../utils/alerts";
import logo from "../../assets/logo.png";
import "./Login.css";
import AuthLayout from "../Common/AuthLayout";
import FormField from "../Common/FormField";
import Button from "../Common/Button";
import RoleSelectionModal from "./RoleSelectionModal";

function Login() {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  // Para la elcción de rol al iniciar sesión en un usuario con roles mentor y aprendiz
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [tempUserData, setTempData] = useState(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para redirigir según el rol seleccionado
  const handleRoleSelection = (selectedRol) => {
    const { correo, token } = tempUserData;
    login(correo, selectedRol, token);

    if (selectedRol === "mentor") {
      navigate("/mentor/dashboard");
    } else {
      navigate("/aprendiz/dashboard");
    }
    setShowRoleModal(false);
  };

  const handleForgotPassword = async () => {
    // Validar que el campo correo no esté vacío
    if (!correo) {
      alertaError("Por favor, ingresa tu correo para recuperar la contraseña.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo })
      });

      if (response.ok) {
        alertaExito("Código enviado a tu correo");

        // Mandamos el correo a la siguiente pantalla vía 'state'
        // Así la pantalla del código sabe a quién le pertenece ese código
        navigate("/verificar-codigo", { state: { correoDestino: correo } });
      } else {
        alertaError("El correo ingresado no está registrado.");
      }
    } catch (error) {
      console.error("Error:", error);
      alertaError("Error al conectar con el servidor.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (correo === "" || password === "") {
      alertaCamposVacios();
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos datos en local para persistencia básica
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(data));

        const rolAsignado = data.rol ? data.rol.toLowerCase() : "";

        // --- Lógica de Decisión con Modal ---

        // 1. Caso: Tiene AMBOS roles (tu alert mostró "mentor,aprendiz")
        if (rolAsignado.includes("mentor") && rolAsignado.includes("aprendiz")) {
          setTempData(data); // Guardamos la info para usarla al elegir
          setShowRoleModal(true); // Mostramos el modal que ya creamos
          return; // Detenemos aquí para que no navegue solo
        }

        // 2. Caso: Roles individuales (Admin, Mentor solo o Aprendiz solo)
        if (rolAsignado.includes("admin") || rolAsignado.includes("administrador")) {
          login(data.correo, "admin", data.token);
          navigate("/dashboard");
        }
        else if (rolAsignado.includes("mentor")) {
          login(data.correo, "mentor", data.token);
          navigate("/mentor/dashboard");
        }
        else if (rolAsignado.includes("aprendiz")) {
          login(data.correo, "aprendiz", data.token);
          navigate("/aprendiz/dashboard");
        }
        else {
          // Por si acaso no reconoce el string
          alert("Rol desconocido: " + rolAsignado);
          navigate("/aprendiz/dashboard");
        }

        alertaExito("Inicio de sesión exitoso");

      } else {
        alertaError("Error: Credenciales inválidas o cuenta inactiva.");
      }
    } catch (error) {
      console.error("Error:", error);
      alertaError("No se pudo conectar con el servidor.");
    }
  };

  return (
  <>
    <RoleSelectionModal
        isOpen={showRoleModal}
        onSelectRole={handleRoleSelection}
    />

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

        <p className="forgot" onClick={handleForgotPassword} style={{ cursor: "pointer" }}>
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
  </>
  );
}

export default Login;
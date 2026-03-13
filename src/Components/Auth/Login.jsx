import { useState } from "react";
import {alertaCamposVacios} from "../../utils/alerts"

function Login(){
const [correo, setCorreo] = useState("");
const [password, setPassword]= useState("");

const handleLogin = (e) => {
e.preventDefaul();

if(correo === "" || password === ""){
    console.log("Debes de completar todos los campos");
    alertaCamposVacios();
    return;
}
alert("Login similado correctamente (esto es momentaneo)");
};

return(
    <div className="login-contenedor">
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

          <p className="forgot">¿Olvidaste tu contraseña?</p>

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>

        </form>

        <p className="register">
          ¿No tienes cuenta? <span>Crear cuenta</span>
        </p>

      </div>

</div>
);

}
export default Login;
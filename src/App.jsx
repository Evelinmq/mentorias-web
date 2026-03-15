import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Auth/Login";
import MainMenu from "./Components/All/MainMenu";
import Registro from "./Components/CreacionCuenta/Registro";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoute";

import VerificarCodigo from "./Auth/VerificarCodigo";
import NuevaContrasena from "./Auth/NuevaContrasena";

function App() {

  return (

      <Routes>

        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/registro" element={<PublicRoute />}>
          <Route index element={<Registro />} />
        </Route>

        <Route path="/verificar-codigo" element={<PublicRoute />}>
          <Route index element={<VerificarCodigo />} />
        </Route>

        <Route path="/nueva-password" element={<PublicRoute />}>
          <Route index element={<NuevaContrasena />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<MainMenu />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

  );
}

export default App;
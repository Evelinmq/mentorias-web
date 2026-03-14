import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Auth/Login";
import MainMenu from "./Components/All/MainMenu";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoute";

function App() {

  return (

      <Routes>

        <Route path="/login" element={<PublicRoute />}>
          <Route index element={<Login />} />
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

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function PublicRoute() {
    const { user } = useContext(AuthContext);

    if (user) {
        if (user.rol === "admin") return <Navigate to="/dashboard" replace />;
        if (user.rol === "mentor") return <Navigate to="/mentor/dashboard" replace />;
        if (user.rol === "aprendiz") return <Navigate to="/aprendiz/dashboard" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;
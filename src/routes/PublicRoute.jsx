import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

function PublicRoute() {

    const { user } = useContext(AuthContext);

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

export default PublicRoute;

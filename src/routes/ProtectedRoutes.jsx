import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Header from "../Components/All/Header";
import Sidebar from "../Components/Common/Sidebar.jsx";

function ProtectedRoutes({ allowedRoles }) {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.rol)) 
        if (allowedRoles && !allowedRoles.includes(user.rol)) {

    if (user.rol === "admin") return <Navigate to="/dashboard" replace />;
    if (user.rol === "mentor") return <Navigate to="/mentor/dashboard" replace />;
    if (user.rol === "aprendiz") return <Navigate to="/aprendiz/dashboard" replace />;

}

    return (
        <div className="layout-wrapper">
            <Header />
            <div className="layout-body" style={{ display: "flex", flex: 1 }}>
                <main className="main-content" style={{ flex: 1, padding: "20px", backgroundColor: "#f4f7f9" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
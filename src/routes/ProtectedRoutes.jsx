import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Header from "../Components/All/Header";
import Sidebar from "../Components/All/Sidebar";

function ProtectedRoutes({ allowedRoles }) {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.rol)) return <Navigate to="/dashboard" replace />;

    return (
        <div className="layout-wrapper">
            <Header />
            <div className="layout-body" style={{ display: "flex", flex: 1 }}>
                <Sidebar />
                <main className="main-content" style={{ flex: 1, padding: "20px", backgroundColor: "#f4f7f9" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectedRoutes;
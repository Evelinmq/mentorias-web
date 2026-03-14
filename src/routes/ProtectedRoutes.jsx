import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Header from "../Components/All/Header";
import MainMenu from "../Components/All/MainMenu";
;

function ProtectedRoutes({ allowedRoles }) {

    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

            <Header />

            <div style={{ display: "flex", flex: 1 }}>
                {/* El Menú Lateral al lado izquierdo */}
                <Sidebar />

                {/* El Contenido de la página (Carreras, Usuarios, etc.) al lado derecho */}
                <main style={{ 
                    flex: 1, 
                    padding: "20px", 
                    backgroundColor: "#f4f7f9", 
                    overflowY: "auto" 
                }}>
                    <MainMenu />
                </main>
            </div>
        </div>
    );
}

export default ProtectedRoutes;

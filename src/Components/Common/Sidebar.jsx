import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import "./Sidebar.css";

function Sidebar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-menu">
                <h2 className="sidebar-title">Menú</h2>
                <NavLink to="/mentor/dashboard" className="nav-link">
                    Inicio
                </NavLink>
                
                {user?.rol === "mentor" && (
                    <NavLink to="/mentor/dashboard" className="nav-item">
                        Mi Agenda
                    </NavLink>
                )}

                {user?.rol === "aprendiz" && (
                    <NavLink to="/aprendiz/dashboard" className="nav-item">
                        Mis Mentorías
                    </NavLink>
                )}

                <NavLink to="/perfil" className="nav-item">
                    Mi Perfil
                </NavLink>
            </div>

            <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </aside>
    );
}

export default Sidebar;
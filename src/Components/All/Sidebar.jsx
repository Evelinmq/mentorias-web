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
            <nav className="sidebar-nav">
                <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
                    <i className="bi bi-house"></i> Inicio
                </NavLink>
                
                {user?.rol === "mentor" && (
                    <NavLink to="/mentor/dashboard" className="nav-link">
                        <i className="bi bi-calendar-event"></i> Mi Agenda
                    </NavLink>
                )}

                {user?.rol === "aprendiz" && (
                    <NavLink to="/aprendiz/dashboard" className="nav-link">
                        <i className="bi bi-book"></i> Buscar Mentor
                    </NavLink>
                )}

                <NavLink to="/perfil" className="nav-link">
                    <i className="bi bi-person"></i> Mi Perfil
                </NavLink>
            </nav>

            <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </aside>
    );
}

export default Sidebar;
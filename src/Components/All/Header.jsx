import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import LogOutIcon from '../../assets/LogOutIcon.png';
import icono from '../../assets/icono.png';
import Swal from "sweetalert2";


const Header = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
   Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tendrás que ingresar tus credenciales nuevamente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#18397F", 
      cancelButtonColor: "rgb(158, 155, 155)",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      reverseButtons: true 
    }).then((result) => {
      if (result.isConfirmed) {
    
        logout();
        navigate("/login", { replace: true });
        
      }
    });
  };

  return (
      <header style={styles.header}>
        <div style={styles.leftSection}>
          <div style={styles.logoContainer}>
            <img src={icono} alt="Logo" style={styles.logoImg} />
          </div>
          <span style={styles.titleText}>SISTEMA DE MENTORÍAS</span>
        </div>

        <div style={styles.rightSection}>
          <button onClick={handleLogout} style={styles.iconButton}>
            <img src={LogOutIcon} alt="Cerrar sesión" />
          </button>

          <div style={styles.avatarCircle}>
            <img alt="" />
          </div>
        </div>
      </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#18397F',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 25px',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxSizing: 'border-box'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: '4px',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    backgroundColor: '#18397F',
    height: '30px',
    width: 'auto',
  },
  titleText: {
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    transition: 'opacity 0.2s',
  },
  avatarCircle: {
    width: '38px',
    height: '38px',
    backgroundColor: 'white',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.3)',
  }
};

export default Header;
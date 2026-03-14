import { useNavigate } from "react-router-dom";
import LogOutIcon from '../../assets/LogOutIcon.png';
import logo from '../../assets/logo.png'

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Borrar el token/sesión del AuthContext
    console.log("Cerrando sesión...");
    localStorage.removeItem('token');
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      {/* SECCIÓN IZQUIERDA.-.-.-.-.-.*/}
      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logoImg} />
        </div>
        <span style={styles.titleText}>SISTEMA DE MENTORÍAS</span>
      </div>

      {/* SECCIÓN DERECHA-.-.-.-.-.*/}
      <div style={styles.rightSection}>

        <button onClick={handleLogout} style={styles.iconButton}>
          <img src={LogOutIcon} alt="Cerrar sesión"/>
        </button>

        {/* Círculo de Perfil*/}
        <div style={styles.avatarCircle}>
            {/*Colocar imagen del perfil*/}
          <img  />
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
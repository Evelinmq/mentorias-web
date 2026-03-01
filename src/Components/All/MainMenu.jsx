import React, { useState } from 'react';
import './MainMenu.css';
import VistaReportes from '../Admin/VistaReportes';
import VistaUsuarios from '../Admin/VistaUsuarios';
import VistaMaterias from '../Admin/VistaMaterias';
import VistaCarreras from '../Admin/VistaCarreras';


function MainMenu() {
  const [vistaActual, setVistaActual] = useState('Reportes');
  const botones = ['Reportes', 'Usuarios', 'Materias', 'Carreras'];

  const renderizarContenido = () => {
    switch (vistaActual) {
      case 'Usuarios': return <VistaUsuarios />;
      case 'Materias': return <VistaMaterias />;
      case 'Carreras': return <VistaCarreras />;
      default: return <VistaReportes />;
    }
  };

  return (
    <div className="menu-container">
      <div className="sidebar">
        {botones.map((nombre) => (
          <button
            key={nombre}
            onClick={() => setVistaActual(nombre)}
            // Lógica de botón presionado
            className={`btn-menu ${vistaActual === nombre ? 'btn-active' : 'btn-inactive'}`}
          >
            {nombre}
          </button>
        ))}
      </div>

      <main style={{ flex: 1 }}>
        {renderizarContenido()}
      </main>
    </div>
  );
}

export default MainMenu
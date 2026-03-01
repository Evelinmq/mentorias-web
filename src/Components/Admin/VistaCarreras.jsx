import React from 'react';
import './VistaCarreras.css';
import iconEdit from '../../assets/EditIcon.png';

const VistaCarreras = () => {

    //Datos precargados de ejemplo
  const carreras = [
    { nombre: 'Desarrollo de software' },
    { nombre: 'Redes y ciberseguridad' }
  ];

  return (
    <div className="carreras-container">
      <header className="carreras-header">
        <div className="header-left">
          <button className="btn-agregar">+ Agregar</button>
        </div>
      </header>

      <div className="tabla-wrapper">
        <table className="tabla-general">
          <thead>
            <tr>
              <th>Carrera</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {carreras.map((carrera, index) => (
              <tr key={index}>
                <td>{carrera.nombre}</td>
                <td className="acciones-celda">
                  <button className="btn-accion">
                    <img src={iconEdit} alt="Editar" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaCarreras;

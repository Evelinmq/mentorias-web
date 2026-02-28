import React from 'react';
import './VistaMaterias.css';
// Importamos los iconos que ya tienes
import iconEdit from '../../assets/EditIcon.png';
import iconDelete from '../../assets/TrashIcon.png';

const VistaMaterias = () => {

  // Datos de ejemplo .-.-.-.-.-.-.-.- Borrar despúes
  const materias = [
    { nombre: 'Programacion', carrera: 'Desarrollo de software', cuatrimestre: '7' },
    { nombre: 'Redes', carrera: 'Desarrollo de software', cuatrimestre: '1' }
  ];

  return (
    <div className="materias-container">
      <header className="materias-header">
        <div className="header-left">
          <button className="btn-agregar">+ Agregar</button>
        </div>
      </header>

      <div className="tabla-wrapper">
        <table className="tabla-general">
          <thead>
            <tr>
              <th>Materia</th>
              <th>Carrera</th>
              <th>Cuatrimestre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia, index) => (
              <tr key={index}>
                <td>{materia.nombre}</td>
                <td>{materia.carrera}</td>
                <td>{materia.cuatrimestre}</td>
                <td className="acciones-celda">
                  <button className="btn-accion">
                    <img src={iconEdit} alt="Editar" />
                  </button>
                  <button className="btn-accion btn-delete">
                    <img src={iconDelete} alt="Eliminar" />
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

export default VistaMaterias;
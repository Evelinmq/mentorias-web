import React, { useState } from 'react';
import './VistaMaterias.css';
// Importamos los iconos que ya tienes
import iconEdit from '../../assets/EditIcon.png';
import iconDelete from '../../assets/TrashIcon.png';

const VistaMaterias = () => {

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAgregar = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditar = (materia) => {
    setIsEditing(true);
    setShowModal(true);

    console.log("Editando materia...");
  };

  // Datos de ejemplo .-.-.-.-.-.-.-.- Borrar despúes
  const materias = [
    { nombre: 'Programacion', carrera: 'Desarrollo de software', cuatrimestre: '7' },
    { nombre: 'Redes', carrera: 'Desarrollo de software', cuatrimestre: '1' }
  ];

  return (
    <div className="materias-container">
      <header className="materias-header">
        <div className="header-left">
          <button className="btn-agregar" 
          onClick={handleAgregar}>
            + Agregar
          </button>

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
                  <button className="btn-accion"
                    onClick={()=> handleEditar(materia)}>
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

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2 className='modal-title'>
              {isEditing ? "Editar materia" : "Agregar materia"}
            </h2>

            <form className='modal-form'>
              <div className='modal-grid'>
                {/*Lado izquierdo */}
                <div className='modal-column'>
                  <input type="text" placeholder='Materia' className='modal-input' />
                  <input type="text" placeholder='Cuatrimestre' className='modal-input' />
                </div>

                {/*Lado derecho */}
                <div className='modal-column'>

                  <select className='modal-select'>
                    <option value="" disabled selected>Carrera</option>
                  </select>

                </div>
              </div>

              <div className='modal-actions'>
                <button type='button'
                className='btn-cancelar'
                onClick={()=> setShowModal(false)}>
                  Cancelar
                </button>

                <button type="submit" className='btn-guardar'>
                  {isEditing ? "Actualizar" : "Guardar"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaMaterias;
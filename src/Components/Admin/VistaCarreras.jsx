import React, { useState } from 'react';
import './VistaCarreras.css';
import iconEdit from '../../assets/EditIcon.png';

const VistaCarreras = () => {

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAgregar = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditar = (usuario) => {
    setIsEditing(true);
    setShowModal(true);

    console.log("Editando a:", usuario);
  };

    //Datos precargados de ejemplo
  const carreras = [
    { nombre: 'Desarrollo de software' },
    { nombre: 'Redes y ciberseguridad' }
  ];

  return (
    <div className="carreras-container">
      <header className="carreras-header">
        <div className="header-left">
          <button className="btn-agregar" onClick={handleAgregar}>
            + Agregar
          </button>
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
                  <button className="btn-accion"
                    onClick={()=> handleEditar(carrera)}>
                    <img src={iconEdit} alt="Editar" />
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
              {isEditing ? "Editar carrera" : "Agregar carrera"}
            </h2>

            <form className='modal-form'>
                <div className='modal-center'>
                  <input type="text" placeholder='Carrera' className='modal-input' />
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

export default VistaCarreras;

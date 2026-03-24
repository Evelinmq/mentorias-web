import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaMaterias.css';
import iconEdit from '../../assets/EditIcon.png';
import iconDelete from '../../assets/TrashIcon.png';
import { alertaExito, confirmarEliminar, alertaCamposVacios, alertaError } from "../../utils/alerts";

const VistaMaterias = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleAgregar = () => {
    setIsEditing(false);
    reset();
    setShowModal(true);
  };

  const handleEditar = (materia) => {
    setIsEditing(true);

    reset({
      nombre: materia.nombre || '',
      cuatrimestre: materia.cuatrimestre || '',
      carrera: materia.carrera || ''
    });

    setShowModal(true);
    console.log("Editando materia...");
  };

  const onSubmit = (data) => {
    console.log(data);

    if (isEditing) {
      alertaExito("Materia actualizada correctamente");
    } else {
      alertaExito("Materia guardada correctamente");
    }

    reset();
    setShowModal(false);
  };

  const onError = () => {
    if (errors.cuatrimestre?.type === "min" || errors.cuatrimestre?.type === "max") {
      alertaError("El cuatrimestre debe estar entre 1 y 11");
      return;
    }

    alertaCamposVacios();
  };

  const eliminarMateria = async () => {
    const confirmar = await confirmarEliminar();

    if (confirmar) {
      console.log("Materia eliminada");
      alertaExito("Materia eliminada correctamente");
    }
  };

  const materias = [
    { nombre: 'Programacion', carrera: 'Desarrollo de software', cuatrimestre: '7' },
    { nombre: 'Redes', carrera: 'Desarrollo de software', cuatrimestre: '1' }
  ];

  return (
      <div className="materias-container">
        <header className="materias-header">
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
                    <button className="btn-accion" onClick={() => handleEditar(materia)}>
                      <img src={iconEdit} alt="Editar" />
                    </button>
                    <button className="btn-accion btn-delete" onClick={eliminarMateria}>
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

                <form className='modal-form' onSubmit={handleSubmit(onSubmit, onError)}>
                  <div className='modal-grid'>
                    <div className='modal-column'>
                      <input
                          type="text"
                          placeholder='Materia'
                          className='modal-input'
                          {...register("nombre", { required: true })}
                      />

                      <input
                          type="number"
                          placeholder='Cuatrimestre'
                          className='modal-input'
                          {...register("cuatrimestre", {
                            required: true,
                            min: 1,
                            max: 11
                          })}
                      />
                    </div>

                    <div className='modal-column'>
                      <select
                          className='modal-select'
                          {...register("carrera", { required: true })}
                      >
                        <option value="">Carrera</option>
                        <option value="Desarrollo de software">Desarrollo de software</option>
                        <option value="Diseño de modas">Diseño de modas</option>
                      </select>
                    </div>
                  </div>

                  <div className='modal-actions'>
                    <button
                        type='button'
                        className='btn-cancelar'
                        onClick={() => {
                          setShowModal(false);
                          reset();
                        }}
                    >
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
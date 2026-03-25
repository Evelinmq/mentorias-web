import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaMaterias.css';
import './ModalesGlobal.css';

import {
  alertaExito,
  alertaError,
  alertaCamposVacios,
  confirmarEliminar
} from "../../utils/alerts";

import Table from "../Common/Table";
import ActionButtons from "../Common/ActionButtons";

import Input from "../Common/Input";
import Select from "../Common/Select";
import Button from "../Common/Button";

const VistaMaterias = () => {

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // AGREGAR
  const handleAgregar = () => {
    setIsEditing(false);

    reset({
      nombre: '',
      cuatrimestre: '',
      carrera: ''
    });

    setShowModal(true);
  };

  //EDITAR
  const handleEditar = (materia) => {
    setIsEditing(true);

    reset({
      nombre: materia.nombre || '',
      cuatrimestre: materia.cuatrimestre || '',
      carrera: materia.carrera || ''
    });

    setShowModal(true);
  };

  // eLIMINAR
  const eliminarMateria = async () => {
    const confirmar = await confirmarEliminar("¿Eliminar materia?");

    if (confirmar) {
      alertaExito("Materia eliminada correctamente");
    }
  };

  // SUBMIT
  const onSubmit = (data) => {
    alertaExito(isEditing ? "Materia actualizada correctamente" : "Materia guardada correctamente");

    reset();
    setShowModal(false);
  };

  // ERRORES
  const onError = () => {

    if (errors.nombre) {
      if (errors.nombre.type === "required") return alertaCamposVacios();
      if (errors.nombre.type === "pattern") return alertaError("Solo letras permitidas");
      if (errors.nombre.type === "validate") return alertaError("Sin espacios al inicio o final");
    }

    if (errors.cuatrimestre) {
      if (errors.cuatrimestre.type === "required") return alertaCamposVacios();
      if (errors.cuatrimestre.type === "min" || errors.cuatrimestre.type === "max") {
        return alertaError("El cuatrimestre debe estar entre 1 y 11");
      }
    }

    if (errors.carrera) return alertaCamposVacios();

    alertaCamposVacios();
  };

  //DATOS
  const materias = [
    { nombre: 'Programacion', carrera: 'Desarrollo de software', cuatrimestre: '7' },
    { nombre: 'Redes', carrera: 'Desarrollo de software', cuatrimestre: '1' }
  ];

  return (
      <div className="materias-container">

        {/* FONDO BLANCO  */}
        <div className="materias-card">

          <header className="materias-header">
            <div className="header-left">
              <Button
                  text="+ Agregar"
                  className="btn-agregar"
                  onClick={handleAgregar}
              />
            </div>
          </header>

          {/* TABLA */}
          <Table
              data={materias}
              columns={[
                { header: "Materia", accessor: "nombre" },
                { header: "Carrera", accessor: "carrera" },
                { header: "Cuatrimestre", accessor: "cuatrimestre" }
              ]}
              renderActions={(materia) => (
                  <ActionButtons
                      onEdit={() => handleEditar(materia)}
                      onDelete={eliminarMateria}
                      showBlock={false}
                  />
              )}
          />

        </div>

        {/* MODAL */}
        {showModal && (
            <div className='modal-overlay'>
              <div className='modal-content'>

                <h2 className='modal-title'>
                  {isEditing ? "Editar materia" : "Agregar materia"}
                </h2>

                <form className='modal-form' onSubmit={handleSubmit(onSubmit, onError)}>

                  <div className='modal-grid'>

                    <div className='modal-column'>

                      <Input
                          placeholder="Materia"
                          register={register}
                          name="nombre"
                          rules={{
                            required: true,
                            pattern: /^[A-Za-zÁÉÍÓÚñÑ\s]+$/,
                            validate: v => v.trim() === v
                          }}
                      />

                      <Input
                          type="number"
                          placeholder="Cuatrimestre"
                          register={register}
                          name="cuatrimestre"
                          rules={{
                            required: true,
                            min: 1,
                            max: 11
                          }}
                      />

                    </div>

                    <div className='modal-column'>

                      <Select
                          register={register}
                          name="carrera"
                          rules={{ required: true }}
                          options={[
                            "Desarrollo de software",
                            "Diseño de modas"
                          ]}
                      />

                    </div>

                  </div>

                  <div className='modal-actions'>

                    <Button
                        text="Cancelar"
                        className="btn-cancelar"
                        onClick={() => {
                          setShowModal(false);
                          reset();
                        }}
                    />

                    <Button
                        text={isEditing ? "Actualizar" : "Guardar"}
                        type="submit"
                        className="btn-guardar"
                    />

                  </div>

                </form>

              </div>
            </div>
        )}

      </div>
  );
};

export default VistaMaterias;
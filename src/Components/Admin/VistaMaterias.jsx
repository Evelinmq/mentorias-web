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

import { enviarDatos, eliminarDatos, obtenerDatos, actualizarDatos  } from "../../utils/api";

import { useEffect } from 'react';

const VistaMaterias = () => {

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

   const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

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
    setMateriaSeleccionada(materia);
    reset({
      nombre: materia.nombre || '',
      cuatrimestre: materia.cuatrimestre || '',
      carrera: materia.carrera || ''
    });

    setShowModal(true);
  };

  // eLIMINAR
  const eliminarMateria = async (id) => {
    const confirmar = await confirmarEliminar("¿Eliminar materia?");

    if (confirmar) {
      try {
        await eliminarDatos(`/api/materias/${id}`);
        alertaExito("Materia eliminada correctamente");
        cargarMaterias();
      } catch (error) {
        alertaError("No se pudo eliminar la materia");
        console.error("Error al eliminar:", error);
      }
    }
  };

// Recarga de información en tabla
 const [materias, setMaterias] = useState([]);
 
 
   const cargarMaterias = async () => {
     try {
       const data = await obtenerDatos('/api/materias');
       setMaterias(data);
     }catch (error) {
       console.error('Error al cargar materias:', error);
     }
   };
 
   useEffect(() => {
     cargarMaterias();
}, []);


  // SUBMIT
const onSubmit = async (data) => {
    try {
      data.nombre = data.nombre.trim();

      if (isEditing && materiaSeleccionada) {
       //Editar
       await actualizarDatos(`/api/materias/${materiaSeleccionada.id}`, data);
        alertaExito("Materia actualizada correctamente");
      } else {
        // Envio de datos)
        await enviarDatos('/api/materias', data);
        alertaExito("Materia guardada en la base de datos");
      }

      cargarMaterias();
      reset();
      setShowModal(false);
    } catch (error) {
      alertaError("Error al procesar la solicitud");
      console.error("Error:", error);
    }
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
                      onDelete={() => eliminarMateria(materia.id)}
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
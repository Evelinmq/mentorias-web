import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaCarreras.css';
import './ModalesGlobal.css';

import {
  alertaExito,
  alertaCamposVacios,
  alertaError
} from "../../utils/alerts";

import Table from "../Common/Table";
import ActionButtons from "../Common/ActionButtons";

import Input from "../Common/Input";
import Button from "../Common/Button";
import { enviarDatos } from "../../utils/api";

import { useEffect } from 'react';

const VistaCarreras = () => {

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  //AGREGAR
  const handleAgregar = () => {
    setIsEditing(false);

    reset({
      nombre: ''
    });

    setShowModal(true);
  };

  // EDITAR
  const handleEditar = (carrera) => {
    setIsEditing(true);

    reset({
      nombre: carrera.nombre || ''
    });

    setShowModal(true);
  };


  // Recarga de información en tabla
  const [carreras, setcarreras] = useState([]);


  const cargarCarreras = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/carreras');

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    setcarreras(data);
    }catch (error) {
      console.error('Error al cargar carreras:', error);
    }
  };

  useEffect(() => {
    cargarCarreras();
  }, []);

  // SUBMIT PARA AGREGAR Y ENVIAR A BACKEND
 const onSubmit = async (data) => {
    try {
      data.nombre = data.nombre.trim();

      // Enviamos a la ruta de backend 
      await enviarDatos('/api/carreras', data);

      alertaExito("Carrera guardada en la base de datos");
      console.log("Respuesta del servidor:", data);

      cargarCarreras();
      reset();
      setShowModal(false);
    } catch (error) {
      alertaError("No se pudo conectar con el servidor");
      console.error("Error al guardar:", error);
    }
  };

  //VALIDACIONES
  const onError = () => {

    if (errors.nombre) {
      if (errors.nombre.type === "required") return alertaCamposVacios();
      if (errors.nombre.type === "pattern") return alertaError("Solo letras permitidas");
      if (errors.nombre.type === "validate") return alertaError("Sin espacios al inicio o final");
    }

    alertaCamposVacios();
  };

  

  return (
      <div className="carreras-container">


        {/* CARD BLANCO */}
        <div className="carreras-card">

          {/* HEADER */}
          <header className="carreras-header">
            <div className="header-left">
              <Button
                  text="+ Agregar"
                  className="btn-agregar"
                  onClick={handleAgregar}
              />
            </div>
          </header>

          {/* TABLA REUTILIZABLE */}
          <Table
              data={carreras}
              columns={[
                { header: "Carrera", accessor: "nombre" }
              ]}
              renderActions={(carrera) => (
                  <ActionButtons
                      onEdit={() => handleEditar(carrera)}
                      showDelete={false}
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
                  {isEditing ? "Editar carrera" : "Agregar carrera"}
                </h2>

                <form className='modal-form' onSubmit={handleSubmit(onSubmit, onError)}>

                  <div className='modal-center'>

                    <Input
                        placeholder="Carrera"
                        register={register}
                        name="nombre"
                        rules={{
                          required: true,
                          pattern: /^[A-Za-zÁÉÍÓÚñÑ\s]+$/,
                          validate: v => v.trim() === v
                        }}
                    />

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

export default VistaCarreras;
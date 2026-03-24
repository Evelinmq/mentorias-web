import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaCarreras.css';
import './ModalesGlobal.css';

import Input from '../Common/Input';
import Button from '../Common/Button';

import { alertaExito, alertaCamposVacios, alertaError } from "../../utils/alerts";

const VistaCarreras = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    data.nombre = data.nombre.trim();

    alertaExito("Carrera guardada");
    console.log(data);

    reset();
    setShowModal(false);
  };

  const onError = () => {
    if (errors.nombre?.type === "validate") {
      alertaError("Sin espacios al inicio o final");
      return;
    }
    alertaCamposVacios();
  };

  return (
    <div className="carreras-container">

      <Button text="+ Agregar" className="btn-agregar" onClick={() => setShowModal(true)} />

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Agregar Carrera</h2>

            <form onSubmit={handleSubmit(onSubmit, onError)}>

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
                <Button text="Cancelar" className="btn-cancelar" onClick={() => setShowModal(false)} />
                <Button text="Guardar" type="submit" className="btn-guardar" />
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VistaCarreras;
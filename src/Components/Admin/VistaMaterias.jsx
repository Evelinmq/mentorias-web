import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaMaterias.css';
import './ModalesGlobal.css';

import Input from '../Common/Input';
import Select from '../Common/Select';
import Button from '../Common/Button';

import { alertaExito, alertaError, alertaCamposVacios } from "../../utils/alerts";

const VistaMaterias = () => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    data.nombre = data.nombre.trim();

    alertaExito("Materia guardada");
    console.log(data);

    reset();
    setShowModal(false);
  };

  const onError = () => {
    if (errors.cuatrimestre) {
      alertaError("Cuatrimestre 1 - 11");
      return;
    }
    alertaCamposVacios();
  };

  return (
    <div className="materias-container">

      <Button text="+ Agregar" className="btn-agregar" onClick={() => setShowModal(true)} />

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Agregar Materia</h2>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className='modal-grid'>

                <div className='modal-column'>
                  <Input
                    placeholder="Materia"
                    register={register}
                    name="nombre"
                    rules={{
                      required: true,
                      validate: v => v.trim() === v
                    }}
                  />

                  <Input
                    type="number"
                    placeholder="Cuatrimestre"
                    register={register}
                    name="cuatrimestre"
                    rules={{ required: true, min: 1, max: 11 }}
                  />
                </div>

                <div className='modal-column'>
                  <Select
                    register={register}
                    name="carrera"
                    rules={{ required: true }}
                    options={["Desarrollo de software", "Diseño de modas"]}
                  />
                </div>

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

export default VistaMaterias;
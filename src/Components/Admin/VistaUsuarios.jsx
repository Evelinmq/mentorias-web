import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaUsuarios.css';
import './ModalesGlobal.css';

import Input from '../Common/Input';
import Select from '../Common/Select';
import Button from '../Common/Button';

import { alertaExito, alertaError, alertaCamposVacios } from "../../utils/alerts";

const VistaUsuarios = () => {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const limpiarDatos = (data) => ({
        ...data,
        nombres: data.nombres.trim(),
        apellidos: data.apellidos.trim(),
        correo: data.correo.trim().toLowerCase()
    });

    const onSubmit = (data) => {
        const datos = limpiarDatos(data);

        if (isEditing) {
            alertaExito("Usuario actualizado");
        } else {
            alertaExito("Usuario guardado");
        }

        console.log(datos);
        reset();
        setShowModal(false);
    };

    const onError = () => {
        if (errors.nombres?.type === "pattern") {
            alertaError("Nombre inválido");
            return;
        }
        if (errors.nombres?.type === "validate") {
            alertaError("Sin espacios al inicio o final");
            return;
        }
        if (errors.correo?.type === "pattern") {
            alertaError("Correo inválido");
            return;
        }
        alertaCamposVacios();
    };

    return (
        <div className="usuarios-container">

            <Button
                text="+ Agregar"
                className="btn-agregar"
                onClick={() => {
                    setIsEditing(false);
                    reset();
                    setShowModal(true);
                }}
            />

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>
                            {isEditing ? "Editar usuario" : "Agregar usuario"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className='modal-grid'>

                                <div className='modal-column'>
                                    <Input
                                        placeholder="Nombre(s)"
                                        register={register}
                                        name="nombres"
                                        rules={{
                                            required: true,
                                            pattern: /^[A-Za-zÁÉÍÓÚñÑ\s]+$/,
                                            validate: v => v.trim() === v
                                        }}
                                    />
                                    {errors.nombres && <span className="error">Nombre inválido</span>}

                                    <Input
                                        placeholder="Apellidos"
                                        register={register}
                                        name="apellidos"
                                        rules={{
                                            required: true,
                                            pattern: /^[A-Za-zÁÉÍÓÚñÑ\s]+$/,
                                            validate: v => v.trim() === v
                                        }}
                                    />

                                    <Select
                                        register={register}
                                        name="carrera"
                                        rules={{ required: true }}
                                        options={["Desarrollo de Software", "Diseño de modas"]}
                                    />
                                </div>

                                <div className='modal-column'>
                                    <Input
                                        type="email"
                                        placeholder="Correo"
                                        register={register}
                                        name="correo"
                                        rules={{
                                            required: true,
                                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                        }}
                                    />

                                    <Input
                                        type="password"
                                        placeholder="Contraseña"
                                        register={register}
                                        name="password"
                                        rules={{ required: !isEditing }}
                                    />

                                    <Select
                                        register={register}
                                        name="rol"
                                        rules={{ required: true }}
                                        options={["Mentor", "Alumno", "Administrador"]}
                                    />
                                </div>

                            </div>

                            <div className='modal-actions'>
                                <Button text="Cancelar" className="btn-cancelar" onClick={() => setShowModal(false)} />
                                <Button text={isEditing ? "Actualizar" : "Guardar"} type="submit" className="btn-guardar" />
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VistaUsuarios;
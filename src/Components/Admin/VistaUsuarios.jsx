import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import './VistaUsuarios.css';
import './ModalesGlobal.css';

import {
    alertaExito,
    alertaError,
    alertaCamposVacios
} from "../../utils/alerts";

import Table from "../Common/Table";
import ActionButtons from "../Common/ActionButtons";
import PendingActions from "../Common/PendingActions";

import Input from "../Common/Input";
import Select from "../Common/Select";
import Button from "../Common/Button";

const VistaUsuarios = () => {
    const [verPendientes, setVerPendientes] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // --- CONFIGURACIÓN DE COLUMNAS PARA EL NUEVO COMPONENTE TABLE ---
    const columnas = useMemo(() => [
        { header: 'Nombre(s)', accessor: 'nombres' },
        { header: 'Apellidos', accessor: 'apellidos' },
        { header: 'Correo Electrónico', accessor: 'correo' },
        { header: 'Carrera', accessor: 'carrera' },
        { header: 'Rol', accessor: 'rol' }
    ], []);

    const handleAgregar = () => {
        setIsEditing(false);
        reset({
            nombres: '',
            apellidos: '',
            carrera: '',
            correo: '',
            password: '',
            rol: ''
        });
        setShowModal(true);
    };

    const handleEditar = (user) => {
        setIsEditing(true);

        reset({
            nombres: user.nombres,
            apellidos: user.apellidos,
            carrera: user.carrera || "",
            correo: user.correo || "",
            password: "",
            rol: user.rol || ""
        });

        setShowModal(true);
    };

    const onSubmit = (data) => {
        alertaExito(isEditing ? "Usuario actualizado correctamente" : "Usuario guardado correctamente");
        reset();
        setShowModal(false);
    };

    const onError = () => {
        if (errors.nombres) {
            if (errors.nombres.type === "required") alertaCamposVacios();
            else if (errors.nombres.type === "pattern") alertaError("El nombre solo debe contener letras");
            else if (errors.nombres.type === "validate") alertaError("El nombre no debe tener espacios al inicio o final");
            return;
        }
        if (errors.apellidos) {
            if (errors.apellidos.type === "required") alertaCamposVacios();
            else if (errors.apellidos.type === "pattern") alertaError("Los apellidos solo deben contener letras");
            else if (errors.apellidos.type === "validate") alertaError("Los apellidos no deben tener espacios al inicio o final");
            return;
        }
        if (errors.correo) {
            if (errors.correo.type === "required") alertaCamposVacios();
            else alertaError("El correo no es válido");
            return;
        }
        if (errors.password) {
            if (errors.password.type === "required") alertaError("La contraseña es obligatoria");
            else alertaError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (errors.carrera || errors.rol) {
            alertaCamposVacios();
            return;
        }
    };

    const usuariosPrincipales = [
        {
            correo: '20243ds148@utez.edu.mx',
            nombres: 'Andres Manuel',
            apellidos: 'Lopez Obrador',
            carrera: 'Desarrollo de Software',
            rol: 'Mentor'
        }
    ];

    const usuariosPendientes = [
        {
            correo: '20243ds144@utez.edu.mx',
            nombres: 'Carlos',
            apellidos: 'Perez Gomez',
            carrera: 'Desarrollo de Software',
            rol: 'Mentor'
        }
    ];

    return (
        <div className="usuarios-container">
            <div className="usuarios-card">
                <header className="usuarios-header">
                    <div className="header-left">
                        <Button text="+ Agregar" className="btn-agregar" onClick={handleAgregar} />
                        <Button
                            text="Pendientes"
                            className={`btn-pendientes ${verPendientes ? 'activo' : ''}`}
                            onClick={() => setVerPendientes(!verPendientes)}
                        />
                    </div>

                    <div className="header-right">
                        <select className="select-filtro-usuario">
                            <option value="">Filtrar por usuario</option>
                            {(verPendientes ? usuariosPendientes : usuariosPrincipales).map(u => (
                                <option key={u.correo}>
                                    {u.nombres} {u.apellidos}
                                </option>
                            ))}
                        </select>
                    </div>
                </header>

                {/* Se agregaron las columnas para que la tabla pueda iterar sobre la data */}
                <Table
                    columns={columnas}
                    data={verPendientes ? usuariosPendientes : usuariosPrincipales}
                    renderActions={(user) =>
                        verPendientes
                            ? <PendingActions user={user} />
                            : <ActionButtons user={user} onEdit={handleEditar} />
                    }
                />
            </div>

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>
                            {isEditing ? "Editar usuario" : "Agregar usuario"}
                        </h2>
                        <form className='modal-form' onSubmit={handleSubmit(onSubmit, onError)}>
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
                                        rules={{
                                            required: true,
                                            minLength: 6
                                        }}
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
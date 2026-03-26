import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './VistaUsuarios.css';
import './ModalesGlobal.css';

import {
    alertaExito,
    alertaError,
    alertaCamposVacios
} from "../../utils/alerts";

import {
    obtenerDatos,
    enviarDatos,
    actualizarDatos,
    eliminarDatos
} from "../../utils/api";

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
    const [usuarios, setUsuarios] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const columnas = useMemo(() => [
        { header: 'Nombre(s)', accessor: 'nombres' },
        { header: 'Apellidos', accessor: 'apellidos' },
        { header: 'Correo Electrónico', accessor: 'correo' },
        { header: 'Carrera', accessor: 'carrera' },
        { header: 'Rol', accessor: 'rol' }
    ], []);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const data = await obtenerDatos('/api/usuarios');

            setUsuarios(
                data.map(u => ({
                    id: u.id,
                    nombres: u.nombre,
                    apellidos: u.apellidos,
                    correo: u.correo,
                    carrera: u.carrera?.nombre || "",
                    carreraId: u.carrera?.id || "",
                    rol: u.rol?.nombre || "",
                    estado: u.estado
                }))
            );

        } catch (error) {
            console.error(error);
            alertaError("Error al cargar usuarios");
        }
    };

    const handleAgregar = () => {
        setIsEditing(false);
        reset({
            id: null,
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
            id: user.id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            carrera: user.carreraId || "",
            correo: user.correo,
            password: "",
            rol: user.rol
        });

        setShowModal(true);
    };

    const handleAceptar = async (user) => {
        try {
            const payload = {
                nombre: user.nombres,
                apellidos: user.apellidos,
                correo: user.correo,
                estado: {
                    id: 1
                }
            };

            await actualizarDatos(`/api/usuarios/${user.id}`, payload);

            alertaExito("Usuario aceptado");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alertaError("Error al aceptar");
        }
    };

    const handleRechazar = async (id) => {
        try {
            await eliminarDatos(`/api/usuarios/${id}`);
            alertaExito("Usuario rechazado");
            cargarUsuarios();
        } catch (error) {
            console.error(error);
            alertaError("Error al rechazar");
        }
    };

    const onSubmit = async (data) => {
        try {
            if (!data.carrera) {
                alertaCamposVacios();
                return;
            }

            const payload = {
                nombre: data.nombres,
                apellidos: data.apellidos,
                correo: data.correo,
                contrasena: data.password,
                carrera: {
                    id: Number(data.carrera)
                }
            };

            console.log("PAYLOAD:", payload);

            if (isEditing) {
                await actualizarDatos(`/api/usuarios/${data.id}`, payload);
                alertaExito("Usuario actualizado correctamente");
            } else {
                await enviarDatos('/api/usuarios', payload);
                alertaExito("Usuario guardado correctamente");
            }

            await cargarUsuarios();
            reset();
            setShowModal(false);

        } catch (error) {
            console.error("ERROR BACK:", error);
            alertaError("Error al guardar usuario");
        }
    };

    const handleEstado = async (user) => {
        try {
            const payload = {
                nombre: user.nombres,
                apellidos: user.apellidos,
                correo: user.correo,
                estado: {
                    id: user.estado?.id === 1 ? 2 : 1
                }
            };

            await actualizarDatos(`/api/usuarios/${user.id}`, payload);

            alertaExito("Estado actualizado");
            cargarUsuarios();
        } catch (error) {
            alertaError("Error al cambiar estado");
        }
    };

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
                </header>

                <Table
                    columns={columnas}
                    data={usuarios}
                    renderActions={(user) =>
                        verPendientes
                            ? (
                                <PendingActions
                                    user={user}
                                    onAccept={handleAceptar}
                                    onReject={(user) => handleRechazar(user.id)}
                                />
                            )
                            : (
                                <ActionButtons
                                    onEdit={() => handleEditar(user)}
                                    onDelete={() => handleEliminar(user.id)}
                                    onBlock={() => handleEstado(user)}
                                />
                            )
                    }
                />
            </div>

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <h2 className='modal-title'>
                            {isEditing ? "Editar usuario" : "Agregar usuario"}
                        </h2>

                        <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                            <input type="hidden" {...register("id")} />

                            <div className='modal-grid'>
                                <div className='modal-column'>
                                    <Input placeholder="Nombre(s)" register={register} name="nombres" rules={{ required: true }} />
                                    <Input placeholder="Apellidos" register={register} name="apellidos" rules={{ required: true }} />
                                    <div className="select-row">
                                        <Select
                                            register={register}
                                            name="carrera"
                                            rules={{ required: true }}
                                            options={[
                                                { value: 1, label: "Desarrollo de Software" },
                                                { value: 2, label: "Diseño de modas" }
                                            ]}
                                        />
                                        
                                    </div>
                                    <div className="select-row">

                                        <Select
                                            register={register}
                                            name="rol"
                                            rules={{ required: true }}
                                            options={[
                                                { value: "Mentor", label: "Mentor" },
                                                { value: "Alumno", label: "Alumno" },
                                                { value: "Administrador", label: "Administrador" }
                                            ]}
                                        />
                                    </div>
                                </div>

                                <div className='modal-column'>
                                    <Input type="email" placeholder="Correo" register={register} name="correo" rules={{ required: true }} />
                                    <Input type="password" placeholder="Contraseña" register={register} name="password" rules={{ required: true }} />
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
import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './VistaUsuarios.css';
import './ModalesGlobal.css';


import {
    alertaExito,
    alertaError,
    alertaCamposVacios,
    confirmarEliminar,
    confirmarRechazarSolicitud,
    confirmarDesactivarUsuario,
    alertaSinCambios,
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
import CheckboxGroup from "../Common/CheckBoxGroup"

const VistaUsuarios = () => {
    const [verPendientes, setVerPendientes] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [carrerasList, setCarrerasList] = useState([]);

    const cargarUsuarios = async (estado = 'Activo') => {
        try {
            const data = await obtenerDatos(`/api/usuarios/estado/${estado}`);
            console.log("Datos recibidos del server:", data);
            setUsuarios(
                data.map(u => ({
                    id: u.id,
                    nombre: u.nombre,
                    apellidoP: u.apellidoP,
                    apellidoM: u.apellidoM,
                    correo: u.correo,
                    carrera: u.nombreCarrera,
                    idCarrera: u.idCarrera,
                    rol: u.nombreRol,
                    idRoles: u.idsRoles,
                    estado: u.nombreEstado
                }))
            );
        } catch (error) {
            console.error("Error cargando:", error);
        }
    };

    const cargarCarreras = async () => {
        try {
            const data = await obtenerDatos('/api/carreras');
            const opciones = data.map(c => ({
                value: c.id,
                label: c.nombre
            }));
            setCarrerasList(opciones);
        } catch (error) {
            console.error("Error al cargar carreras:", error);
        }
    };

    useEffect(() => {
        cargarCarreras();
    }, []);

    useEffect(() => {
        const estadoABuscar = verPendientes ? 'Pendiente' : 'Activo';
        cargarUsuarios(estadoABuscar);
    }, [verPendientes]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isDirty }
    } = useForm();

    const rolesSeleccionados = watch("rolesIds") || [];

    useEffect(() => {
        if (rolesSeleccionados.length > 1) {
            const ultimoSeleccionado = rolesSeleccionados[rolesSeleccionados.length - 1];

            if (ultimoSeleccionado === "1") {
                setValue("rolesIds", ["1"]);
            }

            else if ((ultimoSeleccionado === "2" || ultimoSeleccionado === "3") && rolesSeleccionados.includes("1")) {
                setValue("rolesIds", rolesSeleccionados.filter(id => id !== "1"));
            }
        }
    }, [rolesSeleccionados, setValue]);

    const columnas = useMemo(() => [
        { header: 'Nombre(s)', accessor: 'nombre' },
        { header: 'Apellido Paterno', accessor: 'apellidoP' },
        { header: 'Apellido Materno', accessor: 'apellidoM' },
        { header: 'Correo Electrónico', accessor: 'correo' },
        { header: 'Carrera', accessor: 'carrera' },
        { header: 'Rol', accessor: 'rol' }
    ], []);

    const handleAgregar = () => {
        setIsEditing(false);
        reset({
            id: null,
            nombres: '',
            apellidoP: '',
            apellidoM: '',
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
            nombres: user.nombre,
            apellidoP: user.apellidoP || "",
            apellidoM: user.apellidoM || "",
            correo: user.correo,
            carrera: user.idCarrera,
            rolesIds: user.idRoles ? user.idRoles.map(String) : [],
            password: ""
        });
        setShowModal(true);
    };

    const handleAceptar = async (user) => {
        await handleEstado(user.id, 1);
    };

    const handleRechazar = async (id) => {
            try {
                await eliminarDatos(`/api/usuarios/${id}`);
                alertaExito("Usuario rechazado");
                cargarUsuarios('Pendiente');
            } catch (error) {
                console.error(error);
                alertaError("Error al rechazar la solicitud");
            }

    };

    const handleEliminar = async (id) => {
        const confirmado = await confirmarEliminar();

        if (confirmado) {
            try {
                await eliminarDatos(`/api/usuarios/${id}`);
                alertaExito("Usuario eliminado correctamente");
                const estadoActual = verPendientes ? 'Pendiente' : 'Activo';
                cargarUsuarios(estadoActual);
            } catch (error) {
                console.error("Error al eliminar:", error);
                alertaError("Error al intentar eliminar el usuario");
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                id: data.id,
                nombre: data.nombres,
                apellidoPaterno: data.apellidoP,
                apellidoMaterno: data.apellidoM,
                email: data.correo,
                password: data.password || null,
                carreraId: Number(data.carrera),
                rolesIds: data.rolesIds ? data.rolesIds.map(id => Number(id)) : []
            };

            if (isEditing) {
                await actualizarDatos(`/api/usuarios/${data.id}`, payload);
            } else {
                await enviarDatos('/api/usuarios', payload);
            }

            setShowModal(false);

            const estadoActual = verPendientes ? 'Pendiente' : 'Activo';
            setTimeout(() => {
                cargarUsuarios(estadoActual);
            }, 100);

            alertaExito("¡Listo!");
        } catch (error) {
            alertaError("Error al guardar los datos");
        }
    };

    const handleEstado = async (idUsuario, nuevoEstadoId) => {
        console.log("ENTRÓ A handleEstado", idUsuario, nuevoEstadoId);

        if (nuevoEstadoId === 2) {
            const confirmado = await confirmarDesactivarUsuario("¿Estás seguro de que deseas desactivar este usuario?");
            if (!confirmado) return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/cambiar-estado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: idUsuario,
                    nuevoEstadoId: nuevoEstadoId
                })
            });

            console.log("RESPUESTA:", response);

            if (response.ok) {
                alertaExito("¡Estado actualizado!");
                cargarUsuarios(verPendientes ? 'Pendiente' : 'Activo');
            } else {
                alertaError("Error al cambiar estado");
            }
        } catch (error) {
            console.error("ERROR:", error);
            alertaError("Error de conexión");
        }
    };

    //  detecta campos vacíos
    const onErroresValidacion = () => {
        alertaCamposVacios();
    };

    console.log("¿Qué tiene el estado usuarios justo ahora?", usuarios);

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
                                    onAccept={(user) => handleEstado(user.id, 1)}
                                    onReject={(user) => handleRechazar(user.id)}
                                />
                            )
                            : (
                                <ActionButtons
                                    onEdit={() => handleEditar(user)}
                                    onDelete={() => handleEliminar(user.id)}
                                    onBlock={() => handleEstado(user.id, 2)}
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

                        <form className='modal-form' onSubmit={handleSubmit(onSubmit, onErroresValidacion)} noValidate>
                            <input type="hidden" {...register("id")} />

                            <div className='modal-grid'>
                                {/* COLUMNA IZQUIERDA */}
                                <div className='modal-column'>
                                    <Input placeholder="Nombre(s)" register={register} name="nombres" rules={{ required: true }} />
                                    <Input placeholder="Apellido Paterno" register={register} name="apellidoP" rules={{ required: true }} />
                                    <Input placeholder="Apellido Materno" register={register} name="apellidoM" rules={{ required: true }} />

                                    <Select
                                        label="Carrera"
                                        register={register}
                                        name="carrera"
                                        rules={{ required: true }}
                                        options={carrerasList}
                                        placeholder="Carrera"
                                    />
                                </div>

                                {/* COLUMNA DERECHA */}
                                <div className='modal-column'>
                                    <Input type="email" placeholder="Correo" register={register} name="correo" rules={{ required: true }} />
                                    <Input
                                        type="password"
                                        placeholder={isEditing ? "Nueva contraseña (opcional)" : "Contraseña"}
                                        register={register}
                                        name="password"
                                        rules={{ required: !isEditing }}
                                    />

                                    <CheckboxGroup
                                        label="Roles del Usuario"
                                        name="rolesIds"
                                        register={register}
                                        options={[
                                            { value: "1", label: "Administrador"},
                                            { value: "2", label: "Mentor"},
                                            { value: "3", label: "Alumno"}
                                        ]}
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
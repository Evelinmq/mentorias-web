import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './VistaUsuarios.css';
import './ModalesGlobal.css';
import { alertaExito, alertaError, confirmarEliminar, confirmarDesactivarUsuario, alertaCamposVacios } from "../../utils/alerts";

import iconEdit from '../../assets/EditIcon.png';
import iconBlock from '../../assets/DesactivateIcon.png';
import iconDelete from '../../assets/TrashIcon.png';
import iconCheck from '../../assets/TickIcon.png';
import iconCross from '../../assets/CrossIcon.png';

const VistaUsuarios = () => {
    // Estado para mostrar la tabla correspondiente
    const [verPendientes, setVerPendientes] = useState(false);

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

    const handleEditar = (user) => {
        setIsEditing(true);

        reset({
            nombres: '',
            apellidos: '',
            carrera: user.carrera || '',
            correo: user.correo || '',
            password: '',
            rol: user.rol || ''
        });

        setShowModal(true);
        console.log("Editando a usuario....");
    };

    const onSubmit = (data) => {
        console.log(data);

        if (isEditing) {
            alertaExito("Usuario actualizado correctamente");
        } else {
            alertaExito("Usuario guardado correctamente");
        }

        reset();
        setShowModal(false);
    };

    const onError = () => {
        if (errors.correo?.type === "pattern") {
            alertaError("El correo no es válido");
            return;
        }

        alertaCamposVacios();
    };

    const eliminarUsuario = async () => {
        const confirmar = await confirmarEliminar();

        if (confirmar) {
            //Hacer lógica para eliminar*******
            console.log("Usuario eliminado");
            alertaExito("Usuario eliminado correctamente");
        }
    };

    const rechazarSolicitud = async () => {
        const confirmar = await confirmarDesactivarUsuario();

        if (confirmar) {
            //Hacer lógica para rechazar********
            alertaExito("Se ha rechazado la solicitud del usuario");
        }
    };

    const desactivarUsuario = async () => {
        const confirmar = await confirmarDesactivarUsuario();

        if (confirmar) {
            //Hacer lógica para desactivar***************
            alertaExito("Se ha descativado el usuario");
        }
    };

    // Datos de ejemplo -.-.-.-.-.-.-.-..-..-. Borrar despues
    const usuariosPrincipales = [
        { correo: '20243ds148@utez.edu.mx', nombre: 'Andres Manuel Lopez Obrador', carrera: 'Desarrollo de Software', rol: 'Mentor' },
        { correo: '20223ds182@utez.edu.mx', nombre: 'Gustavo Diaz Peña', carrera: 'Diseño de modas', rol: 'Alumno' },
    ];

    const usuariosPendientes = [
        { correo: '20243ds144@utez.edu.mx', nombre: 'Carlos Perez Gomez', carrera: 'Desarrollo de Software', rol: 'Mentor' },
        { correo: '20223ds156@utez.edu.mx', nombre: 'Maria Marquez Dominguez', carrera: 'Desarrollo de Software', rol: 'Mentor' },
    ];
    // -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-..-.-.-.-.-.

    return (
        <div className="usuarios-container">
            {/* HEADER DE ACCIONES */}
            <header className="usuarios-header">
                <div className="header-left">
                    <button className="btn-agregar" onClick={handleAgregar}>
                        + Agregar
                    </button>
                    <button
                        className={`btn-pendientes ${verPendientes ? 'activo' : ''}`}
                        onClick={() => setVerPendientes(!verPendientes)}
                    >
                        Pendientes
                    </button>
                </div>

                <div className="header-right">
                    <select className="select-filtro-usuario">
                        <option value="">Filtrar por usuario</option>
                        {(verPendientes ? usuariosPendientes : usuariosPrincipales).map(u => (
                            <option key={u.correo} value={u.correo}>
                                {u.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </header>

            {/* RENDERIZADO CONDICIONAL DE LAS TABLAS */}
            <div className="tabla-wrapper">
                <table className="tabla-general">
                    <thead>
                    <tr>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {(verPendientes ? usuariosPendientes : usuariosPrincipales).map((user, index) => (
                        <tr key={index}>
                            <td>{user.correo}</td>
                            <td>{user.nombre}</td>
                            <td>{user.carrera}</td>
                            <td>{user.rol}</td>

                            <td className="acciones-celda">
                                {verPendientes ? (
                                    <>
                                        <button className="btn-accion btn-check">
                                            <img src={iconCheck} alt="Aceptar" />
                                        </button>
                                        <button className="btn-accion btn-cross" onClick={rechazarSolicitud}>
                                            <img src={iconCross} alt="Rechazar" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-accion" onClick={() => handleEditar(user)}>
                                            <img src={iconEdit} alt="Editar" />
                                        </button>
                                        <button className="btn-accion btn-block" onClick={desactivarUsuario}>
                                            <img src={iconBlock} alt="Bloquear" />
                                        </button>
                                        <button className="btn-accion btn-delete" onClick={eliminarUsuario}>
                                            <img src={iconDelete} alt="Eliminar" />
                                        </button>
                                    </>
                                )}
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
                            {isEditing ? "Editar usuario" : "Agregar usuario"}
                        </h2>

                        <form className='modal-form' onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className='modal-grid'>
                                {/*Lado izquierdo */}
                                <div className='modal-column'>
                                    <input
                                        type="text"
                                        placeholder='Nombre(s)'
                                        className='modal-input'
                                        {...register("nombres", { required: true })}
                                    />

                                    <input
                                        type="text"
                                        placeholder='Apellidos'
                                        className='modal-input'
                                        {...register("apellidos", { required: true })}
                                    />

                                    <select
                                        className='modal-select'
                                        {...register("carrera", { required: true })}
                                    >
                                        <option value="">Carrera</option>
                                        <option value="Desarrollo de Software">Desarrollo de Software</option>
                                        <option value="Diseño de modas">Diseño de modas</option>
                                    </select>
                                </div>

                                {/*Lado derecho */}
                                <div className='modal-column'>
                                    <input
                                        type="email"
                                        placeholder='Correo'
                                        className='modal-input'
                                        {...register("correo", {
                                            required: true,
                                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                        })}
                                    />

                                    <input
                                        type="password"
                                        placeholder='Contraseña'
                                        className='modal-input'
                                        {...register("password", {
                                            required: !isEditing
                                        })}
                                    />

                                    <select
                                        className='modal-select'
                                        {...register("rol", { required: true })}
                                    >
                                        <option value="">Rol</option>
                                        <option value="Mentor">Mentor</option>
                                        <option value="Alumno">Alumno</option>
                                        <option value="Administrador">Administrador</option>
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

export default VistaUsuarios;
import React, { useState, useEffect } from 'react';
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

import { enviarDatos, eliminarDatos, obtenerDatos, actualizarDatos } from "../../utils/api";

const VistaMaterias = () => {
    // --- ESTADOS ---
    const [materias, setMaterias] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    // --- CARGA DE DATOS ---
    const cargarMaterias = async () => {
        try {
            const data = await obtenerDatos('/api/materias');
            setMaterias(data);
        } catch (error) {
            console.error('Error al cargar materias:', error);
        }
    };

    const cargarCarreras = async () => {
        try {
            const data = await obtenerDatos('/api/carreras');
            setCarreras(data);
        } catch (error) {
            console.error("Error al cargar carreras:", error);
        }
    };

    useEffect(() => {
        cargarMaterias();
        cargarCarreras();
    }, []);

    // --- LOGICA MODAL ---
    const handleAgregar = () => {
        setIsEditing(false);
        setMateriaSeleccionada(null);
        reset({
            nombre: '',
            cuatrimestre: '',
            carreraId: '' // Nombre clave para el DTO
        });
        setShowModal(true);
    };

    const handleEditar = (materia) => {
        setIsEditing(true);
        setMateriaSeleccionada(materia);
        reset({
            nombre: materia.nombre,
            cuatrimestre: materia.cuatrimestre,
            carreraId: materia.carreraId // Se llena con el ID del DTO
        });
        setShowModal(true);
    };

    const eliminarMateria = async (id) => {
        const confirmar = await confirmarEliminar("¿Eliminar materia?");
        if (confirmar) {
            try {
                await eliminarDatos(`/api/materias/${id}`);
                alertaExito("Materia eliminada correctamente");
                cargarMaterias();
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                alertaError("No se pudo eliminar la materia");
            }
        }
    };

    // --- SUBMIT ---
    const onSubmit = async (data) => {
        try {
            data.nombre = data.nombre.trim();

            if (isEditing && materiaSeleccionada) {
                await actualizarDatos(`/api/materias/${materiaSeleccionada.id}`, data);
                alertaExito("Materia actualizada correctamente");
            } else {
                await enviarDatos('/api/materias', data);
                alertaExito("Materia guardada correctamente");
            }

            cargarMaterias();
            setShowModal(false);
            reset();
        } catch (error) {
            alertaError("Error al procesar la solicitud");
            console.error("Error:", error);
        }
    };

    const onError = () => {
        if (errors.nombre) {
            if (errors.nombre.type === "required") return alertaCamposVacios();
            return alertaError("Nombre inválido");
        }
        if (errors.cuatrimestre) return alertaError("El cuatrimestre debe estar entre 1 y 11");
        if (errors.carreraId) return alertaCamposVacios();
        alertaCamposVacios();
    };

    return (
        <div className="materias-container">
            <div className="materias-card">
                <header className="materias-header">
                    <div className="header-left">
                        <Button text="+ Agregar" className="btn-agregar" onClick={handleAgregar} />
                    </div>
                </header>

                <Table
                    data={materias}
                    columns={[
                        { header: "Materia", accessor: "nombre" },
                        { header: "Carrera", accessor: "nombreCarrera" }, // Mostrar nombre del DTO
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
                                        rules={{ required: true, pattern: /^[A-Za-zÁÉÍÓÚñÑ\s]+$/ }}
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
                                        name="carreraId"
                                        placeholder="Carrera"
                                        rules={{ required: true }}
                                        options={carreras.map(c => ({
                                            value: c.id,
                                            label: c.nombre
                                        }))}
                                    />
                                </div>
                            </div>

                            <div className='modal-actions'>
                                <Button
                                    text="Cancelar"
                                    className="btn-cancelar"
                                    onClick={() => { setShowModal(false); reset(); }}
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
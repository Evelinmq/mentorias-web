import React, { useState } from 'react';
import './VistaUsuarios.css';

import iconEdit from '../../assets/EditIcon.png';
import iconBlock from '../../assets/DesactivateIcon.png';
import iconDelete from '../../assets/TrashIcon.png';
import iconCheck from '../../assets/TickIcon.png';
import iconCross from '../../assets/CrossIcon.png';

const VistaUsuarios = () => {
  // Estado para mostrar la tabla correspondiente
  const [verPendientes, setVerPendientes] = useState(false);
  
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
          <button className="btn-agregar" onClick={() => console.log("Abrir modal...")}>
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
            {/* si verPendientes es true, usamos la de pendientes */}
            {(verPendientes ? usuariosPendientes : usuariosPrincipales).map((user, index) => (
                <tr key={index}>
                <td>{user.correo}</td>
                <td>{user.nombre}</td>
                <td>{user.carrera}</td>
                <td>{user.rol}</td>
                
                <td className="acciones-celda">
                    {/* qué BOTONES mostrar según la vista */}
                    {verPendientes ? (
                    <>
                        <button className="btn-accion btn-check">
                        <img src={iconCheck} alt="Aceptar" />
                        </button>
                        <button className="btn-accion btn-cross">
                        <img src={iconCross} alt="Rechazar" />
                        </button>
                    </>
                    ) : (
                    <>
                        <button className="btn-accion"><img src={iconEdit} alt="Editar" /></button>
                        <button className="btn-accion btn-block"><img src={iconBlock} alt="Bloquear" /></button>
                        <button className="btn-accion btn-delete"><img src={iconDelete} alt="Eliminar" /></button>
                    </>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default VistaUsuarios;
import React, { useState } from 'react';
import './VistaReportes.css';
import DownloadIcon from '../../assets/DownloadIcon.png'

const datosReporte = [
  {
    fecha: '30/01/2026',
    materia: 'Programacion',
    alumno: 'DPR Ian',
    carrera: 'Desarrollo de software',
    tema: 'Java',
    hora: '13:00 - 14:00'
  },
  {
    fecha: '30/01/2026',
    materia: 'Programacion',
    alumno: 'Jackson Wang',
    carrera: 'Desarrollo de software',
    tema: 'Java',
    hora: '13:00 - 14:00'
  }
];

const VistaReportes = () => {
// Estados de los buscadores
  const [mostrarBuscadorMentor, setMostrarBuscadorMentor] = useState(false);
  const [mostrarBuscadorMateria, setMostrarBuscadorMateria] = useState(false);

  // Estados para los valores de los inputs
  const [filtroMentor, setFiltroMentor] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');

  return (
    <div className="reportes-container">
      {/* --- INICIO HEADER --- */}
      <header className="reportes-header">
        
        <div className="header-left">
            {/* BOTÓN MENTORES*/}
          <button 
            className={`btn-filtro ${mostrarBuscadorMentor ? 'btn-active-black' : 'btn-inactive-white'}`}
            // Mostrar el buscador de mentor
            onClick={() => setMostrarBuscadorMentor(!mostrarBuscadorMentor)}
          >
            Mentores
          </button>

            {/* BOTÓN MATERIAS*/}
          <button 
            className={`btn-filtro ${mostrarBuscadorMateria ? 'btn-active-black' : 'btn-inactive-white'}`}
            // Mostrar buscador
            onClick={() => setMostrarBuscadorMateria(!mostrarBuscadorMateria)}
          >
            Materias
          </button>
        </div>

        <div className="header-right">
          
          {/* Buscador de mentores */}
          {mostrarBuscadorMentor && (
            <div className="buscador-wrapper animation-fade-in">
              <span className="icono-buscar">&#128269;</span>
              <input 
                type="text" 
                placeholder="Buscar por mentor" 
                className="input-buscar" 
                value={filtroMentor}
                onChange={(e) => setFiltroMentor(e.target.value)}
              />
            </div>
          )}

          {/* Buscador de materias */}
          {mostrarBuscadorMateria && (
            <div className="buscador-wrapper animation-fade-in">
              <span className="icono-buscar">&#128269;</span>
              <input 
                type="text" 
                placeholder="Buscar por materia" 
                className="input-buscar" 
                value={filtroMateria}
                onChange={(e) => setFiltroMateria(e.target.value)}
              />
            </div>
          )}

          <div className="fecha-wrapper">
            <input
                type="text"
                placeholder="Fecha inicio"
                className="input-fecha"
                onFocus={(e) => (e.target.type = "date")} // Se vuelve calendario
                onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
                }}
                onChange={(e) => console.log(e.target.value)}
            />
          </div>
        
          <div className="fecha-wrapper">
            <input
                type="text"
                placeholder="Fecha fin"
                className="input-fecha"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
                }}
                onChange={(e) => console.log(e.target.value)}
            />
          </div>

          <button className="btn-descargar-img">
            <img src={DownloadIcon} alt="Descargar reporte" className="img-descarga" />
          </button>
        </div>
      </header> 
      {/* --- FIN HEADER --- */}

      {/* --- TABLA --- */}
      <div className="tabla-wrapper">
        <table className="tabla-reportes">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Materia</th>
              <th>Alumno</th>
              <th>Carrera</th>
              <th>Tema</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {datosReporte.map((fila, index) => (
              <tr key={index}>
                <td>{fila.fecha}</td>
                <td>{fila.materia}</td>
                <td>{fila.alumno}</td>
                <td>{fila.carrera}</td>
                <td>{fila.tema}</td>
                <td>{fila.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaReportes;
import React, { useState, useEffect } from 'react';
import './VistaReportes.css';
import DownloadIcon from '../../assets/DownloadIcon.png';
import { obtenerDatos } from "../../utils/api";

const VistaReportes = () => {

  // --- ESTADOS PARA DATOS ---
  const [mentorias, setMentorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE UI (BUSCADORES) ---
  const [mostrarBuscadorMentor, setMostrarBuscadorMentor] = useState(false);
  const [mostrarBuscadorMateria, setMostrarBuscadorMateria] = useState(false);

  // --- ESTADOS PARA FILTROS ---
  const [filtroMentor, setFiltroMentor] = useState('');
  const [filtroMateria, setFiltroMateria] = useState('');

  // --- FUNCIÓN PARA CARGAR TODO ---
  const cargarTodasLasMentorias = async () => {
    try {
      setLoading(true); // 1. Empezamos a cargar
      const data = await obtenerDatos('/api/mentorias');
      setMentorias(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // 2. Pase lo que pase, dejamos de cargar
    }
  };

  useEffect(() => {
    cargarTodasLasMentorias();
  }, []);

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
                placeholder="Buscar mentor" 
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
                placeholder="Buscar materia" 
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
                onFocus={(e) => (e.target.type = "date")}
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
        {loading ? (
            // Mientras loading sea true, mostramos:
            <div className="loading-container">
              <p>Cargando reportes... </p>
            </div>
        ) : (
        <table className="tabla-reportes">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Materia</th>
              <th>Mentor</th>
              <th>Carrera</th>
              <th>Tema</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
          {mentorias.length > 0 ? (
              mentorias.map((fila) => (
                  <tr key={fila.id}>
                    <td>{fila.fecha}</td>
                    <td>{fila.materia?.nombre || "Sin materia"}</td>
                    {/* Accedemos al objeto mentor -> nombre y apellidos */}
                    <td>{`${fila.mentor?.nombre || ''} ${fila.mentor?.apellidos || ''}`}</td>
                    {/* Accedemos al mentor -> su carrera -> el nombre de la carrera */}
                    <td>{fila.mentor?.carrera?.nombre || "N/A"}</td>
                    {/* Mapeamos la lista de temas para mostrarlos todos separados por coma */}
                    <td>
                      {fila.temas && fila.temas.length > 0
                          ? fila.temas.map(t => t.nombre).join(", ")
                          : "General"}
                    </td>
                    <td>{`${fila.horaInicio} - ${fila.horaFin}`}</td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No hay mentorías registradas en la base de datos.
                </td>
              </tr>
          )}
          </tbody>
        </table>
            )}
      </div>
    </div>
  );
};

export default VistaReportes;
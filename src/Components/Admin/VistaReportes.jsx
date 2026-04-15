import React, { useState, useEffect } from 'react';
import './VistaReportes.css';
import DownloadIcon from '../../assets/DownloadIcon.png';
import { obtenerDatos } from "../../utils/api";

import ReportTable from "../Common/ReportTable";
import DateInput from "../Common/DateInput.jsx";
import DownloadButton from "../Common/DownloadButton.jsx";
import Button from "../Common/Button";
import SearchBar from "../Common/SearchBar";

const VistaReportes = () => {

  // --- ESTADOS PARA DATOS ---
  const [mentorias, setMentorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- ESTADOS DE UI (BUSCADORES) ---
  const [mostrarBuscadorMentor, setMostrarBuscadorMentor] = useState(false);
  const [mostrarBuscadorMateria, setMostrarBuscadorMateria] = useState(false);

  // --- Filtros de fecha ---
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

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


  const mentoriasFiltradas = mentorias.filter((m) => {
    // 1. Blindaje para Mentor (evita que truene si mentor es null)
    const nombreCompleto = `${m.mentor?.nombre || ''} ${m.mentor?.apellidoP || ''} ${m.mentor?.apellidoM || ''}}`.toLowerCase();
    const matchMentor = nombreCompleto.includes(filtroMentor.toLowerCase());

    // 2. Blindaje para Materia
    const nombreMateria = (m.materia?.nombre || "").toLowerCase();
    const matchMateria = nombreMateria.includes(filtroMateria.toLowerCase());

    // 3. Blindaje para Fechas
    if (!fechaInicio && !fechaFin) return matchMentor && matchMateria;

    const fechaMentoria = new Date(m.fecha);
    // Validamos que la fecha sea válida antes de comparar
    if (isNaN(fechaMentoria.getTime())) return matchMentor && matchMateria;

    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;

    let matchFecha = true;
    if (inicio && fin) {
      matchFecha = fechaMentoria >= inicio && fechaMentoria <= fin;
    } else if (inicio) {
      matchFecha = fechaMentoria >= inicio;
    } else if (fin) {
      matchFecha = fechaMentoria <= fin;
    }

    return matchMentor && matchMateria && matchFecha;
  });

  const columnas = [
    { header: "Fecha", accessor: "fecha" },
    {
      header: "Materia",
      render: (row) => row.materia?.nombre || "Sin materia"
    },
    {
      header: "Mentor",
      render: (row) => `${row.mentor?.nombre || ''} ${row.mentor?.apellidoP || ''} ${row.mentor?.apellidoM || ''}`
    },
    {
      header: "Carrera",
      render: (row) => row.mentor?.carrera?.nombre || "N/A"
    },
    {
      header: "Tema",
      render: (row) => row.temas?.length > 0
          ? row.temas.map(t => t.nombre).join(", ")
          : "General"
    },
    {
      header: "Hora",
      render: (row) => `${row.horaInicio} - ${row.horaFin}`
    },
  ];

// la creacion de reportes pdf
  const handleDescargarReporte = async () => {
    const mentor = filtroMentor || "";
    const materia = filtroMateria || "";
    const inicio = fechaInicio || "";
    const fin = fechaFin || "";
    
    const token = localStorage.getItem('token');

    const url = `http://localhost:8080/api/reportes/mentorias?mentor=${encodeURIComponent(mentor)}&materia=${encodeURIComponent(materia)}&fechaInicio=${inicio}&fechaFin=${fin}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf'
        }
      });

      if (!response.ok) {
        if(response.status === 403) alert("No tienes permisos de Administrador.");
        throw new Error("Error al generar el reporte");
      }

      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'Reporte_Mentorias.pdf');
      document.body.appendChild(link);
      link.click();

      // 5. Limpieza
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error("Error descargando el reporte:", error);
      alert("Hubo un problema al descargar el reporte.");
    }
  };


  return (
    <div className="reportes-container">
      {/* --- INICIO HEADER --- */}
      <header className="reportes-header">

        <div className="header-left">
          {/* BOTÓN FILTRO MENTORES */}
          <Button
              text="Mentores"
              className={`btn-filtro ${mostrarBuscadorMentor ? 'btn-active-black' : 'btn-inactive-white'}`}
              onClick={() => setMostrarBuscadorMentor(!mostrarBuscadorMentor)}
          />

          {/* BOTÓN FILTRO MATERIAS */}
          <Button
              text="Materias"
              className={`btn-filtro ${mostrarBuscadorMateria ? 'btn-active-black' : 'btn-inactive-white'}`}
              onClick={() => setMostrarBuscadorMateria(!mostrarBuscadorMateria)}
          />
        </div>

        <div className="header-right">

          {/* BUSADOR DE MENTOR*/}
          {mostrarBuscadorMentor && (
              <SearchBar
                  placeholder="Buscar mentor"
                  value={filtroMentor}
                  onChange={(e) => setFiltroMentor(e.target.value)}
              />
          )}


          

          {/* BUSADOR DE MATERIAS*/}
          {mostrarBuscadorMateria && (
              <SearchBar
                  placeholder="Buscar materia"
                  value={filtroMateria}
                  onChange={(e) => setFiltroMateria(e.target.value)}
              />
          )}

          <DateInput
              placeholder="Fecha inicio"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
          />

          <DateInput
              placeholder="Fecha fin"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
          />

          <DownloadButton
              icon={DownloadIcon}
              onClick={handleDescargarReporte}
          />

        </div>
      </header>
      {/* --- FIN HEADER --- */}

      {/* --- TABLA --- */}
      <div className="tabla-wrapper">
        {loading ? (
            <div className="loading-container"><p>Cargando datos...</p></div>
        ) : (
            <ReportTable columns={columnas} data={mentoriasFiltradas} />
        )}
      </div>
    </div>
  );
};

export default VistaReportes;
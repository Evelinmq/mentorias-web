import MentoriaCard from "../Common/MentoriaCard";

const HISTORIAL = [
    {
        id: 1,
        email: "20243dc153@utez.edu.mx",
        fecha: "13/12/2025",
        nombre: "John Marston Gonzales",
        materia: "Inglés IV",
        tema: "Phrasal Verbs",
        aula: "A6 - Docencia I",
        hora: "13:00 - 14:00",
        tipo: "tomada",
    },
    {
        id: 2,
        email: "20243dc153@utez.edu.mx",
        fecha: "07/12/2025",
        nombre: "John Marston Gonzales",
        materia: "Inglés IV",
        tema: "Pasado perfecto",
        aula: "A12 - Docencia V",
        hora: "08:00 - 10:00",
        tipo: "tomada",
    },
    {
        id: 3,
        email: "20223dc182@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Díaz Peña",
        materia: "Matematica Aplicada",
        tema: "Ecuaciones diferenciales",
        aula: "A12 - Docencia V",
        hora: "13:00 - 14:00",
        tipo: "cancelada",
        motivoCancelacion: "Me dio viruela x",
    },
];

export default function VistaHistorial() {
    return (
        <>
            <div className="legend">
                <span className="legend-item">
                    <span className="dot confirmada" /> Asesoría Tomada
                </span>
                <span className="legend-item">
                    <span className="dot por-aceptar" /> Canceladas
                </span>
            </div>

            <div className="cards-grid">
                {HISTORIAL.map((item) => (
                    <MentoriaCard
                        key={item.id}
                        data={item}
                        status={item.tipo === "tomada" ? "confirmada" : "por-aceptar"}
                        extraContent={
                            item.tipo === "cancelada" && (
                                <div className="card-field">
                                    <span className="card-label">Motivo de la cancelación:</span>
                                    <span className="card-value">{item.motivoCancelacion}</span>
                                </div>
                            )
                        }
                    />
                ))}
            </div>
        </>
    );
}
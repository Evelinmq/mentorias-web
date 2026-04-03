import AprendizCard from "../Aprendiz/AprendizCard";

const MENTORIAS = [
    {
        id: 1,
        email: "202243a148@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Andres Manuel Lopez Obrador",
        materia: "Contaduría I",
        tema: "Evasion de impuestos",
        aula: "A2 - Docencia 8",
        hora: "13:00 - 14:00",
        confirmada: true,
    },
    {
        id: 2,
        email: "20223dc182@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Díaz Peña",
        materia: "Matematica aplicada",
        tema: "Ecuaciones diferenciales",
        aula: "A12 - Docencia V",
        hora: "13:00 - 14:00",
        confirmada: false,
    },
];

export default function VistaAgendadas() {
    if (MENTORIAS.length === 0) {
        return (
            <div className="empty-state">
                <p className="empty-text">No tienes mentorías agendadas</p>
            </div>
        );
    }

    return (
        <>
            <div className="legend">
                <span className="legend-item">
                    <span className="dot confirmada" /> Confirmada
                </span>
                <span className="legend-item">
                    <span className="dot por-aceptar" /> Por aceptar
                </span>
            </div>

            <div className="cards-grid">
                {MENTORIAS.map((m) => (
                    <AprendizCard
                        key={m.id}
                        data={m}
                        status={m.confirmada ? "confirmada" : "por-aceptar"}
                    />
                ))}
            </div>
        </>
    );
}
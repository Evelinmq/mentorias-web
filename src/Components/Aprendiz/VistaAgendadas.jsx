import MentoriaCard from "../Common/MentoriaCard";

export default function VistaAgendadas() {

    const mentorias = [
    {
        id: 1,
        email: "20243ds149@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Andres Manuel Lopez Obrador",
        materia: "Contaduría I",
        tema: "Evasion de impuestos",
        aula: "A2 – Docencia II",
        hora: "13:00 – 14:00",
        confirmada: true,
    },
    {
        id: 2,
        email: "20223ds182@utez.edu.mx",
        fecha: "30/01/2026",
        nombre: "Gustavo Diaz Peña",
        materia: "Matematica aplicada",
        tema: "Ecuaciones diferenciales",
        aula: "A12 – Docencia V",
        hora: "13:00 – 14:00",
        confirmada: false,
    },
    {
        id: 3,
        email: "20241ds301@utez.edu.mx",
        fecha: "02/02/2026",
        nombre: "María Fernanda Ruiz",
        materia: "Cálculo Integral",
        tema: "Integrales por partes",
        aula: "B3 – Docencia I",
        hora: "10:00 – 11:00",
        confirmada: true,
    },
];

    return (
        <>
            <div className="legend">
                <span className="legend-item"><span className="dot confirmada" /> Confirmada</span>
                <span className="legend-item"><span className="dot por-aceptar" /> Por aceptar</span>
            </div>

            <div className="cards-grid">
                {mentorias.map((m) => (
                    <MentoriaCard
                        key={m.id}
                        data={m}
                        status={m.confirmada ? "confirmada" : "por-aceptar"}
                    />
                ))}
            </div>
        </>
    );
}
import MentoriaCard from "../Common/MentoriaCard";

const HISTORIAL = [
    { 
        id: 1, 
        email: "20243ds149@utez.edu.mx", 
        fecha: "20/03/2026",
        nombre: "Gustavo Diaz Peña", 
        materia: "Matematica aplicada", 
        tema: "Derivadas complejas", 
        aula: "A2 – Docencia II", 
        hora: "08:00 – 10:00",
        tipo: "tomada" 
    },
    { 
        id: 2, 
        email: "admin@utez.edu.mx", 
        fecha: "15/03/2026",
        nombre: "Ana Martínez", 
        materia: "Física II", 
        tema: "Termodinámica",
        aula: "Lab B", 
        hora: "12:00 – 14:00",
        tipo: "cancelada",
        motivoCancelacion: "Profesor indispuesto"
    }
];

export default function VistaHistorial() {
    return (
        <div className="cards-grid">
            {HISTORIAL.map((item) => (
                <MentoriaCard
                    key={item.id}
                    data={item}
                    status={item.tipo === "tomada" ? "confirmada" : "cancelada"}
                    extraContent={
                        item.tipo === "cancelada" && (
                            <div className="card-field motivo-error">
                                <span className="card-label">Motivo:</span>
                                <span className="card-value">{item.motivoCancelacion}</span>
                            </div>
                        )
                    }
                />
            ))}
        </div>
    );
}
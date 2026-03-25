import MentoriaCard from "../Common/MentoriaCard";

const HISTORIAL = [
    { 
        id: 1, 
        email: "mentor1@utez.edu.mx", 
        nombre: "Gustavo Diaz Peña", 
        materia: "Matematica aplicada", 
        aula: "A2 – Docencia II", 
        hora: "08:00 – 10:00", 
        cupos: "5/5",
        tipo: "tomada" 
    },
    { 
        id: 2, 
        email: "mentor2@utez.edu.mx", 
        nombre: "Ana Martínez", 
        materia: "Física II", 
        aula: "Laboratorio B", 
        hora: "12:00 – 14:00", 
        cupos: "3/5",
        tipo: "pendiente"
    },
    { 
        id: 3, 
        email: "mentor3@utez.edu.mx", 
        nombre: "Ricardo Sosa", 
        materia: "Cálculo Integral", 
        aula: "A5 – Docencia I", 
        hora: "10:00 – 12:00", 
        cupos: "0/5",
        tipo: "cancelada", 
        motivoCancelacion: "Falta de alumnos inscritos"
    }
];

export default function VistaHistorial() {
    return (
        <>
            <div className="cards-grid">
                {HISTORIAL.map((item) => (
                    <MentoriaCard
                        key={item.id}
                        data={item}
                        status={item.tipo === "tomada" ? "confirmada" : "por-aceptar"}
                        extraContent={
                            item.tipo === "cancelada" && (
                                <div className="card-field">
                                    <span className="card-label">Motivo:</span>
                                    <span>{item.motivoCancelacion}</span>
                                </div>
                            )
                        }
                    />
                ))}
            </div>
        </>
    );
}
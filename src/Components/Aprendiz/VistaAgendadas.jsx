import MentoriaCard from "../Common/MentoriaCard";

export default function VistaAgendadas() {
    return (
        <>
            <div className="legend">
                <span className="legend-item"><span className="dot confirmada" /> Confirmada</span>
                <span className="legend-item"><span className="dot por-aceptar" /> Por aceptar</span>
            </div>

            <div className="cards-grid">
                {MENTORIAS.map((m) => (
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
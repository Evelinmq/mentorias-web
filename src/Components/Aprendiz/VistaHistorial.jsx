import MentoriaCard from "../Common/MentoriaCard";

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
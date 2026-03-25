import MentoriaCard from "../Common/MentoriaCard";

function SolicitudCard({ mentor }) {
    const [tema, setTema] = useState("");

    const handleConfirmar = () => {
        if (!tema.trim()) return;
        alert("Solicitud enviada");
    };

    return (
        <MentoriaCard
            data={{
                ...mentor,
                fecha: "30/01/2026"
            }}
            extraContent={
                <>
                    <input
                        type="text"
                        placeholder="Tema"
                        value={tema}
                        onChange={(e) => setTema(e.target.value.trimStart())}
                    />

                    <button
                        disabled={!tema.trim()}
                        onClick={handleConfirmar}
                    >
                        Confirmar
                    </button>
                </>
            }
        />
    );
}
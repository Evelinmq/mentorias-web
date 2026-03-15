function AgendaMentor({ mentorias, diaSeleccionado }) {

    const mentoriasDelDia = mentorias.filter(
        m => m.fecha === diaSeleccionado
    );

    return (

        <div>

            <h3 className="agenda-title">
                Agenda
            </h3>

            {!diaSeleccionado && (
                <p>Selecciona un día del calendario</p>
            )}

            {mentoriasDelDia.map((m, index) => (

                <div key={index} className="card-agenda">

                    <h4>{m.alumno}</h4>

                    <p>{m.materia}</p>

                    <p>{m.hora}</p>

                    <div className="agenda-buttons">

                        <button className="btn-aceptar">
                            Aceptar
                        </button>

                        <button className="btn-cancelar">
                            Cancelar
                        </button>

                    </div>

                </div>

            ))}

        </div>

    )

}

export default AgendaMentor
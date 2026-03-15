import "../Admin/ModalesGlobal.css";

function ModalMentoria({cerrar}){

    return(

        <div className="modal-overlay">

            <div className="modal-content">

                <h2 className="modal-title">
                    Agregar mentoría
                </h2>

                <form className="modal-grid">

                    <div className="modal-column">

                        <input type="date" className="modal-input"/>
                        <input type="time" className="modal-input"/>
                        <input type="time" className="modal-input"/>

                        <select className="modal-select">
                            <option>Edificio</option>
                        </select>

                    </div>

                    <div className="modal-column">

                        <select className="modal-select">
                            <option>Cuatrimestre</option>
                        </select>

                        <select className="modal-select">
                            <option>Materia</option>
                        </select>

                        <select className="modal-select">
                            <option>Aula</option>
                        </select>

                    </div>

                </form>

                <div className="modal-actions">

                    <button className="btn-cancelar" onClick={cerrar}>
                        Cancelar
                    </button>

                    <button className="btn-guardar">
                        Guardar
                    </button>

                </div>

            </div>

        </div>

    )

}

export default ModalMentoria;
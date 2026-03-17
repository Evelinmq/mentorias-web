import { useState } from "react";
import "./DashboardMentor.css";


// SOLO ES UN EJEMPLO PARA TENER ALGO EN LO QUE NOS ENSEÑAN COMO HACERLO
function CalendarioMentor({ mentorias, onSeleccionarDia }) {

    const [fechaActual, setFechaActual] = useState(new Date());

    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();

    const nombreMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const primerDia = new Date(año, mes, 1).getDay();
    const diasMes = new Date(año, mes + 1, 0).getDate();

    const cambiarMes = (dir) => {
        setFechaActual(new Date(año, mes + dir, 1));
    };

    const dias = [];

    for (let i = 0; i < primerDia; i++) {
        dias.push(<div key={"v" + i}></div>);
    }

    for (let d = 1; d <= diasMes; d++) {

        const fechaCompleta = `${año}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        const tieneMentorias = mentorias.some(m => m.fecha === fechaCompleta);

        dias.push(

            <div
                key={d}
                className="dia"
                onClick={() => onSeleccionarDia(fechaCompleta)}
            >

                {d}

                {tieneMentorias && <div className="punto"></div>}

            </div>

        )

    }

    return (

        <div>

            <div className="calendario-header">

                <button onClick={() => cambiarMes(-1)}>◀</button>

                <h3>
                    {nombreMeses[mes]} {año}
                </h3>

                <button onClick={() => cambiarMes(1)}>▶</button>

            </div>

            <div className="grid-calendario">

                {dias}

            </div>

        </div>

    )

}

export default CalendarioMentor;
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DashboardMentor.css";

//libreria
//npm install react-calendar

function CalendarioMentor({ mentorias, onSeleccionarDia }) {

    const [fecha, setFecha] = useState(new Date());

    const manejarCambio = (value) => {
        setFecha(value);

        const fechaFormateada = value.toISOString().split("T")[0];

        onSeleccionarDia(fechaFormateada);
    };

    const tileContent = ({ date, view }) => {
        if (view === "month") {

            const fechaStr = date.toISOString().split("T")[0];

            const tieneMentorias = mentorias.some(
                m => m.fecha === fechaStr
            );

            return tieneMentorias ? <div className="punto"></div> : null;
        }
    };
    
    

    return (

        <Calendar
            onChange={manejarCambio}
            value={fecha}
            tileContent={tileContent}
            //minDate={new Date()} 
        />
        
    );
}

export default CalendarioMentor;
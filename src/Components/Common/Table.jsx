import React from "react";
import "./Table.css";

const Table = ({ columns, data, renderActions }) => {

    return (
        <div className="tabla-wrapper">
            <table className="tabla-reportes">

                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {data.map((row, index) => (
                    <tr key={index}>

                        {columns.map((col, i) => (
                            <td key={i}>{row[col.accessor]}</td>
                        ))}

                        <td className="acciones-celda">
                            {renderActions && renderActions(row)}
                        </td>

                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default Table;
import React from "react";
import "./Table.css";

const ReportTable = ({ columns, data }) => {
    return (
        <div className="tabla-wrapper">
            <table className="tabla-reportes">
                <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key={index}>{col.header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 ? (
                    data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                            No hay datos disponibles
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
import React from "react";

const DownloadButton = ({ onClick, icon }) => {
    return (
        <button
            className="btn-descargar-img"
            onClick={onClick}
            title="Descargar Reporte"
        >
            <img src={icon} alt="Descargar" className="img-descarga" />
        </button>
    );
};

export default DownloadButton;
import React from "react";

const SearchBar = ({ placeholder, value, onChange, className }) => {
    return (
        <div className={`buscador-wrapper animation-fade-in ${className}`}>
            <span className="icono-buscar">&#128269;</span>
            <input
                type="text"
                placeholder={placeholder}
                className="input-buscar"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchBar;
import React from "react";

const DateInput = ({ placeholder, value, onChange, className }) => {
    return (
        <div className={`fecha-wrapper ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="input-fecha"
                value={value}
                // El truco de magia para el calendario:
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                }}
                onChange={onChange}
            />
        </div>
    );
};

export default DateInput;
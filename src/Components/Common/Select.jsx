import React from "react";

const Select = ({ register, name, options, rules }) => {
    return (
        <select
            {...register(name, rules)}
            className="modal-input" 
        >
            <option value="">Selecciona</option>

            {options.map((opt, index) => (
                <option key={index} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
import React from "react";

const Select = ({ register, name, options, rules, placeholder }) => {
    return (
        <select
            {...register(name, rules)}
            className="modal-input"
        >
            <option value="">{placeholder || "Selecciona"}</option>

            {options.map((opt, index) => {
                const value = typeof opt === 'object' ? opt.value : opt;
                const label = typeof opt === 'object' ? opt.label : opt;

                return (
                    <option key={index} value={value}>
                        {label}
                    </option>
                );
            })}
        </select>
    );
};

export default Select;
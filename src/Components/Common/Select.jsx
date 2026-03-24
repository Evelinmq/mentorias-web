import React from "react";

const Select = ({ register, name, rules, options }) => {
  return (
    <select className="modal-select" {...register(name, rules)}>
      <option value="">Selecciona una opción</option>
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default Select;
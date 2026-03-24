import React from "react";

const Input = ({ type = "text", placeholder, register, name, rules }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="modal-input"
      {...register(name, rules)}
    />
  );
};

export default Input;
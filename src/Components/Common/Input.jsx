const Input = ({ type = "text", placeholder, value, onChange, register, name, rules }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="modal-input"
      value={value}
      onChange={onChange}
      {...(register ? register(name, rules) : {})}
    />
  );
};

export default Input;
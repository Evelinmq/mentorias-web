const Input = ({ type = "text", placeholder, register, name, rules }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="modal-input"
      {...(register ? register(name, rules) : {})}
    />
  );
};

export default Input;
const PinInput = ({ length = 6, values, onChange }) => {
    return (
        <div className="codigo-container">
            {values.map((c, index) => (
                <input
                    key={index}
                    maxLength="1"
                    className="codigo-input"
                    value={c}
                    onChange={(e) => onChange(e.target.value, index)}
                />
            ))}
        </div>
    );
};

export default PinInput;
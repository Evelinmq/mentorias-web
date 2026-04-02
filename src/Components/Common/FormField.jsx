import Input from "./Input";

const FormField = ({ label, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', textAlign: 'left' }}>
            <label>{label}</label>
            <Input {...props} />
        </div>
    );
};

export default FormField;
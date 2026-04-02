const AuthLayout = ({ children }) => {
    return (
        <div className="login-contenedor">
            <div className="Circulo1" />
            <div className="circulo2" />
            <div className="circulo3" />
            <div className="circulo4" />
            <div className="circulo5" />
            <div className="circulo6" />
            <div className="circulo7" />
            <div className="circulo8" />

            <div className="login-box">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
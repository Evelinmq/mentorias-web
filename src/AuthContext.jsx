import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    const login = (correo, rol, token, id, nombre) => {
        const usuario = { correo, rol, token, id, nombre }; // ← EL TOKEN VA AQUÍ
        setUser(usuario);
        localStorage.setItem("user", JSON.stringify(usuario));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const login = (correo, rol) => {
        const usuario = { correo, rol };
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

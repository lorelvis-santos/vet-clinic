import { useState, useEffect, createContext} from 'react';
import axios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            // Validamos que el usuario esté autenticado y lo guardamos en el estado global
            // Si no lo está, dejamos el estado de Auth como un objeto vacío
            try {
                const { data } = await axios("/veterinarians/profile", config);
                setAuth(data);
            } catch {
                setAuth({});
                return;
            }
        }

        authenticateUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;
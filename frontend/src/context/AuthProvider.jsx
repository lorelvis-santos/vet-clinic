import { useState, useEffect, createContext} from 'react';
import axios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
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
            }
            
            setLoading(false);
        }

        authenticateUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        sessionStorage.setItem("logout_reason", "manual");
        setAuth({});
    }

    const updateProfile = async profile => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.put(`/veterinarians/profile`, {profile}, config);

            setAuth(data.profile);

            return {
                message: "Datos guardados correctamente",
                error: false
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                error: true
            }
        }
    }

    const updatePassword = async (currentPassword, newPassword) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            await axios.put(`/veterinarians/change-password`, {
                currentPassword,
                newPassword
            }, config);

            return {
                message: "Datos guardados correctamente",
                error: false
            }
        } catch (error) {
            return {
                message: error.response.data.message,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logout,
                updateProfile,
                updatePassword
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
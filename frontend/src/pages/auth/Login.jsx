import { useState } from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import Alert from "../../components/Alert";
import axios from "../../config/axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});

    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const previousLocation = location.state?.from;

    const from = previousLocation ? `${previousLocation.pathname || ""}${previousLocation.search || ""}${previousLocation.hash || ""}` : "/admin";

    console.log(from);

    async function handleSubmit(e) {
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlert({
                message: "Debes llenar todos los campos",
                error: true
            });
            return;
        }

        if (password.length < 8) {
            setAlert({
                message: "La contraseña debe tener al menos 8 carácteres",
                error: true
            })
        }

        setAlert({});

        try {
            const { data } = await axios.post("/veterinarians/login", {
                email,
                password
            });

            const { user } = data;

            sessionStorage.removeItem("logout_reason");
            localStorage.setItem("token", user.token);

            setAuth(user);

            navigate(from, { replace: true });
            
        } catch (error) {
            console.log(error);
            setAlert({
                message: error.response?.data?.message || error.message,
                error: true
            });
            return;
        }
    }

    const { message } = alert;

    return (
        <>
            {auth?._id ?
                <Navigate to={from} replace /> : (
                    <>
                        <div>
                            <h1 className="text-indigo-600 font-black text-6xl">Inicia sesión y administra tus {""} <span className="text-gray-800">pacientes</span></h1>
                        </div>
                        <div className="shadow-xl rounded-xl p-8 bg-white">
                            <div>
                                {message && <Alert alert={alert}></Alert>}
                                <form 
                                    className="flex flex-col gap-5"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex flex-col">
                                        <label 
                                            htmlFor="email"
                                            className="font-medium text-md text-gray-600"
                                        >
                                            Correo electrónico
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="johndoe@gmail.com"
                                            className="bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2"
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label 
                                            htmlFor="password"
                                            className="font-medium text-md text-gray-600"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <input 
                                        type="submit" 
                                        value="Iniciar sesión" 
                                        className="transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3 md:w-fit"/>
                                </form>

                                <nav className="mt-10 text-center flex flex-col gap-4 lg:flex-row lg:justify-between lg:text-left">
                                    <Link 
                                        to="/registrar"
                                        className="text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out">
                                        ¿Aún no tienes una cuenta? Regístrate
                                    </Link>
                                    <Link 
                                        to="/recuperar-contraseña"
                                        className="text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Login
import { useState } from "react"
import { Link } from "react-router"
import Alert from "../../components/Alert";
import axios from "../../config/axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({
        message: "",
        error: false
    });

    async function handleSubmit(e) {
        e.preventDefault();

        if (email === "") {
            setAlert({
                message: "Ingresa un emáil válido",
                error: true
            });

            return;
        }

        // Eliminamos cualquier alerta que exista
        setAlert({});

        try {
            const { data } = await axios.post("/veterinarians/forgot-password", {
                email
            });

            setAlert({
                message: data.message,
                error: false
            });
        } catch (error) {
            const { data } = error.response;

            setAlert({
                message: data.message,
                error: true
            })
        }
    }

    const { message } = alert;

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Recupera tu acceso y no pierdas a tus {""} <span className="text-gray-800">pacientes</span></h1>
            </div>
            <div className="shadow-xl rounded-xl p-8 bg-white">
                <div>
                    <form 
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}>
                        {message && <Alert alert={alert}/>}
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
                                onInput={e => setEmail(e.target.value.trim())}
                            />
                        </div>

                        <input 
                            type="submit" 
                            value="Enviar instrucciones" 
                            className="transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3 md:w-fit"/>
                    </form>

                    <nav className="mt-10 text-center flex flex-col gap-4 lg:flex-row lg:justify-between lg:text-left">
                        <Link 
                            to="/"
                            className="text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out">
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                        <Link 
                            to="/registrar"
                            className="text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out">
                            ¿Aún no tienes una cuenta? Regístrate
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
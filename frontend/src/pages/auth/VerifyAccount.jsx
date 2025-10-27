import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import axios from "../../config/axios";
import Alert from "../../components/Alert";

const VerifyAccount = () => {
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    const params = useParams();

    const { token } = params;

    // Usamos useEffect para que se ejecute un callback cuando se cargue el componente
    // El array vacío hace que se cargue una sola vez
    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const { data } = await axios(`/veterinarians/verify/${token}`);
                
                setConfirmedAccount(true);
                
                setAlert({
                    message: data.message
                })
            } catch (error) {
                const { data } = error.response;

                setAlert({
                    message: data.message,
                    error: true
                })
            }

            setLoading(false);
        }

        confirmAccount();
    }, []);

    return (
        <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y administra {""} <span className="text-gray-800">tus pacientes</span></h1>
            </div>
            <div className="shadow-xl rounded-xl p-8 bg-white">
                {!loading && <Alert alert={alert} />}

                {confirmedAccount && (
                    <Link 
                        to='/'
                        className='block text-gray-500 text-center w-full transition duration-200 hover:text-gray-600 ease-in-out'>
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </>
    )
}

export default VerifyAccount
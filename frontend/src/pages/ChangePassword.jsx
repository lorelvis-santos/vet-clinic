import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import axios from '../config/axios';
import Alert from '../components/Alert';

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alert, setAlert] = useState({});
    const [changedPassword, setChangedPassword] = useState(false);
    const [validToken, setValidToken] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios(`/veterinarians/forgot-password/${token}`);
                setValidToken(true);
            } catch (error) {
                setAlert({
                    message: error.response.data.message,
                    error: true
                })
            }
        }

        verifyToken();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        if ([password, confirmPassword].includes('')) {
            setAlert({
                message: 'Debes llenar todos los campos',
                error: true
            });
            return;
        }

        if (password.length < 8) {
            setAlert({
                message: 'La contraseña debe tener mínimo 8 carácteres',
                error: true
            });
            return;
        }

        if (password !== confirmPassword) {
            setAlert({
                message: 'Las contraseñas no son iguales',
                error: true
            });
            return;
        }

        setAlert({});

        // Cambiamos la contraseña
        try {
            const response = await axios.post(`/veterinarians/forgot-password/${token}`, {password});

            setAlert({
                message: "Contraseña cambiada correctamente. Puedes iniciar sesión"
            }); 

            setPassword("");
            setConfirmPassword("");
            setValidToken(false);
            setChangedPassword(true);
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
                <h1 className='text-indigo-600 font-black text-6xl'>Recupera tu cuenta y administra {''} <span className='text-gray-800'>tus pacientes</span></h1>
            </div>
            <div className='shadow-xl rounded-xl p-8 bg-white'>
                <div>
                    {message && <Alert alert={alert} />}

                    {validToken && (
                        <form 
                            onSubmit={handleSubmit}
                            className='flex flex-col gap-5'>
                            <div className='flex flex-col'>
                                <label 
                                    htmlFor='password'
                                    className='font-medium text-md text-gray-600'>
                                    Nueva contraseña
                                </label>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    className='bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col'>
                                <label 
                                    htmlFor='confirmPassword'
                                    className='font-medium text-md text-gray-600'>
                                    Confirma tu nueva contraseña
                                </label>
                                <input
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='password'
                                    className='bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input 
                                type='submit' 
                                value='Cambiar contraseña' 
                                className='transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3 md:w-fit'/>
                        </form>
                    )}

                    {changedPassword && (
                        <nav className='mt-10 text-center flex flex-col gap-4 lg:flex-row lg:justify-between lg:text-left'>
                            
                                <Link 
                                    to='/'
                                    className='block text-gray-500 text-center w-full transition duration-200 hover:text-gray-600 ease-in-out'>
                                    Iniciar sesión
                                </Link>
                            
                        </nav>
                    )}
                </div>
            </div>
        </>
    )
}

export default ChangePassword
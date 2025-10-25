import { useState } from 'react'
import { data, Link } from 'react-router'
import axios from '../config/axios';
import Alert from '../components/Alert';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [alert, setAlert] = useState({})

    async function handleSubmit(e) {
        e.preventDefault();

        if ([name, email, password, confirmPassword].includes('')) {
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

        // Creamos el usuario
        try {
            const response = await axios.post("/veterinarians", {
                name,
                email,
                password
            });

            setAlert({
                message: "Usuario registrado correctamente. Revisa tu correo"
            }); 

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
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
                <h1 className='text-indigo-600 font-black text-6xl'>Crea tu cuenta y administra tus {''} <span className='text-gray-800'>pacientes</span></h1>
            </div>
            <div className='shadow-xl rounded-xl p-8 bg-white'>
                <div>
                    {message && <Alert alert={alert} />}

                    <form 
                        onSubmit={handleSubmit}
                        className='flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <label 
                                htmlFor='name'
                                className='font-medium text-md text-gray-600'
                            >
                                Nombre
                            </label>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='John Doe'
                                className='bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label 
                                htmlFor='email'
                                className='font-medium text-md text-gray-600'
                            >
                                Correo electrónico
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='johndoe@gmail.com'
                                className='bg-gray-50 border border-gray-300 rounded-[8px] p-2 mt-2'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <label 
                                htmlFor='password'
                                className='font-medium text-md text-gray-600'
                            >
                                Contraseña
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
                                className='font-medium text-md text-gray-600'
                            >
                                Confirma tu contraseña
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
                            value='Registrarme' 
                            className='transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3 md:w-fit'/>
                    </form>

                    <nav className='mt-10 text-center flex flex-col gap-4 lg:flex-row lg:justify-between lg:text-left'>
                        <Link 
                            to='/'
                            className='text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out'>
                            ¿Ya tienes una cuenta? Inicia sesión
                        </Link>
                        <Link 
                            to='/recuperar-contraseña'
                            className='text-gray-500 transition duration-200 hover:text-gray-600 ease-in-out'>
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Register
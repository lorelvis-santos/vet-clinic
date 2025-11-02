import { Link } from "react-router"
import useAuth from "../hooks/useAuth"

const Header = () => {
    const { logout } = useAuth();

    return (
        <header className="py-10 bg-indigo-600">
            <div className="mx-auto container w-full flex gap-8 flex-col justify-between items-center lg:gap-0 lg:flex-row">
                <h1 className="font-bold text-2xl text-center md:text-left text-indigo-200">Administrador de Pacientes de {""} 
                    <span className="text-white font-black">Veterinaria</span>
                </h1>

                <nav className="flex flex-col items-center gap-4 lg:flex-row lg:text-left">
                    <Link to="/admin" className="text-white text-lg font-bold uppercase">Pacientes</Link>
                    <Link to="/admin/perfil" className="text-white text-lg font-bold uppercase">Perfil</Link>
                    <button
                        type="button"
                        className="text-white text-lg font-bold uppercase hover:cursor-pointer"
                        onClick={logout}
                    > Cerrar sesión</button>
                </nav>
            </div>
        </header>
    )
}

export default Header
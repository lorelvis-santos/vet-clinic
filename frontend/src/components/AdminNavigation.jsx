import { Link } from "react-router"

const AdminNavigation = () => {
    return (
        <nav className="flex gap-2">
            <Link 
                className="font-bold text-gray-500 hover:text-gray-600 transition-colors"
                to="/admin/perfil">
                Perfil
            </Link>

            <Link 
                className="font-bold text-gray-500 hover:text-gray-600 transition-colors"
                to="/admin/cambiar-contraseña">
                Cambiar contraseña
            </Link>
        </nav>
    )
}
export default AdminNavigation
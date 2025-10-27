import { Outlet, Navigate } from "react-router"
import useAuth from "../hooks/useAuth"

const AdminLayout = () => {
    const { auth, loading } = useAuth();

    if (loading) {
        // Se podría mostrar un spinner de carga...
        return;
    }

    return (
        <div>
            {auth?._id ? <Outlet /> : <Navigate to="/" />}
        </div>
    )
}

export default AdminLayout
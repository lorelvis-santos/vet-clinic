import { Outlet, Navigate, useLocation } from "react-router"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"

const AdminLayout = () => {
    const { auth, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return;
    }

    if (auth?._id) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                    <main className="container mx-auto mt-20 flex-1 w-[90%]">
                        <Outlet />
                    </main>
                <Footer />
            </div>
        )
    }

    const wasManual = sessionStorage.getItem("logout_reason") === "manual";

    if (wasManual) {
        sessionStorage.removeItem("logout_reason");
        return <Navigate to="/" replace />;
    }

    return <Navigate to="/" state={{ from: location }} replace/>;
}

export default AdminLayout
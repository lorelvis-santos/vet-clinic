import { Outlet, Navigate } from "react-router"
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth"

const AdminLayout = () => {
    const { auth } = useAuth();

    return (
        <>
            {auth?._id ? (
                <div className="min-h-screen flex flex-col">
                    <Header />
                        <main className="container mx-auto mt-20 flex-1 w-[90%]">
                            <Outlet />
                        </main>
                    <Footer />
                </div>
            ) : <Navigate to="/" />}
        </>
    )
}

export default AdminLayout
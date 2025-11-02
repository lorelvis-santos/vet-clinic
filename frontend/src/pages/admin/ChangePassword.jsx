import AdminNavigation from "../../components/AdminNavigation"

const ChangePassword = () => {
    return (
        <>
            <AdminNavigation/>

            <h2 className="font-bold text-3xl text-center mt-10">Cambia tu contraseña</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu {''} <span className="text-indigo-600 font-bold">contraseña aquí</span>
            </p>

        </>
    )
}

export default ChangePassword
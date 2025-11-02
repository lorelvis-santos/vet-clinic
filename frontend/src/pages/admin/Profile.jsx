import { useEffect, useState } from "react";
import AdminNavigation from "../../components/AdminNavigation"
import useAuth from "../../hooks/useAuth"
import Alert from "../../components/Alert";

const Profile = () => {
    const [alert, setAlert] = useState({});
    const [profile, setProfile] = useState({});
    const { auth, updateProfile } = useAuth();

    useEffect(() => {
        setProfile(auth);
    }, [auth]);

    async function handleSubmit(e) {
        e.preventDefault();

        if ([profile.name, profile.email].includes("")) {
            setAlert({
                message: "El nombre y el correo son obligatorios",
                error: true
            });

            return;
        }

        setAlert(await updateProfile(profile));
    }

    const { message } = alert;

    return (
        <>
            <AdminNavigation/>

            <h2 className="font-bold text-3xl text-center mt-10">Mi perfil</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Consulta y/o modifica tu {''} <span className="text-indigo-600 font-bold">información aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <form 
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        {message && <Alert alert={alert}/>}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-bold text-gray-600">Nombre</label>
                            <input 
                                type="text"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="name"
                                name="name"
                                value={profile.name || ""}
                                onChange={ e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="website" className="font-bold text-gray-600">Sitio web</label>
                            <input 
                                type="text"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="website"
                                name="website"
                                value={profile.website || ""}
                                onChange={ e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-bold text-gray-600">Email</label>
                            <input 
                                type="email"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="email"
                                name="email"
                                value={profile.email || ""}
                                onChange={ e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="font-bold text-gray-600">Teléfono</label>
                            <input 
                                type="number"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="phone"
                                name="phone"
                                value={profile.phone || ""}
                                onChange={ e => setProfile({
                                    ...profile,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value="Guardar cambios"
                            className="transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
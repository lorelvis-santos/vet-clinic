import { useState } from "react";
import AdminNavigation from "../../components/AdminNavigation";
import Alert from "../../components/Alert";
import useAuth from "../../hooks/useAuth";

const ChangePassword = () => {
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        newConfirmPassword: ""
    });

    const { updatePassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (Object.values(password).includes("")) {
            setAlert({
                message: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        if (Object.values(password).some(field => field.length < 8)) {
            setAlert({
                message: "Las contraseñas deben tener mínimo 8 carácteres",
                error: true
            });
            return;
        }

        if (password.newPassword !== password.newConfirmPassword) {
            setAlert({
                message: "Las contraseñas no coinciden",
                error: true
            })
            return;
        }

        const response = await updatePassword(password.currentPassword, password.newPassword);

        setAlert(response);

        if (!response.error) {
            setPassword({
                currentPassword: "",
                newPassword: "",
                newConfirmPassword: ""
            });
        }
    }

    const { message } = alert;

    return (
        <>
            <AdminNavigation/>

            <h2 className="font-bold text-3xl text-center mt-10">Cambia tu contraseña</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu {''} <span className="text-indigo-600 font-bold">contraseña aquí</span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                    <form 
                        className="flex flex-col gap-5"
                        onSubmit={handleSubmit}
                    >
                        {message && <Alert alert={alert}/>}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="currentPassword" className="font-bold text-gray-600">Contraseña actual</label>
                            <input 
                                type="password"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="currentPassword"
                                name="currentPassword"
                                value={password["currentPassword"] || ""}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="newPassword" className="font-bold text-gray-600">Nueva contraseña</label>
                            <input 
                                type="password"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="newPassword"
                                name="newPassword"
                                value={password["newPassword"] || ""}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="newConfirmPassword" className="font-bold text-gray-600">Confirma tu nueva contraseña</label>
                            <input 
                                type="password"
                                className="border border-gray-200 bg-gray-50 w-full p-2 rounded-lg"
                                id="newConfirmPassword"
                                name="newConfirmPassword"
                                value={password["newConfirmPassword"] || ""}
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name]: e.target.value
                                })}
                            />
                        </div>

                        <input 
                            type="submit"
                            value="Actualizar mi contraseña"
                            className="transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default ChangePassword
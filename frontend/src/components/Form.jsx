import { useState } from "react";
import Alert from "../components/Alert";
import usePatients from "../hooks/usePatients";
import { useEffect } from "react";

const Form = () => {
    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [symptoms, setSymptoms] = useState("");
    const [alert, setAlert] = useState({});

    // El id del veterinario se tomará del JSON Web Token.

    const { savePatient, patient } = usePatients();

    useEffect(() => {
        if (!patient?._id) {
            return;
        }

        setId(patient._id);
        setName(patient.name);
        setOwner(patient.owner);
        setEmail(patient.email);
        setDate(new Date(patient.date).toLocaleDateString("en-CA"));
        setSymptoms(patient.symptoms);

        setAlert({});
    }, [patient]);

    function handleSubmit(e) {
        e.preventDefault();

        if ([name, owner, email, date, symptoms].includes("")) {
            setAlert({
                message: "Debes llenar todos los campos",
                error: true
            })
            return;
        }

        setAlert({});

        savePatient({
            id,
            name,
            owner,
            email,
            date,
            symptoms
        });

        setAlert({
            message: "Guardado correctamente",
            error: false
        });

        setId(null);
        setName("");
        setOwner("");
        setEmail("");
        setDate("");
        setSymptoms("");
    }

    const { message } = alert;

    return (
        <>
            <h2 className="font-bold text-gray-700 text-3xl text-center">Administrador de pacientes</h2>

            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus pacientes y {''}
                <span className="text-indigo-600 font-bold">adminístralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 p-4 bg-white py-10 px-5 rounded-xl mb-10 lg:mb-5 shadow-md">
                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="name"
                        className="text-gray-700">
                        Nombre de la mascota
                    </label>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Hook"
                        className="w-full placeholder-gray-400 bg-white border border-gray-300 rounded-[8px] p-2"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="owner"
                        className="text-gray-700">
                        Nombre del propietario
                    </label>
                    <input 
                        type="text"
                        name="owner"
                        id="owner"
                        placeholder="John Doe"
                        className="w-full placeholder-gray-400 bg-white border border-gray-300 rounded-[8px] p-2"
                        value={owner}
                        onChange = {e => setOwner(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="email"
                        className="text-gray-700">
                        Correo del propietario
                    </label>
                    <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="johndoe12@gmail.com"
                        className="w-full placeholder-gray-400 bg-white border border-gray-300 rounded-[8px] p-2"
                        value={email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="date"
                        className="text-gray-700">
                        Fecha de ingreso
                    </label>
                    <input 
                        type="date"
                        name="date"
                        id="date"
                        className="w-full placeholder-gray-400 bg-white border border-gray-300 rounded-[8px] p-2"
                        value={date}
                        onChange = {e => setDate(e.target.value)}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label 
                        htmlFor="symptoms"
                        className="text-gray-700">
                        Síntomas
                    </label>
                    <textarea 
                        name="symptoms"
                        id="symptoms"
                        placeholder="Describe los síntomas de la mascota"
                        className="w-full placeholder-gray-400 bg-white border border-gray-300 rounded-[8px] p-2 h-52"
                        value={symptoms}
                        onChange = {e => setSymptoms(e.target.value)}
                    />
                </div>

                <input 
                    type="submit"
                    value={ id ? "Guardar cambios" : "Agregar paciente"}
                    className="transition duration-200 ease-in-out block bg-indigo-600 px-8 py-3 text-white hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mt-3"/>
            </form>

            {message && <Alert alert={alert}/>}
        </>
    )
}

export default Form
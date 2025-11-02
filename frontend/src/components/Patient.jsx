import usePatients from "../hooks/usePatients";

const Patient = ({patient}) => {
    const { setEditing, deletePatient } = usePatients();
    const { name, owner, email, date, symptoms, _id } = patient;

    const formatDate = (date) => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("es-ES", {dateStyle: "long"}).format(newDate);
    }

    return (
        <li className="bg-white shadow-md px-5 py-10 rounded-xl flex flex-col gap-1.5 w-full max-w-120 mx-auto">
            <p className="font-bold text-indigo-800">
                Nombre: <span className="font-normal text-black normal-case">{name}</span>
            </p>

            <p className="font-bold text-indigo-800">
                Propietario: <span className="font-normal text-black normal-case">{owner}</span>
            </p>

            <p className="font-bold text-indigo-800">
                Email: <span className="font-normal text-black normal-case">{email}</span>
            </p>

            <p className="font-bold text-indigo-800">
                Fecha: <span className="font-normal text-black normal-case">{formatDate(date)}</span>
            </p>

            <p className="font-bold text-indigo-800 max-w-75 text-pretty">
                Síntomas: <span className="font-normal text-black normal-case">{symptoms}</span>
            </p>

            <div className="flex flex-col gap-4 mt-3 md:flex-row">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600, bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold hover:cursor-pointer"
                    onClick={() => { setEditing(patient) }}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600, bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold hover:cursor-pointer"
                    onClick={() => { 
                        confirm("¿Estás seguro de que quieres eliminar a este paciente?") ?
                            deletePatient(patient._id) : "";
                    }}
                >
                    Eliminar
                </button>
            </div>
        </li>
    )
}
export default Patient
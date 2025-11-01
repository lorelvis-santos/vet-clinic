import { useState } from "react";
import Form from "../../components/Form";
import PatientsList from "../../components/PatientsList";

const Patients = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <button 
                type="button"
                className="bg-indigo-600 text-white transition duration-200 ease-in-out block px-8 py-3 hover:cursor-pointer hover:bg-indigo-800 font-bold rounded-[8px] text-xl mb-10 md:hidden"
                onClick={() => setShowForm(!showForm)}
            >
                { showForm ? "Ocultar formulario" : "Mostrar formulario"}
            </button>
            <div className={` ${showForm ? "block" : "hidden" } md:block md:w-1/2 lg:w-2/5`}>
                <Form />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <PatientsList />
            </div>
        </div>
    )
}

export default Patients
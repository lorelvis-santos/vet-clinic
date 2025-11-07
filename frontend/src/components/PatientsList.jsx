import usePatients from "../hooks/usePatients";
import Patient from "./Patient";

const PatientsList = () => {
    const { patients, loading } = usePatients();

    return (
        <>
            { !loading && patients.length ? 
                (
                    <>
                        <h2 className="font-bold text-gray-700 text-3xl text-center">Tus pacientes</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Administra tus {''}
                            <span className="text-indigo-600 font-bold">pacientes</span>
                        </p>

                        <ul className="flex flex-col gap-8 mx-5">
                            {patients.map(patient => (
                                <Patient
                                    key={patient._id}
                                    patient={patient}
                                />
                            ))}
                        </ul>
                    </>
                ) : (
                    <>
                        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>

                        <p className="text-xl mt-5 mb-10 text-center">
                            Comienza agregando pacientes {''}
                            <span className="text-indigo-600 font-bold">y aparacerán en este lugar</span>
                        </p>
                    </>
                )
            }
        </>
    )
}

export default PatientsList
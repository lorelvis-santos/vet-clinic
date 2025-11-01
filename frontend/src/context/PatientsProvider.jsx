import { createContext, useState, useEffect } from "react";
import axios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PatientsContext = createContext();

const PatientsProvider = ({children}) => {
    const [patients, setPatients] = useState([]);
    const [patient, setPatient] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const getPatients = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    return;
                }

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axios("/patients", config);

                setPatients(data.patients);
            } catch (error) {
                console.error(error);
            }
        }

        getPatients();
    }, [auth]);

    async function savePatient(patient) {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (patient.id === null) {
            try {
                const { data } = await axios.post("/patients", patient, config);
                setPatients([data.patient, ...patients]);
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                const { data } = await axios.put(`/patients/${patient.id}`, patient, config);
                const updatedPatient = data.patient;

                const updatedPatients = patients.map(
                    current => current._id === updatedPatient._id ? updatedPatient : current
                );

                setPatients(updatedPatients);
            } catch (error) {
                console.error(error);
            }
        }
    }

    function setEditing(patient) {
        setPatient(patient);
    }

    async function deletePatient(id) {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await axios.delete(`/patients/${id}`, config);

            const newPatients = patients.filter(current => current._id !== id);
            
            setPatients(newPatients);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PatientsContext.Provider
            value={{
                patients,
                savePatient,
                deletePatient,
                patient,
                setEditing
            }}
        >
            {children}    
        </PatientsContext.Provider>
    )
}

export {
    PatientsProvider
}

export default PatientsContext;
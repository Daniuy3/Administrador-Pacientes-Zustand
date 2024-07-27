import { create } from "zustand";
import { DraftPatient, Patient } from "../types";
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import {toast} from 'react-toastify';

type PatienState = {
    patients: Patient[],
    activeId: Patient["id"],
    addPatient: (data: DraftPatient) => void,
    removePatient: (id: Patient["id"]) => void,
    getPatientById: (id: Patient["id"]) => void,
    updatePatient: (data: DraftPatient) => void
}
const createPatient = (patient: DraftPatient): Patient => {
    return {...patient, id: uuidv4()}
}
export const usePatientStore = create<PatienState>()(
    devtools(
    /* Esto hace que se guarde en localStorage */
    persist((set) => ({
        patients : [],
        activeId: "",
        addPatient: (data) => {
            const newPatient = createPatient(data);

            set(state => ({
                patients: [...state.patients, newPatient]
            })
            )
        },
         removePatient: (id) => {
            toast("Paciente Eliminado", {type: "error", autoClose: 2000});
            set(state => ({
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => {
            set(() => ({
                activeId: id
            }))
        },
        updatePatient: (data) => {
            set(state => ({
                patients: state.patients.map(patient => patient.id === state.activeId? {...patient, ...data}: patient),
                        /* Aqui tomo una copia de los datos anteriores y de los nuevos y los convino */
                activeId: ""
            }))
        }
    }),{
        name: "patient-storage",
        storage: createJSONStorage(() =>sessionStorage) /* Asi se guarda aunque cierres la ventana */
    })
))
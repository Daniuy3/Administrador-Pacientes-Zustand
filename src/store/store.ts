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
            /* Le agrego el id al dato que recibo */
            const newPatient = createPatient(data);

            set(state => ({
                /* tomo una copia del arreglo de pacientes anterior y le agrego el nuevo paciente */
                patients: [...state.patients, newPatient]
            })
            )
        },
         removePatient: (id) => {
            /* Genero la notificacion de tipo error */
            toast("Paciente Eliminado", {type: "error", autoClose: 2000});
            set(state => ({
                /* Filtro los pacientes que no coincidan con el id recibido */
                patients: state.patients.filter(patient => patient.id !== id)
            }))
        },
        getPatientById: (id) => {
            /* Simplemente establezco el active id como el id recibido */
            set(() => ({
                activeId: id
            }))
        },
        updatePatient: (data) => {
            set(state => ({
                /* Mapeo los datos del arreglo, si el paciente no coincide con el id lo regreso tal cual
                     si coincide, le agrego los datos nuevos y lo regreso
                */
                patients: state.patients.map(patient => patient.id === state.activeId? {...patient, ...data}: patient),
                                             /* Aqui tomo una copia de los datos anteriores    ↑↑↑↑
                                                            y de los nuevos y los convino */
                activeId: ""
            }))
        }
    }),{
        /* Es el nombre que se va a usar en el storage, el key */
        name: "patient-storage",
        /* Aqui se guarda en el sessionStorage */
        storage: createJSONStorage(() =>sessionStorage) /* Asi se guarda aunque cierres la ventana */
    })
))
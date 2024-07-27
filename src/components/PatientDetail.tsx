import { usePatientStore } from '../store/store'
import type { Patient } from '../types'
import PatientDetailItem from './PatientDetailItem'

type PatientDetailProps = {
    patient: Patient
}

function PatientDetail({patient}: PatientDetailProps) {
    
    const {removePatient, getPatientById} = usePatientStore();
  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>

        <PatientDetailItem label="ID" data={patient.id} />

        <PatientDetailItem label="Nombre" data={patient.name} />

        <PatientDetailItem label="Propietario" data={patient.caretaker} />

        <PatientDetailItem label="Email" data={patient.email} />

        <PatientDetailItem label="Fecha de Alta" data={patient.date.toString()} /> 

        <PatientDetailItem label="Sintomas" data={patient.symptoms} /> 

        <div className='flex flex-col lg:flex-row gap-5 justify-between  mt-10'>
            <button 
            className='bg-red-500 hover:bg-red-600 px-10 py-2 text-white rounded-lg font-bold'
            type='button'
            onClick={() => removePatient(patient.id)}
            >
                Eliminar
            </button>
            <button className='bg-indigo-600 hover:bg-indigo-700 px-10 py-2 text-white rounded-lg font-bold'
            type='button'
            onClick={() => getPatientById(patient.id)}
            >
                Editar
            </button>
        </div>
    </div>
  )
}

export default PatientDetail
import { usePatientStore } from "../store/store"
import PatientDetail from "./PatientDetail";
function PatienList() {

  const { patients } = usePatientStore();

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      {patients.length ? (
          <>
            <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
              Administra tus {' '}
              <span className="text-indigo-600 font-bold">pacientes y citas</span>
            </p>
            {patients.map((patient) => (
              <PatientDetail
                key={patient.id}
                patient={patient}
              />
            ))}
          </>
      ) : ( 
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
          <p className="text-lg mt-5 text-center mb-10">
            Comienza agregando Pacientes y {''}
            <span className="text-indigo-600 font-bold">apareceran en este lugar</span>
          </p>
        </>
      )}
    </div>
  )
}

export default PatienList
import { usePatientStore } from "../store/store"
import PatientDetail from "./PatientDetail";
import { motion } from 'framer-motion';

function PatienList() {

  const { patients } = usePatientStore();

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll">
      
      {patients.length ? (
          <>
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1}}
                exit={{opacity: 0}}
              >
                <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                <p className="text-lg mt-5 text-center mb-10">
                  Administra tus {' '}
                  <span className="text-indigo-600 font-bold">pacientes y citas</span>
                </p>
              </motion.div>

            {patients.map((patient) => (
              <PatientDetail
                key={patient.id}
                patient={patient}
              />
            ))}
          </>
      ) : ( 

            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1}}
 
          >
            <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
              Comienza agregando Pacientes y {''}
              <span className="text-indigo-600 font-bold">apareceran en este lugar</span>
            </p>
          </motion.div>
   
      )}
    </div>
  )
}

export default PatienList
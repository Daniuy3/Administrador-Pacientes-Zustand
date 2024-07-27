import { ToastContainer} from "react-toastify" /* Componente de toast */
import 'react-toastify/dist/ReactToastify.css' /* Estilos del toast */

import './App.css' 
import PatienList from './components/PatientList' /* Renderizado de lista de pacientes */
import PatientForm from './components/PatientForm' /* Renderizado de formulario de pacientes */

function App() {
 
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className='font-black text-5xl text-center md:w-2/3 md:mx-auto'>Seguimiento de Pacientes {""}
          <span className='text-indigo-700'>Veterinaria</span>
        </h1>

        <div className='mt-12 md:flex'>
            <PatientForm />
            <PatienList />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App

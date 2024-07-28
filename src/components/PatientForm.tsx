import {useForm}  from 'react-hook-form';
import Error from './Error';
import type { DraftPatient } from '../types';
import { usePatientStore } from '../store/store';
import { useEffect } from 'react';
import {toast } from 'react-toastify';

export default function PatientForm() {
    
    const {addPatient, activeId, updatePatient } = usePatientStore();
    const patients = usePatientStore(state => state.patients);

    const { register, handleSubmit, setValue, formState:{errors}, reset } = useForm<DraftPatient>();

    /* Estoy usando esta funcion para saber cuando cambia el Active ID que es cuando voy a editar */
    useEffect(() => {

        if(activeId){
            /* A activePatien le agrego el paciente que coincida con el active id */
            const activePatient = patients.filter(patient => patient.id === activeId)[0];

            /* A los campos en el formulario les asigno el valor del activePatient */
            setValue('name', activePatient.name);
            setValue('caretaker', activePatient.caretaker);
            setValue('email', activePatient.email);
            setValue('date', activePatient.date);
            setValue('symptoms', activePatient.symptoms);
        }
    }, [activeId])

    const registerPatient = (data : DraftPatient) => {
        if(activeId){
            updatePatient(data);
            toast("Paciente Actualizado", {type: "info", autoClose: 2000});
            /* Notificacion ↑↑ */
        }
        else{
            addPatient(data);
            toast("Paciente Registrado", {type: "success", autoClose: 2000});
            /* Notificacion ↑↑ */
        }  
        reset();
    }
    

    return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
          <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade Pacientes y {''}
              <span className="text-indigo-600 font-bold">Administralos</span>
          </p>
  
          <form 
              className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
              noValidate
              onSubmit={handleSubmit(registerPatient)}
          >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente 
                    </label>
                    <input  
                        id="name"
                        className="w-full p-3  border border-gray-100"  
                        type="text" 
                        placeholder="Nombre del Paciente" 
                        {...register('name', {required: "El nombre del paciente es Obligatorio" })}
                        /* En register agrego un nuevo campo "name", y lo establezco como required, en caso de no
                            llenarse se utiliza el mensaje dado para crear un alert */
                    />
                    {errors.name && (
                        /* Accedo al mensaje de error de este campo solo cuando existe, 
                        usando este signo  ↓ */
                        <Error>{errors.name?.message}</Error>
                        /* Alert ↑↑ */
                    )}
                    
                    
                </div>
  
                <div className="mb-5">
                  <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                      Propietario 
                  </label>
                  <input  
                      id="caretaker"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Propietario" 
                      {...register('caretaker', {required: "El nombre del propietario es Obligatorio"})}
                  />
                  {errors.caretaker && (<Error>{errors.caretaker?.message}</Error>)}
                </div>
  
              <div className="mb-5">
                <label htmlFor="email" className="text-sm uppercase font-bold">
                    Email 
                </label>
                <input  
                    id="email"
                    className="w-full p-3  border border-gray-100"  
                    type="email" 
                    placeholder="Email de Registro" 
                    {...register('email', {required: "El email es Obligatorio",
                        pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Email No Válido"}
                        /* Pattern es el patron que debe seguir lo qe se escribe en el input, aqui se usa
                            una expresion regular que representa un email */
                    })}
                />
                {errors.email && (<Error>{errors.email?.message}</Error>)}
              </div>
  
              <div className="mb-5">
                  <label htmlFor="date" className="text-sm uppercase font-bold">
                      Fecha Alta 
                  </label>
                  <input  
                      id="date"
                      className="w-full p-3  border border-gray-100"  
                      type="date" 
                      {...register('date', {required: "La fecha es Obligatoria"})}
                  />
                  {errors.date && (<Error>{errors.date?.message}</Error>)}
              </div>
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                  Síntomas 
                  </label>
                  <textarea  
                      id="symptoms"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Síntomas del paciente" 
                      {...register('symptoms', {required: "Los síntomas son Obligatorios"})}
                  ></textarea>
                    {errors.symptoms && (<Error>{errors.symptoms?.message}</Error>)}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar Paciente'
              />
          </form> 
      </div>
    )
  }
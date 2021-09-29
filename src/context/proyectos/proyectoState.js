import React, { useReducer } from "react"
import proyectoContext from "./proyectoContext"
import proyectoReducer from "./proyectoReducer"
import clienteAxios from "../../config/axios"
import { 
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL, 
  ELIMINAR_PROYECTO,
  PROYECTO_ERROR
} from "../../types"


const ProyectoState = props => {

  //los estados y las funciones se definen en este file

  const initialState = {
    proyectos : [],
    formulario : false,
    errorformulario: false,
    proyecto: null,
    mensaje: null
  }

  //dispatch para ejecutar acciones
  const [state, dispatch] = useReducer(proyectoReducer, initialState)

  ///funciones para el CRUD (creacion del context)
 
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos")
      
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      })
    }  catch (error) {

      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  } 

  //agregar proyecto 
  const agregarProyecto =  async proyecto => {

    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto)
     
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data
      })
      
    }  catch (error) {

      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //valida el formulario 
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO
    })
  }

  //selecciona el proyecto segun click
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  //eliminar un proyecto seleccionado
  const eliminarProyecto = async proyectoId => {

    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
      
      dispatch ({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
      
    } catch (error) {

      const alerta = {
        msg: "Hubo un Error",
        categoria: "alerta-error"
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}
    >
    {props.children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState
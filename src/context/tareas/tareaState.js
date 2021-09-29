import React, { useReducer } from "react"
import tareaContext from "./tareaContext"
import TareaReducer from "./tareaReducer"
import clienteAxios from "../../config/axios"
import { 
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
 } from "../../types"

const TareaState = props => {

  //se declara estado inicial
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  }

  //se crea el state y el dispatch con useReducer
  const [state, dispatch] = useReducer(TareaReducer, initialState)

  //obteniendo las tareas de un proyecto
  const obtenerTareas = async proyecto => {

    console.log(proyecto);

    try {
      const resultado = await clienteAxios.get("/api/tareas", { params: { proyecto }})
      console.log(resultado);
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      })
    } catch (error) {
      console.log(error);
    }
  }

  //agregar tarea al proyecto actual (seleccionado)
  const agregarTarea = async tarea => {

    try {
      const resultado = await clienteAxios.post("/api/tareas", tarea)
      console.log(resultado);
      console.log(tarea);
      dispatch({ 
        type: AGREGAR_TAREA,
        payload: tarea
      })
    } catch (error) {
      console.log(error);
    }

  }

  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    })
  }

  const eliminarTarea = async (id, proyecto) => {

    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto}})
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      }) 
    } catch (error) {
      console.log(error);
    }
  }
    
    const actualizarTarea = async tarea => {

      try {
        
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
        
        dispatch({
          type: ACTUALIZAR_TAREA,
          payload: resultado.data.tarea
        })
      } catch (error) {
        console.log(error);
      }
    }

    //toma una tarea para edicion
    const guardarTareaActual = tarea => {
      dispatch({
        type: TAREA_ACTUAL,
        payload: tarea
      })
    }



  return (
    <tareaContext.Provider
    value={{
      tareas: state.tareas,
      tareasproyecto: state.tareasproyecto,
      errortarea: state.errortarea,
      tareaseleccionada: state.tareaseleccionada,
      obtenerTareas,
      agregarTarea,
      validarTarea,
      eliminarTarea,
      guardarTareaActual,
      actualizarTarea
    }}>
      {props.children}
    </tareaContext.Provider>
  )
}

export default TareaState
import React, { useContext, useState, useEffect } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

function FormTarea() {
  //accediendo al context para determinar si un proyecto esta activo o no
  const proyectosContext = useContext(proyectoContext)
  const { proyecto } = proyectosContext
  //accediendo al context de tareas para usarlo
  const tareasContext = useContext(tareaContext)
  const { 
    tareaseleccionada, 
    agregarTarea, 
    validarTarea, 
    errortarea, 
    obtenerTareas, 
    actualizarTarea 
  } = tareasContext

  // detecta el cambio de seleccion de tarea
  useEffect(() => {
    tareaseleccionada ? guardarTarea(tareaseleccionada) : guardarTarea({nombre:""})
  }, [tareaseleccionada])

  //state del fomulario
  const [ tarea, guardarTarea ] = useState({
    nombre:"",
  })

  //extraer el nombre del proyecto seleccionado
  const { nombre } = tarea

  //si no hay proyecto seleccionado
  if(!proyecto) return null

  const [ proyectoActual ] = proyecto

  //leer los valores del formulario (codigo a futuro)
  const handleChange = e => {
    guardarTarea({
      ...tarea,
      [ e.target.name ] : e.target.value
    })
  }

  const onSubmit = e => {

    e.preventDefault()

    //validar tarea
    if(nombre.trim() === "") {
      validarTarea();
      return
    }

    if (tareaseleccionada === null) {
      //agregando nueva tarea al state de tarea
      tarea.proyecto = proyectoActual._id
      agregarTarea(tarea)
    } else {
      actualizarTarea(tarea)
    }
    
    //obtener y filtrar las tareas del proyecto
    obtenerTareas(proyectoActual._id)

    //reiniciar form
    guardarTarea({
      nombre: ""
    })
  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        
        <div className="contenedor-input">
          <input 
            type="text" 
            className="input-text"
            placeholder="Nombre de Tarea..." 
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={
              tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"
            }
          />
        </div>

      </form>

      { errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}

    </div>
  )
}

export default FormTarea

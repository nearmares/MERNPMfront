import React, { useContext } from 'react'
import proyectoContext from "../../context/proyectos/proyectoContext"
import tareaContext from '../../context/tareas/tareaContext'


function Proyecto({ proyecto }) {
  //se obtiene el context de los proyectos
  const proyectosContext = useContext(proyectoContext)
  const { proyectoActual } = proyectosContext
  //se obtiene el context de las tareas
  const tareasContext = useContext(tareaContext)
  const { obtenerTareas } = tareasContext


  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = id => {
    proyectoActual(id)   // fija un proyecto actual
    obtenerTareas(id)    //filtra las tareas del proyecto
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={ () => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  )
}

export default Proyecto

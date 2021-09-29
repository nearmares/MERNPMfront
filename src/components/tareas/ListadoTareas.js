import React, { useContext } from 'react'
import Tarea from './Tarea'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import { CSSTransition, TransitionGroup } from "react-transition-group"

function ListadoTareas() {
  //acceder a context de proyectos para usarlo
  const proyectosContext = useContext(proyectoContext)
  const { proyecto, eliminarProyecto } = proyectosContext
  //acceder al context de tareas
  const tareasContext = useContext(tareaContext)
  const { tareasproyecto } = tareasContext
  console.log(tareasproyecto);

  //si NO hay proyecto seleccionado
  if(!proyecto) return <h2>Selecciona un Proyecto</h2>
  //else
  const [ proyectoActual ] = proyecto

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id)
  }

  return (
    <>
      <h2>Proyecto: {proyectoActual.nombre} </h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea"><p>No Hay Tareas</p></li>
        ):(
          <TransitionGroup>
            {tareasproyecto.map( tarea => (
              <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                <Tarea key={tarea._id} tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>

      <button type="button" className="btn btn-eliminar" onClick={ onClickEliminar }>Eliminar Proyecto &times;</button>
    </>
  )
}

export default ListadoTareas

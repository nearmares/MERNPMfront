import React, { useState, useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext' 

function NuevoProyecto() {

  //obteniendo el state del formulario
  const proyectosContext = useContext(proyectoContext)
  const { 
    formulario, 
    errorformulario, 
    mostrarFormulario, 
    agregarProyecto, 
    mostrarError 
  } = proyectosContext

  const [ proyecto, guardarProyecto,  ] = useState({
    nombre: ""
  })
  
  const { nombre } = proyecto
  
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitProyecto = e => {
    e.preventDefault();
    if(nombre==='') {
      mostrarError()
      return;
    }
    //agregar al state
    agregarProyecto(proyecto)
    //reinicia el form
    guardarProyecto({
      nombre: ""
    })
  }

  return (
    <>
      <button type="button" className="btn btn-block btn-primario" onClick={() => mostrarFormulario() }>
        Nuevo Proyecto
      </button>

      {
        formulario ? (
          <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
            <input type="text" className="input-text" placeholder="Nombre Proyecto" name="nombre" onChange={onChangeProyecto} value={nombre}/>
            <input type="submit" className="btn btn-primario btn-block" value="agregar proyecto"/>
          </form>
        ) : null
      }
      { errorformulario ? <p className="mensaje error">El Nombre del Proyecto es Obligatorio</p> : null }
    </>
  )
}

export default NuevoProyecto

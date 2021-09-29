import React, { useEffect, useContext } from 'react'
import AuthContext from '../../context/autenticacion/authContext'

function Barra() {

  //chequeamos el usuario autenticado
  const authContext = useContext(AuthContext)
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext

  useEffect(() => {
    usuarioAutenticado()
    //eslint-disable-next-line
  }, [])


  return (
    <header className="app-header">
      { 
        usuario ? (
          <p className="nombre-usuario">
            Bienvenido <span>{usuario.usuario.nombre}</span>
          </p>
        ) : null
      }
      <nav className="nav-principal">
        <button 
          className="btn btn-blank cerrar-sesion"
          style={{"color": "white"}}
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesión
        </button>
       
      </nav>
    
    </header>
  )
}

export default Barra

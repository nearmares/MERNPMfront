import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from '../../types'

const tareaReducer = ( state, action ) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload
        //el filtrado lo realiza el controller con la peticion
      }
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [action.payload, ...state.tareasproyecto ],
        errortarea: false,
      }
    case VALIDAR_TAREA:
      return {
        ...state,  
        errortarea: true
      }
      case ELIMINAR_TAREA:
        return {
          ...state,
          tareasproyecto: state.tareasproyecto.filter( tarea => (
            tarea._id !== action.payload
          ))
        }
      case ACTUALIZAR_TAREA:
        return {
          ...state,
          tareasproyecto: state.tareasproyecto.map(tarea => (
            tarea._id === action.payload._id ? action.payload: tarea)
          ),
          tareaseleccionada: null
        }
      case TAREA_ACTUAL:
        return {
          ...state,
          tareaseleccionada : action.payload
        }

    default:
      return state
  }
}

export default tareaReducer
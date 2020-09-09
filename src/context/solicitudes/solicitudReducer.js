import { OBTENER_SOLICITUDES_DPTO, ELIMINAR_SOLICITUD, OBTENER_SOLICITUDES, SOLICITUD_REGISTRADA, SOLICITUD_ERROR, ACTUALIZAR_SOLICITUD} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case ELIMINAR_SOLICITUD:
      return {
        ...state,
        solicitudes: state.solicitudes.filter((solicitud) => solicitud._id !== action.payload),
      };
    case OBTENER_SOLICITUDES:
      return {
        ...state,
        solicitudes: action.payload
      };
      case OBTENER_SOLICITUDES_DPTO:
      return {
        ...state,
        solicitudes: state.solicitudes.filter((solicitud) => solicitud.departamento === action.payload),
      };
    case SOLICITUD_REGISTRADA:
        return{...state,
        }
    case SOLICITUD_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
    case ACTUALIZAR_SOLICITUD:
      return{
        solicitudes: state.solicitudes.map(solicitud => solicitud === action.payload ? action.payload : solicitud)
      }
    default:
      return state;
  }
};

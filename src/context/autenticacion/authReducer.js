import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
        case REGISTRO_EXITOSO:
            return{...state,
                mensaje: action.payload.alerta
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                cargando: false,
                usuario: action.payload
            }
        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                cargando: false,
                mensaje: action.payload
            }
        case REGISTRO_ERROR:
            return{
                ...state,
                mensaje: action.payload
            }
    default: 
      return state;
  }
};

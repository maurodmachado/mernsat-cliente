import { ELIMINAR_CUENTA, OBTENER_CUENTAS } from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case ELIMINAR_CUENTA:
      return {
        ...state,
        cuentas: state.cuentas.filter((cuenta) => cuenta._id !== action.payload),
      };
    case OBTENER_CUENTAS:
      return {
        ...state,
        cuentas: action.payload
      };

    default:
      return state;
  }
};

import React, { useReducer } from "react";
import CuentaContext from "./cuentaContext";
import CuentaReducer from "./cuentaReducer";
import { OBTENER_CUENTAS, ELIMINAR_CUENTA} from "../../types";
import clienteAxios from "../../config/axios";

const CuentaState = (props) => {
 

  const initialState = {
    cuentas: {usuarios: []}
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(CuentaReducer, initialState);

  //Funciones
  //Obtener las cuentas
  const obtenerCuentas = async () => {
    try {
      const respuesta = await clienteAxios.get("/api/usuarios");
      dispatch({
        type: OBTENER_CUENTAS,  
        payload: respuesta.data.usuarios
      });

    } catch (error) {
      console.log(error);
    }
    
  };

  //Eliminar cuenta por id
  const eliminarCuenta = async (id) => {
    try {
    await clienteAxios.delete(`api/usuarios/${id}`)
      dispatch({
        type: ELIMINAR_CUENTA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <CuentaContext.Provider
      value={{ cuentas: state.cuentas, usuarios: state.usuarios, obtenerCuentas, eliminarCuenta }}
    >
      {props.children}
    </CuentaContext.Provider>
  );
};

export default CuentaState;

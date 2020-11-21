import React, { useReducer } from "react";
import SolicitudContext from "./solicitudContext";
import SolicitudReducer from "./solicitudReducer";
import {OBTENER_SOLICITUDES, ELIMINAR_SOLICITUD, ELIMINAR_SOLICITUDES, SOLICITUD_ERROR, SOLICITUD_REGISTRADA, OBTENER_SOLICITUDES_DPTO, ACTUALIZAR_SOLICITUD} from "../../types";
import clienteAxios from "../../config/axios";

const SolicitudState = (props) => {
 

  const initialState = {
    solicitudes: []
  };

  //Crear dispatch y state
  const [state, dispatch] = useReducer(SolicitudReducer, initialState);

  //Funciones
  //Obtener las solicitudes
  const obtenerSolicitudes = async (departamento) => {
      
    try {
        
        const respuesta = await clienteAxios.get("/api/solicitudes");
        const solicitudes = respuesta.data.solicitudes.filter(sol => sol.estado !== 'archivada');

    dispatch({
              type: OBTENER_SOLICITUDES,
              payload: solicitudes
            });
    if(departamento !== 'Informatica'){
    
          
          dispatch({
              type: OBTENER_SOLICITUDES_DPTO,
              payload: departamento
            });
  

    }
    } catch (error) {
      console.log(error);
    }
    
  };

  const obtenerArchivadas = async () => {
      
    try {
        
        const respuesta = await clienteAxios.get("/api/solicitudes");
        const solicitudes = respuesta.data.solicitudes.filter(sol => sol.estado === 'archivada');
        
    dispatch({
              type: OBTENER_SOLICITUDES,
              payload: solicitudes
            });

    } catch (error) {
      console.log(error);
    }
    
  };

//Eliminar todas las solicitudes archivadas
const eliminarTodas = async () => {
  try {

  await clienteAxios.delete(`api/solicitudes`)
    
    dispatch({
      type: ELIMINAR_SOLICITUDES,
      payload: 'archivada',
    });
  } catch (error) {
    console.log(error);
  }
  
};
  

  //Eliminar solicitud por id
  const eliminarSolicitud = async (id) => {
    try {

    await clienteAxios.delete(`api/solicitudes/${id}`)
    
      dispatch({
        type: ELIMINAR_SOLICITUD,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
    
  };
  
  //Actualiza una solicitud
  const actualizarSolicitud = async solicitud => {
    try {
      
      const respuesta = await clienteAxios.put(`api/solicitudes/${solicitud._id}`);
      
      dispatch({
        type: ACTUALIZAR_SOLICITUD,
        payload: respuesta.data.solicitud._id
      })
    } catch (error) {
        console.log(error)
    }
    
  }

  //Actualiza una solicitud
  const archivarSolicitud = async solicitud => {
    try {
      
      const respuesta = await clienteAxios.put(`api/solicitudes/archivar/${solicitud._id}`);
      
      dispatch({
        type: ACTUALIZAR_SOLICITUD,
        payload: respuesta.data.solicitud._id
      })
    } catch (error) {
        console.log(error)
    }
    
  }

  //Se registra una solicitud
  const registrarSolicitud = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("api/solicitudes", datos);
      dispatch({
        type: SOLICITUD_REGISTRADA,
        payload: respuesta.data,
      });
      return true;
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: SOLICITUD_ERROR,
        payload: alerta,
      });
      return false;
    }
  };
  

  return (
    <SolicitudContext.Provider
      value={{ solicitudes: state.solicitudes, actualizarSolicitud, obtenerSolicitudes, obtenerArchivadas, archivarSolicitud, eliminarSolicitud, eliminarTodas, registrarSolicitud }}
    >
      {props.children}
    </SolicitudContext.Provider>
  );
};

export default SolicitudState;

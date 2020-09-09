import React, { useContext, useEffect } from "react";

import SolicitudContext from "../../context/solicitudes/solicitudContext";
import AuthContext from "../../context/autenticacion/authContext";
import AlertaContext from "../../context/alertas/alertaContext";

export const Solicitud = ({ solicitud }) => {
  const solicitudContext = useContext(SolicitudContext);
  const { eliminarSolicitud, actualizarSolicitud, mensaje } = solicitudContext;

  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

    //Extraer los valores de alerta
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
  //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);

  const cambiarEstado = sol=> {
    if(sol.estado){
      sol.estado = false;
  }else{
    sol.estado = true;
  }
  actualizarSolicitud(sol)
  
   }
   const eliminarRequest = (id) => {
    eliminarSolicitud(id);
    mostrarAlerta("Solicitud eliminada", "alerta-error");
  };

  return (
    <>
      <tr>
        <td><h4>{solicitud.departamento}</h4></td>
        <td>{solicitud.nombre_solicitante}</td>
        <td>{solicitud.descripcion}</td>
        <td>{usuario != null ? (
            usuario.departamento === "Informatica" ? (
              <button
                type="button"
                className={solicitud.estado ? "completo" : "incompleto"}
                onClick={() => cambiarEstado(solicitud)}
              >
                {solicitud.estado ? "Atendida" : "Sin atender"}
              </button>
            ) : (
              <button
                type="button"
                className={solicitud.estado ? "completo" : "incompleto"}
                
              >
                {solicitud.estado ? "Atendida" : "Sin atender"}
              </button>
            )
          ) : (
            ""
          )}</td>
          <td><div className="acciones">
          <button
            type="button"
            className="btn btn-primario"
            onClick={() => {
              eliminarRequest(solicitud._id);
            }}
          >
            Eliminar
          </button>
        </div></td>
      </tr>
      {alerta ? (
              <div className={`alerta-abajo ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}
    </>
  );
};

import React, { useContext, useEffect } from "react";

import SolicitudContext from "../../context/solicitudes/solicitudContext";
import AuthContext from "../../context/autenticacion/authContext";
import AlertaContext from "../../context/alertas/alertaContext";

export const Solicitud = ({ solicitud }) => {
  const solicitudContext = useContext(SolicitudContext);
  const {
    eliminarSolicitud,
    actualizarSolicitud,
    archivarSolicitud,
    mensaje,
  } = solicitudContext;

  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  //Extraer los valores de alerta
  const alertaContext = useContext(AlertaContext);
  const { mostrarAlerta } = alertaContext;
  //En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);

  const cambiarEstado = (sol) => {
    if (sol.estado === "true") {
      console.log("cambiando a falso");
      sol.estado = "false";
    } else {
      console.log("cambiando a true");
      sol.estado = "true";
    }
    actualizarSolicitud(sol);
  };
  const eliminarRequest = (id) => {
    eliminarSolicitud(id);
    mostrarAlerta("Solicitud eliminada", "alerta-error");
  };

  const archivarRequest = (sol) => {
    sol.estado = "archivada";

    archivarSolicitud(sol);
    mostrarAlerta("Solicitud archivada", "alerta-archivada");
  };

  const desarchivarRequest = (sol) => {
    sol.estado = "false";

    archivarSolicitud(sol);
    mostrarAlerta("Solicitud desarchivada", "alerta-ok");
  };

  return (
    <>
      {solicitud.estado !== "archivada" ? (
        <tr>
          <td className="limite">
            <h4>{solicitud.departamento}</h4>
          </td>
          <td className="limite">{solicitud.nombre_solicitante}</td>
          <td>{solicitud.descripcion}</td>
          <td className="limite">
            {usuario != null ? (
              usuario.departamento === "Informatica" ? (
                <button
                  type="button"
                  className={
                    solicitud.estado === "true" ? "btn-estado completo" : "btn-estado incompleto"
                  }
                  onClick={() => cambiarEstado(solicitud)}
                >
                  {solicitud.estado === "true"
                    ? (<div><i className="fas fa-check-circle"></i> Atendida</div> )
                    : solicitud.estado === "false"
                    ? (<div><i className="far fa-times-circle"></i> Sin atender</div> )
                    : ""}
                </button>
              ) : (
                <button
                  type="button"
                  className={
                    solicitud.estado === "true" ? "btn-estado completo" : "btn-estado incompleto"
                  }
                >
                  {solicitud.estado === "true"
                    ? (<i className="fas fa-check-circle">Atendida</i> )
                    : solicitud.estado === "false"
                    ? (<div><i className="far fa-times-circle"></i> Sin atender</div> )
                    : ""}
                </button>
              )
            ) : (
              ""
            )}
          </td>
          <td>
            {usuario != null ? (
              usuario.departamento === "Informatica" ? (
                <button
                  type="button"
                  className="btn btn-primario acciones"
                  onClick={() => {
                    archivarRequest(solicitud);
                  }}
                >
                <i className="fas fa-archive"></i> Archivar
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primario acciones"
                  onClick={() => {
                    eliminarRequest(solicitud._id);
                  }}
                >
                  <i className="far fa-trash-alt"></i> Eliminar
                </button>
              )
            ) : (
              ""
            )}
          </td>
        </tr>
      ) : (
        <tr>
          <td className="limite">
            <h4>{solicitud.departamento}</h4>
          </td>
          <td className="limite">{solicitud.nombre_solicitante}</td>
          <td>{solicitud.descripcion}</td>
          <td className="limite">
            {usuario != null ? (
              <button type="button" className="btn-estado archivada">
                Archivada
              </button>
            ) : (
              ""
            )}
          </td>
          <td>
            {usuario != null ? (
              <button
                type="button"
                className="btn btn-primario acciones"
                onClick={() => {
                  desarchivarRequest(solicitud);
                }}
              >
                <i className="fas fa-clipboard-list"></i> Desarchivar
              </button>
            ) : (
              ""
            )}
            {" "}
            { 
              <button
                type="button"
                className="btn btn-primario acciones"
                onClick={() => {
                  eliminarRequest(solicitud._id);
                }}
              >
                <i className="far fa-trash-alt"></i> Eliminar
              </button>
            }
          </td>
        </tr>
      )}
    </>
  );
};

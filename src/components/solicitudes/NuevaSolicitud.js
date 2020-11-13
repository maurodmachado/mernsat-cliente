import React, { useState, useContext, useEffect } from "react";
import { Sidebar } from "../layout/Sidebar";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import SolicitudContext from "../../context/solicitudes/solicitudContext";
import { SidebarClientes } from "../layout/SidebarClientes";
import { Barra } from "../layout/Barra";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export const NuevaSolicitud = (props) => {
  //Extraer los valores de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  let departamento = "";
  let userId = "";
  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  if (usuario !== null) {
    departamento = usuario.departamento;
    userId = usuario._id;
  }
  const solicitudContext = useContext(SolicitudContext);
  const { registrarSolicitud } = solicitudContext;

  //State iniciar sesion
  const [solicitud, setSolicitud] = useState({
    nombre_solicitante: "",
    descripcion: "",
    departamento: "",
    estado: "false",
  });

  const { nombre_solicitante, descripcion, estado } = solicitud;

  //Accion al cambiar algun campo del login
  const onChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value,
    });
  };

  //Accion al enviar formulario del login
  const onSubmit = async (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (nombre_solicitante.trim() === "" || descripcion.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Seleccionar un departamento
    if (departamento === "") {
      mostrarAlerta("Seleccione un departamento", "alerta-error");
      return;
    }
    //Pasarlo al action
    const ok = await registrarSolicitud({
      nombre_solicitante,
      userId,
      descripcion,
      departamento,
    });
    if (ok) {
      mostrarAlerta("Solicitud creada", "alerta-ok");
    } else {
      mostrarAlerta("Error al crear solicitud", "alerta-error");
    }

    socket.emit("message", {
      nombre_solicitante,
      departamento,
      descripcion,
      estado,
    });

    setSolicitud({ nombre_solicitante: "", descripcion: "" });
  };

  return (
    <div className="contenedor-app">
      {usuario != null ? (
        departamento === "Informatica" ? (
          <Sidebar />
        ) : (
          <SidebarClientes />
        )
      ) : (
        ""
      )}
      <div className="seccion-principal">
        <Barra />

        {alerta ? (
          <div className={`alerta-abajo ${alerta.categoria}`}>
            {" "}
            {alerta.msg}{" "}
          </div>
        ) : null}
        <main>
          <div className="formulario">
            <br />
            <h2 className="title-black-background">Realizar una solicitud</h2>
            <br />
            <form onSubmit={onSubmit}>
              <div className="contenedor-input">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Nombre solicitante"
                  name="nombre_solicitante"
                  value={nombre_solicitante}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="contenedor-input">
                <input
                  type="text"
                  className="input-text"
                  name="departamento"
                  contentEditable="false"
                  value={departamento}
                  onChange={() => {}}
                />
              </div>
              <br />
              <div className="contenedor-textarea">
                <textarea
                  type="text"
                  className="input-text"
                  placeholder="Descripcion del incoveniente"
                  value={descripcion}
                  name="descripcion"
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="contenedor-input">
               <button
                  type="submit"
                  className="btn btn-block btn-primario">
               <i className="far fa-paper-plane"></i> Realizar solicitud
                 </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

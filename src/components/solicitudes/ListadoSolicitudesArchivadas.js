import React, { useContext, useState, useEffect } from "react";
import { Sidebar } from "../layout/Sidebar";
import { SidebarClientes } from "../layout/SidebarClientes";
import { Barra } from "../layout/Barra";
import SolicitudContext from "../../context/solicitudes/solicitudContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Solicitud } from "./Solicitud";
import io from 'socket.io-client'
import AlertaContext from "../../context/alertas/alertaContext";

const socket = io.connect('http://localhost:4000')

export const ListadoSolicitudesArchivadas = () => {
  
  let departamento = "";
  const [// eslint-disable-next-line 
    listado
    , setListado] = useState({listado: []})
  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  //Extraer los valores de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  
  const solicitudContext = useContext(SolicitudContext);
  const { solicitudes, obtenerArchivadas, eliminarTodas, mensaje } = solicitudContext;
  
 
//En caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje]);
  useEffect(() => {
    usuarioAutenticado();
    
  }, [usuarioAutenticado]);
  if (usuario !== null) {
    departamento = usuario.departamento;
  }
  
  
  const deleteAll = () => {
    eliminarTodas();
  }
  
  useEffect(() => {
    obtenerArchivadas();
    socket.on('solicitud', ({ nombre_solicitante, departamento, descripcion, estado }) => {
      setListado([solicitudes, { nombre_solicitante, departamento, descripcion, estado }])
    })
  }, [obtenerArchivadas, solicitudes])

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
        <main>
          <div className="formulario-listado-solicitudes">
            <br />
            {usuario != null ? (
                <h2>Solicitudes archivadas</h2> 
              ) : (
              ""
            )}
            
          </div>
          {<div className="delete-all">
            <button type="button"
                className="btn btn-primario alargado"
                onClick={() => {deleteAll()}}> 
                <i className="far fa-trash-alt"></i> Eliminar archivadas</button></div>}
          
          <div className="listado-cuentas">
            {solicitudes.length === 0 ? (
              <h2>No hay solicitudes archivadas</h2>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Departamento</th>
                    <th>Solicitante</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.length === 0
                    ? ""
                    : solicitudes.map((solicitud) => (
                        <Solicitud solicitud={solicitud} key={solicitud._id} />
                      ))}
                </tbody>
              </table>
              
            )}
            {alerta ? (
              <div className={`alerta-abajo ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
};

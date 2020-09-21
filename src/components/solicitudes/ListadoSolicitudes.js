import React, { useContext, useState, useEffect } from "react";
import { Sidebar } from "../layout/Sidebar";
import { SidebarClientes } from "../layout/SidebarClientes";
import { Barra } from "../layout/Barra";
import SolicitudContext from "../../context/solicitudes/solicitudContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Solicitud } from "./Solicitud";
import io from 'socket.io-client'

const socket = io.connect('http://localhost:4000')

export const ListadoSolicitudes = () => {
  let departamento = "";
  const [listado,  setListado] = useState({listado: []})
  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;

  useEffect(() => {
    usuarioAutenticado();
    
  }, [usuarioAutenticado]);
  if (usuario !== null) {
    departamento = usuario.departamento;
  }
  
  const solicitudContext = useContext(SolicitudContext);
  const { solicitudes: solicituds, obtenerSolicitudes } = solicitudContext;
  const solicitudes = Array.from(solicituds);
  
  
  useEffect(() => {
    obtenerSolicitudes(departamento);
    console.log('Se recarga solicitudes');
    socket.on('message', ({ nombre_solicitante, departamento, descripcion, estado }) => {
      setListado([solicituds, { nombre_solicitante, departamento, descripcion, estado }])
    })
  })

  return (
    <div className="contenedor-app">
      {usuario != null ? (
        usuario.departamento === "Informatica" ? (
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
              usuario.departamento === "Informatica" ? (
                <h2>Solicitudes por atender</h2>
              ) : (
                <h2>Solicitudes realizadas</h2>
              )
            ) : (
              ""
            )}
          </div>
          <div className="listado-cuentas">
            {solicitudes.length === 0 ? (
              <h2>No hay solicitudes realizadas</h2>
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
          </div>
        </main>
      </div>
    </div>
  );
};

import React, { useContext, useEffect } from "react";
import { Sidebar } from "../layout/Sidebar";
import { SidebarClientes } from "../layout/SidebarClientes";
import { Barra } from "../layout/Barra";
import SolicitudContext from "../../context/solicitudes/solicitudContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Solicitud } from "./Solicitud";

export const ListadoSolicitudes = () => {
  let departamento = "";

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
  useEffect(() => {
    obtenerSolicitudes(departamento);
    // eslint-disable-next-line
  }, []);

  const solicitudes = Array.from(solicituds);
  
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

import React, { useContext, useEffect } from "react";
import { Sidebar } from "../layout/Sidebar";
import { SidebarClientes } from "../layout/SidebarClientes";
import { Barra } from "../layout/Barra";
import { Cuenta } from "./Cuenta";
import CuentaContext from "../../context/cuentas/cuentaContext";
import AuthContext from "../../context/autenticacion/authContext";

export const EliminarCuenta = () => {
  let departamento = "";

  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado } = authContext;
  
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);
  if (usuario !== null) {
    departamento = usuario.departamento;
  }

  const cuentaContext = useContext(CuentaContext);
  const { cuentas:accounts, obtenerCuentas } = cuentaContext;
  useEffect(() => {
    obtenerCuentas();
  }, [obtenerCuentas])

  const cuentas = Array.from(accounts)
  

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
            <h2>Listado de cuentas</h2>
          </div>
          <div className="listado-cuentas-title">
            <h2>Usuario</h2>
            <h2>Departamento</h2>
            <h2>Acciones</h2>
          </div>
          <ul className="listado-cuentas">
            {cuentas === undefined ? (
              <li className="elemento">
                <p>No hay cuentas</p>
              </li>
            ) : (
              cuentas.map((cuenta) => (
                <Cuenta cuenta={cuenta} key={cuenta._id} />
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  );
};

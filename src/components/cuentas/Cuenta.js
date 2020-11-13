import React, { useContext, useEffect } from "react";

import CuentaContext from "../../context/cuentas/cuentaContext";
import AlertaContext from "../../context/alertas/alertaContext";

export const Cuenta = ({ cuenta }) => {

  const cuentaContext = useContext(CuentaContext);
  const { eliminarCuenta, mensaje } = cuentaContext;

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
  const eliminarAccount = (id) => {
    eliminarCuenta(id);
    mostrarAlerta("Cuenta eliminada", "alerta-error");
  };

  return (
    <>
      <li className="elemento sombra">
        <p> {cuenta.usuario} </p> <p>{cuenta.departamento}</p>
        <div>
          
            <button
              type="button"
              className="btn btn-primario acciones"
              onClick={() => {
                eliminarAccount(cuenta._id);
              }}
            >
              <i className="fas fa-user-times"></i> Eliminar
            </button>
          </div>
        
        {alerta ? (
              <div className={`alerta-abajo ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}
      </li>
    </>
  );
};

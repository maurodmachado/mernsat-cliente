import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside>
      <h1>
      <span role="img" aria-label="computer">🖥️</span> MERN <span>SAT</span>
      </h1>
      <br/>
      <div className="solicitudes">
        <h2>Solicitudes</h2>
        <br/>
      </div>
      <Link to="/nuevasolicitud">
        <button type="text" className="btn btn-primario btn-block">
          Realizar solicitud
        </button>
      </Link>
      <br/>
      <Link to="/listadosolicitudes">
        <button type="text" className="btn btn-primario btn-block"  >
          Ver solicitudes
        </button>
      </Link>
      <br/>
      <Link to="/listadosolicitudesarchivadas">
        <button type="text" className="btn btn-primario btn-block"  >
          Ver solicitudes archivadas
        </button>
      </Link>
      <div className="solicitudes">
      <br/>
        <h2>Cuentas</h2>
        <br/>
        <Link to="/crearcuenta">
          <button type="text" className="btn btn-primario btn-block">
            Nueva cuenta
          </button>
        </Link>
        <br/>
        <Link to="/eliminarcuenta">
          <button type="text" className="btn btn-primario btn-block">
            Eliminar cuenta
          </button>
        </Link>
      </div>
    </aside>
  );
};

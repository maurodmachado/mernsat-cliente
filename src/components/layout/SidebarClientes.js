import React from "react";
import { Link } from "react-router-dom";

export const SidebarClientes = () => {
  return (
    <aside>
      <h1>
      <span role="img" aria-label="computer">🖥️</span> MERN <span>SAT</span><span role="img" aria-label="computer">🖥️</span>
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
      <div className="solicitudes">
        <h2>Mis Solicitudes</h2>
        <br/>
      </div>
      <Link to="/listadosolicitudes">
        <button type="text" className="btn btn-primario btn-block">
          Ver mis solicitudes
        </button>
      </Link>
    </aside>
  );
};

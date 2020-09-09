import React from "react";
import { Link } from "react-router-dom";

export const SidebarClientes = () => {
  return (
    <aside>
      <h1>
        MERN <span>SAT</span>
      </h1>
      <br/>
      <div className="proyectos">
        <h2>Solicitudes</h2>
        <br/>
      </div>
      <Link to="/nuevasolicitud">
        <button type="text" className="btn btn-primario btn-block">
          Realizar solicitud
        </button>
      </Link>
      
      <div className="proyectos">
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

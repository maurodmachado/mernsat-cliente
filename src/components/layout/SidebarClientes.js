import React from "react";
import { Link } from "react-router-dom";

export const SidebarClientes = () => {
  return (
    <aside>
      <h1>
      <i className="fas fa-laptop-medical"></i>  MERN <span>SAT</span> <i className="fas fa-laptop-medical"></i> 
      </h1>
      <br/>
      <div className="solicitudes">
        <h2>Solicitudes</h2>
        <br/>
      </div>
      <Link to="/nuevasolicitud">
        <button type="text" className="btn btn-primario btn-block">
        <i className="far fa-paper-plane floatleft"></i> Realizar solicitud
        </button>
      </Link>
      <br/>
      <div className="solicitudes">
        <h2>Mis Solicitudes</h2>
        <br/>
      </div>
      <Link to="/listadosolicitudes">
        <button type="text" className="btn btn-primario btn-block">
        <i className="far fa-list-alt floatleft"></i> Ver solicitudes
        </button>
      </Link>
    </aside>
  );
};

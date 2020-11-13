import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
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
      <Link to="/listadosolicitudes">
        <button type="text" className="btn btn-primario btn-block"  >
        <i className="far fa-list-alt floatleft"></i> Ver solicitudes
        </button>
      </Link>
      <br/>
      <Link to="/listadosolicitudesarchivadas">
        <button type="text" className="btn btn-primario btn-block"  >
        <i className="fas fa-archive floatleft"></i> Ver solicitudes archivadas
        </button>
      </Link>
      <div className="solicitudes">
      <br/>
        <h2>Cuentas</h2>
        <br/>
        <Link to="/crearcuenta">
          <button type="text" className="btn btn-primario btn-block">
          <i className="fas fa-user-plus floatleft"></i> Nueva cuenta
          </button>
        </Link>
        <br/>
        <Link to="/eliminarcuenta">
          <button type="text" className="btn btn-primario btn-block">
          <i className="fas fa-users-cog floatleft"></i> Eliminar cuenta
          </button>
        </Link>
      </div>
    </aside>
  );
};

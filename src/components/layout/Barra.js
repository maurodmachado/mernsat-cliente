import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/authContext";

export const Barra = () => {
  //Extraer informacion de autenticacion
  const authContext = useContext(AuthContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  useEffect(() => {
      usuarioAutenticado();
    // eslint-disable-next-line
  }, [])
  return (
    <header className="app-header">
        {usuario ? <p className="nombre-usuario">
        Hola <span>{usuario.usuario}</span> del departamento 
        <span> {usuario.departamento}</span>
      </p> : null}
      
      <nav className="nav-principal">
        <button className="btn btn-blanc cerrar-sesion" 
        onClick={() => cerrarSesion()}
        >Cerrar Sesión</button>
      </nav>
    </header>
  );
};

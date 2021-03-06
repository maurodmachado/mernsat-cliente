import React, { useState, useContext, useEffect } from "react";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

export const Login = (props) => {

  //Extraer los valores de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //En caso de que el password o usuario no exista
  useEffect(() => {
    if(autenticado) {
      props.history.push('/nuevasolicitud')
    }
    if(mensaje){
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
  // eslint-disable-next-line
}, [mensaje, autenticado, props.history,])

  //State iniciar sesion
  const [user, setUser] = useState({
    usuario: "",
    password: "",
  });

  //Extraer el usuario
  const { usuario, password } = user;

  //Accion al cambiar algun campo del login
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  //Accion al enviar formulario del login
  const onSubmit = (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (usuario.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //Pasarlo al action
    iniciarSesion({usuario, password});
  };

  return (
    <>
    <div className="top-header">
    <h1><i className="fas fa-laptop-medical"></i> Solicitud de Asistencia Técnica <i className="fas fa-laptop-medical"></i></h1>
    
    </div>
    <div className="form-login">
      
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="usuario"> <i className="fas fa-user"></i> Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              value={usuario}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password"><i className="fas fa-key"></i> Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <button
            type="submit"
            className="btn btn-primario btn-block">
            <i className="fas fa-sign-in-alt"></i> Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

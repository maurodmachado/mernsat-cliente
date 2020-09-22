import React, { useState, useContext } from "react";
import { Sidebar } from "../layout/Sidebar";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Barra } from "../layout/Barra";

export const CrearCuenta = (props) => {
  //Extraer los valores de alerta
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const {  registrarUsuario } = authContext;

  //State iniciar sesion
  const [user, setUser] = useState({
    usuario: "",
    password: "",
    confirmar: "",
    departamento: "",
  });

  const { usuario, password, confirmar, departamento } = user;

  //Accion al cambiar algun campo del login
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  //Accion al enviar formulario del login
  const onSubmit = async (e) => {
    e.preventDefault();

    //Validar que no haya campos vacios
    if (
      usuario.trim() === "" ||
      password.trim() === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    
    //Password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de almenos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Los 2 password son iguales
    if (password !== confirmar) {
      mostrarAlerta("Los passwords no coinciden", "alerta-error");
      return;
    }

    //Seleccionar un departamento
    if (departamento === "") {
      mostrarAlerta("Seleccione un departamento", "alerta-error");
      return;
    }

    //Pasarlo al action
      const ok = await registrarUsuario({
        usuario,
        password,
        departamento,
      })
      
      if(ok){
        mostrarAlerta("Usuario creado", "alerta-ok");
      }else{
        mostrarAlerta("Usuario ya existente", "alerta-error");
      }
    
  
      
  };

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
      <Barra/>
        <main>
          <div className="form-usuario">
            {alerta ? (
              <div className={`alerta-abajo ${alerta.categoria}`}> {alerta.msg} </div>
            ) : null}
            <div className="contenedor-form sombra-dark">
              <h1>Crear una cuenta</h1>
              <form onSubmit={onSubmit}>
                <div className="campo-form">
                <label htmlFor="usuario"> <span role="img" aria-label="usuario" >👤</span> Usuario</label>
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
                <label htmlFor="password"><span role="img" aria-label="password" >🔑</span> Password</label>
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
                <label htmlFor="confirmar"><span role="img" aria-label="password" >🔑</span> Confirmar</label>
                  <input
                    type="password"
                    id="confirmar"
                    name="confirmar"
                    placeholder="Repite Password"
                    value={confirmar}
                    onChange={onChange}
                  />
                </div>
                <div className="campo-form">
                <label htmlFor="departamento"><span role="img" aria-label="departamento" >⚖️</span> Departamento</label>
                <select id="departamento" name="departamento" value={departamento} onChange={onChange}>
                  <option value="" >
                    Seleccione departamento
                  </option>
                  <option value="Informatica">Informatica</option>
                  <option value="Personal">Personal</option>
                  <option value="Contable">Contable</option>
                  <option value="Fiscalia">Fiscalia</option>
                </select>
                </div>
                <div className="campo-form">
                  <input
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Crear cuenta"
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

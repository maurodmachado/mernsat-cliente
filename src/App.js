import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { CrearCuenta } from "./components/cuentas/CrearCuenta";
import { EliminarCuenta } from "./components/cuentas/EliminarCuenta";
import { NuevaSolicitud } from "./components/solicitudes/NuevaSolicitud";
import { ListadoSolicitudes } from "./components/solicitudes/ListadoSolicitudes";
import AlertaState from "./context/alertas/alertaState";
import CuentaState from "./context/cuentas/cuentaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/rutas/RutaPrivada";
import RutaPrivadaClientes from "./components/rutas/RutaPrivadaClientes";
import SolicitudState from "./context/solicitudes/solicitudState";
//Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
function App() {
  return (
    
    <CuentaState>
      <AlertaState>
        <AuthState>
          <SolicitudState>
          <Router>
            <Switch>
              <RutaPrivadaClientes exact path="/crearcuenta" component={CrearCuenta} />
              <RutaPrivadaClientes
                exact
                path="/eliminarcuenta"
                component={EliminarCuenta}
              />
              <RutaPrivada
                exact
                path="/nuevasolicitud"
                component={NuevaSolicitud}
              />
              <RutaPrivada
                exact
                path="/listadosolicitudes"
                component={ListadoSolicitudes}
              />
              <Route path="/" component={Login} />
            </Switch>
          </Router>
          </SolicitudState>
        </AuthState>
      </AlertaState>
    </CuentaState>
  );
}

export default App;

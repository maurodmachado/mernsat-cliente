import React, { useContext, useEffect } from 'react';
import { Route, Redirect} from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'

const RutaPrivadaClientes = ({component: Component,...props}) => {
    
    const authContext = useContext(AuthContext);
    const {usuario, autenticado, cargando, usuarioAutenticado} = authContext;
    let departamento = '';
    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])
    if(usuario !== null){
        departamento = usuario.departamento;
    }
    return (
        <Route {...props} render={props => (departamento !== "Informatica") || (!autenticado && !cargando) ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }

        />
    );
}
export default RutaPrivadaClientes
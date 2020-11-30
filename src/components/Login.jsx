import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ingresoUsuarioAccion } from '../redux/usuarioDucks'

const Login = (props) => {


    const dispatch= useDispatch()
    const loading=useSelector(store=>store.usuario.loading)
    const activo=useSelector(store=>store.usuario.activo)
    React.useEffect(() => {
        if(activo){
            props.history.push('/')
        }
    }, [activo,props.history])
    return (
        <div className='mt-5 text-center'>
            <h3>Ingreso con Goggle</h3>
            <hr />
            <button className="btn btn-dark"
            onClick={()=>dispatch(ingresoUsuarioAccion())}
            disabled={loading}
            >Acceder</button>
        </div>
    )
}

export default withRouter(Login)

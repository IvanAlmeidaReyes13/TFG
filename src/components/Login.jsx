import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ingresoUsuarioAccion,ingresoUsuarioFacebookAccion } from '../redux/usuarioDucks'
import FacebookLogin from 'react-facebook-login';
const Login = (props) => {


    const dispatch= useDispatch()
    const loading=useSelector(store=>store.usuario.loading)
    const activo=useSelector(store=>store.usuario.activo)
    React.useEffect(() => {
        if(activo){
            props.history.push('/')
        }
    }, [activo,props.history])

    const respuestaFacebook = (respuesta) => {
        dispatch(ingresoUsuarioFacebookAccion(respuesta))
      }

    return (
        <div className='mt-5 text-center'>
            <h3>Ingreso con Google</h3>
            
            <button className="btn btn-dark"
            onClick={()=>dispatch(ingresoUsuarioAccion())}
            disabled={loading}
           
            >Acceder con <span style={{color:'#4285F4'}}>G</span><span style={{color:'#DB4437'}}>o</span><span style={{color:'#F4B400'}}>o</span><span style={{color:'#4285F4'}}>g</span><span style={{color:'#0F9D58'}}>l</span><span style={{color:'#DB4437'}}>e</span></button>
        
            <hr/>
        <br></br>
        <h3>Ingreso con Facebook</h3>
        <FacebookLogin
        appId=""
        autoLoad={false}
        fields="name,email,picture" 
        callback={respuestaFacebook} 
        textButton='Acceder con Facebook'
        cssClass='iconoFacebook' />
        </div>
    )
}

export default withRouter(Login)

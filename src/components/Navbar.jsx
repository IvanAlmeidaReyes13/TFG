import React from 'react'
import { Link,NavLink,withRouter } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import{cerrarSesionAccion} from '../redux/usuarioDucks'

const Navbar = (props) => {

    const dispatch = useDispatch()
    const activo  = useSelector(store=>store.usuario.activo)
    const cerrarSesion=()=>{
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }
    return (
        <div className='navbar navbar-dark bg-dark'>
            <Link className='navbar-brand' to='/'>TRMA</Link>
            <div className="d-flex">
                {
                    activo?(
                        <>
                        <NavLink className='btn btn-dark mr-2' to='/' exact>Inicio</NavLink>
                        <NavLink className='btn btn-dark mr-2' to='/perfil' exact>Perfil</NavLink>
                        <NavLink className='btn btn-dark mr-2' to='/genero' exact>Genero</NavLink>
                        <NavLink className='btn btn-dark mr-2' to='/KeyWords' exact>Palabras clave</NavLink>
                        <button
                        onClick={()=>cerrarSesion()}
                        className="btn btn-danger btn-sm mr-2">Cerrar Sesión</button>

                        </>
                    ):(

                        <NavLink className='btn btn-dark mr-2' to='/login' exact>Login</NavLink>
                    )
                }
            </div>
        </div>
    )
}

export default withRouter(Navbar)

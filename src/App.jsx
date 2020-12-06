
import React from 'react'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
}from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Perfil from './components/Perfil';
import {auth} from './components/firebase'
import Peliculas from './components/Peliculas';
import Genero from './components/Genero';
import KeyWords from './components/KeyWords';


function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchUser=()=>{
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })

    }
    fetchUser()
}, [])

const RutaPrivada = ({component,path,...rest})=>{
  if(localStorage.getItem('usuario')){
    const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
    
    if(usuarioStorage.uid===firebaseUser.uid){
      return <Route component={component} path={path} {...rest} />

    }else{
      return <Redirect to='/login' {...rest}/>   
    }
  }
  else{
   return <Redirect to='/login' {...rest}/>
  } 
}

  return firebaseUser!==false? (
    <Router>
      <div className='container-fluid mt-2 ml-2' id='general'>

        <Navbar />
      <Switch>
        <RutaPrivada component={Peliculas} path="/" exact />
        <RutaPrivada component={Perfil} path="/perfil" exact />
        <RutaPrivada component={Genero} path="/genero" exact />
        <RutaPrivada component={KeyWords} path="/KeyWords" exact />
        <Route component={Login} path="/Login" exact />
      </Switch>
      </div>
    </Router>
   
  ):(<div>Cargando...</div>)
}

export default App;

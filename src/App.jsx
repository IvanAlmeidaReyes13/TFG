import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { auth } from "./components/firebase";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Perfil from "./components/Perfil";
import Peliculas from "./components/Peliculas";
import Genero from "./components/Genero";
import KeyWords from "./components/KeyWords";
import Buscar from "./components/Buscar";

import ParticlesBg from "particles-bg";
function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);
//determina si existe un usuario en la bbdd
  React.useEffect(() => {
    const fetchUser = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setFirebaseUser(user);
        } else {
          setFirebaseUser(null);
        }
      });
    };
    fetchUser();
  }, []);
//establece como rutas privadas cuando no hay un usuario registrado en el localStorage
  const RutaPrivada = ({ component, path, ...rest }) => {
    if (localStorage.getItem("usuario")) {
      const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
//si el que se consulta en el storage y la bbdd coninciden se permite el acceso a las rutas privadas
      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component={component} path={path} {...rest} />;
      } else {
        return <Redirect to="/login" {...rest} />;
      }
    } else {
      return <Redirect to="/login" {...rest} />;
    }
  };

  return firebaseUser !== false ? (
    <Router>
      <div style={{backgroundSize:'cover',position:'fixed',zIndex:-11}} className="w-100 h-100">
      <ParticlesBg
      width='100vw' height="100vh"
        type="cobweb"
        bg={true}
        style={{position: "fixed", zIndex: -1,top:0,bottom:0}}
      />
      </div>
      <div className="container-fluid mt-2 ml-2" id="general">
        <Navbar />
        <Switch>
          <RutaPrivada component={Peliculas} path="/" exact />
          <RutaPrivada component={Perfil} path="/perfil" exact />
          <RutaPrivada component={Genero} path="/genero" exact />
          <RutaPrivada component={KeyWords} path="/KeyWords" exact />
          <RutaPrivada component={Buscar} path="/Buscar" exact />
          <Route component={Login} path="/Login" exact />
        <ParticlesBg
        type="cobweb"
        bg={true}
        style={{ position: "absolute", zIndex: -1, top: 0, left: 0 }}
      />
        </Switch>
      </div>
    </Router>
  ) : (
    <div>Cargando...</div>
  );
}

export default App;

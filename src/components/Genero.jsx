import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerGenerosPeliculasAccion,
  obtenerPeliculaPorGeneroAccion,
} from "../redux/peliculasDucks";
import Comentarios from "./Comentarios";
import Jumbotron from 'react-bootstrap/Jumbotron'

const Genero = () => {
  const [generoSeleccionado, setGeneroSeleccionado] = useState("28");

  const dispatch = useDispatch();
  const peliculaEscogida = useSelector((store) => store.peliculas.pelicula);
  const pathImg = "http://image.tmdb.org/t/p/w185/";
  const pathTrailer="https://www.youtube.com/embed/";
  const generos = useSelector((store) => store.peliculas.generos);
 //al acabar de cargar la pagina se cargaran los generos y la primera pelicula que por defecto es accion
  React.useEffect(() => {
    const InfoData = () => {
      dispatch(obtenerGenerosPeliculasAccion());
      dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
    };
    InfoData();
  }, [dispatch]);
  
  //establece el genero traido como parametro del que se hara la consulta
  const generarGenero = (e) => {
    setGeneroSeleccionado(e.target.value);
    // dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
  };
//busca la pelicula por genero seleccionado
  const buscarPelicula = () => {
    dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
  };
  


  return (
    <div className="container-fluid">
      <div className="form-group">
        <label>Seleccione un genero por el que buscar</label>
        <select
          value={generoSeleccionado}
          onChange={(e) => generarGenero(e)}
          className="form-control"
        >
          {generos &&
            generos.map((item) => (
              <option key={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
        <button
          className="btn btn-dark mt-3 float-right"
          onClick={() => buscarPelicula()}
        >
          Buscar
        </button>
      </div>
      {//si la pelicula escogida no existe no se mostrara nada
      peliculaEscogida && (
        <div className="text-center">
          <h3>{peliculaEscogida.titulo}</h3>
          <div className="card text-center mt-4 bg-transparent ">
            <div className="card-body ">
              <div className="row mx-auto">
                <div className="col mx-auto  ">
                  <img
                    src={pathImg + peliculaEscogida.foto}
                    className="img-fluid"
                  />
                  <br />

                </div>
                </div>
                <div className="row mx-auto">
                <div className="col-md-6 mx-auto">
                  <Jumbotron className="card-text bg-white">
                    <strong>Descripcion:</strong> {peliculaEscogida.descripcion}<br />
                    <strong>Generos:</strong> 
                    {
                      peliculaEscogida.genero.map((item) => (
                        item!==undefined&& <span key={item}>{item}<br /></span> 
                        ))
                      }
                    <strong>Puntuación media:</strong> {peliculaEscogida.puntuacion}/10<br />

                  </Jumbotron>
                </div>
              </div>
                <div className='row '>

                  <div className='col mx-auto'>
                      <iframe className='mt-5' width='1000' height='500'   src={pathTrailer+peliculaEscogida.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>

                  </div>
            </div>
          </div>
        </div>
      )}
      {peliculaEscogida && (
        <Comentarios peliculaComentarios={peliculaEscogida} />
      )}
    </div>
  );
};

export default Genero;

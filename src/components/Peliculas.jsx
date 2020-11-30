import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { obtenerPeliculaRandom } from "../redux/peliculasDucks";

const Peliculas = () => {
  const dispatch = useDispatch();

    const [posicionPelicula, setPosicionPelicula] = React.useState(0)
     const Peliculas = useSelector((store) => store.peliculas.results);
    const pathImg="http://image.tmdb.org/t/p/w185/";

  console.log();

  React.useEffect(() => {
    const InfoData = () => {
      dispatch(obtenerPeliculaRandom());
    };
    InfoData();
  }, [dispatch]);
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex justify-content-center text-center">
      </div>
      {Peliculas[posicionPelicula]!==undefined?(
          <div className='text-center'><h3>{Peliculas[posicionPelicula]["original_title"]}</h3>
            <div className='card text-center mt-4'>
            <div className="card-body">
                <img src={pathImg+Peliculas[posicionPelicula]["poster_path"]} className='img-fluid'/>
                <div className="card-text">Descripcion: {Peliculas[posicionPelicula]["overview"]} </div>
            </div>
            
            </div>
        </div>
      ):(null)
    }
   
   {
       posicionPelicula<=19 && posicionPelicula>0?(
       <button className='btn btn-dark float-left'
       onClick={()=>setPosicionPelicula(posicionPelicula-1)}
       >Anterior</button>):(null)
       
   }
    {
      posicionPelicula>=0 && posicionPelicula<19?(
      <button className='btn btn-dark float-right'
      onClick={()=>setPosicionPelicula(posicionPelicula+1)}
      >Siguiente</button>):(null)
      }
    </div>
    </div>
  );
};

export default Peliculas;

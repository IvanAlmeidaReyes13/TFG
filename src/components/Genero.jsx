import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { obtenerGenerosPeliculasAccion,obtenerPeliculaPorGeneroAccion } from "../redux/peliculasDucks";

const Genero = () => {
const [generoSeleccionado, setGeneroSeleccionado] = useState('28')

const dispatch = useDispatch();
const peliculaEscogida=useSelector((store) => store.peliculas.pelicula);
const pathImg="http://image.tmdb.org/t/p/w185/";
  const generos = useSelector((store) => store.peliculas.generos);
  console.log(peliculaEscogida)
  React.useEffect(() => {
    const InfoData = () => {
      dispatch(obtenerGenerosPeliculasAccion());
      dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
    };
    InfoData();
  }, [dispatch]);
  const generarGenero=(e)=>{
    setGeneroSeleccionado(e.target.value)
   // dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
  }

  const buscarPelicula=()=>{
    dispatch(obtenerPeliculaPorGeneroAccion(generoSeleccionado));
  }
  
  return (
    <div className="container-fluid">
      <div className="form-group">
        <label>Seleccione un genero por el que buscar</label>
        <select
        value={generoSeleccionado}
        onChange={(e) => generarGenero(e)}
        className="form-control">
          {
              generos&&(
              generos.map(item=>(
              <option key={item.name} value={item.id}>{item.name}</option>
              ))
              )
          }
        </select>
        <button
        className="btn btn-dark mt-3 float-right"
        onClick={()=>buscarPelicula()}
        >
            Buscar
        </button>
      </div>
      {peliculaEscogida&&(
          <div className='text-center'><h3>{peliculaEscogida.titulo}</h3>
            <div className='card text-center mt-4'>
            <div className="card-body">
                <img src={pathImg+peliculaEscogida.foto} className='img-fluid'/>
                <div className="card-text">Descripcion: {peliculaEscogida.descripcion} </div>
            </div>
            
            </div>
        </div>
  )
}
    </div>
  );
};

export default Genero;

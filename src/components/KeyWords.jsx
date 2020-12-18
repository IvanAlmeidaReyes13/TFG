
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {obtenerPeliculaPorKeyWordAccion,obtenerKeyWordsAccion } from "../redux/peliculasDucks";
import Comentarios from './Comentarios';
const KeyWords = () => {
    const dispatch = useDispatch();
    const [keyWord, setKeyWord] = useState('Amor')
    const peliculaEscogida=useSelector((store) => store.peliculas.pelicula);
    const keyWordsIds=useSelector((store)=>store.peliculas.keyWords)
    const pathImg="http://image.tmdb.org/t/p/w185/";
    const pathTrailer="https://www.youtube.com/embed/";

    React.useEffect(() => {
        const InfoData = () => {
            
            dispatch(obtenerPeliculaPorKeyWordAccion(keyWord));
            dispatch(obtenerKeyWordsAccion());
        };
        InfoData();
    }, [dispatch,keyWord]);
    const generarKeyWord=(e)=>{
        setKeyWord(e.target.value)
    }
    const buscarPelicula=()=>{
        dispatch(obtenerPeliculaPorKeyWordAccion(keyWord));
      }


    return (
        <div>
             <label>Seleccione un genero por el que buscar</label>
        <select
        value={keyWord}
        onChange={(e) => generarKeyWord(e)}
        className="form-control">
          {
              keyWordsIds&&(
                keyWordsIds.map(item=>(
              <option key={item.id} value={item.id}>{item.id}</option>
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
        {peliculaEscogida && (
        <div className="text-center">
        <h3>{peliculaEscogida.titulo}</h3>
        <div className="card text-center mt-4">
          <div className="card-body">
            <div className="row mx-auto">
              <div className="col mx-auto">
                <img
                  src={pathImg + peliculaEscogida.foto}
                  className="img-fluid"
                />
                <br />

              </div>
              </div>
              <div className="row mx-auto">
              <div className="col-md-6 mx-auto">
                <div className="card-text">
                  <strong>Descripcion:</strong> {peliculaEscogida.descripcion}<br />
                  <strong>Generos:</strong> 
                  {
                    peliculaEscogida.genero.map((item) => (
                      item!==undefined&& <span key={item}>{item}<br /></span> 
                      ))
                    }
                  <strong>Puntuación media:</strong> {peliculaEscogida.puntuacion}/10<br />

                </div>
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
{peliculaEscogida&&(
        <Comentarios peliculaComentarios={peliculaEscogida}/>)}
        </div>
    )
}

export default KeyWords

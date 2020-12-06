import{auth,firebase,db,storage} from '../components/firebase'
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

    React.useEffect(() => {
        const InfoData = () => {
            
            dispatch(obtenerPeliculaPorKeyWordAccion(keyWord));
            dispatch(obtenerKeyWordsAccion());
        };
        InfoData();
    }, [dispatch]);
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
{peliculaEscogida&&(
        <Comentarios peliculaComentarios={peliculaEscogida}/>)}
        </div>
    )
}

export default KeyWords

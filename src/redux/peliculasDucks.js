import{auth,firebase,db,storage} from '../components/firebase'
import axios from 'axios'
import KeyWords from '../components/KeyWords';
//data inicial
const dataInicial = {
    count : 0,
    next:null,
    previous:null,
    results: []
  };
//types
const OBTENER_PELICULA_EXITO='OBTENER_PELICULA_EXITO';
const OBTENER_GENERO_PELICULA_EXITO='OBTENER_GENERO_PELICULA_EXITO';
const OBTENER_PELICULA_POR_GENERO_EXITO='OBTENER_PELICULA_POR_GENERO_EXITO';
const OBTENER_PELICULA_POR_KEYWORD_EXITO='OBTENER_PELICULA_POR_KEYWORD_EXITO'
const OBTENER_KEYWORD_EXITO='OBTENER_KEYWORD_EXITO'

//reducer
export default function peliculasReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PELICULA_EXITO:
            return{...state,...action.payload}
        case OBTENER_GENERO_PELICULA_EXITO:
              return {...state,generos:action.payload}
        case OBTENER_PELICULA_POR_GENERO_EXITO:
              return {...state,pelicula:action.payload}
        case OBTENER_PELICULA_POR_KEYWORD_EXITO:
            return{...state,pelicula:action.payload} 
        case OBTENER_KEYWORD_EXITO:
            return{...state,keyWords:action.payload}  
        default:
            return state
    }
  }
//acciones

export const obtenerPeliculaRandom = ()=>async(dispatch,getState)=>{

    
        try {
            const numeroPagina=Math.floor(Math.random()*50);
            const url=`https://api.themoviedb.org/3/discover/movie?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&sort_by=popularity.desc&include_adult=false&page=${numeroPagina}`
            
            const res =await axios.get(url)
            console.log(res)
            dispatch({
                type:OBTENER_PELICULA_EXITO,
                payload:res.data
            })
        } catch (error) {
            console.log(error)
        }
}

export const obtenerGenerosPeliculasAccion = (url='https://api.themoviedb.org/3/genre/movie/list?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES')=>async(dispatch,getState)=>{

        try {
            
            const res =await axios.get(url)
            console.log(res)
            dispatch({
                type:OBTENER_GENERO_PELICULA_EXITO,
                payload:res.data.genres
            })
        } catch (error) {
            console.log(error)
        }
}

export const obtenerPeliculaPorGeneroAccion = (genero)=>async(dispatch,getState)=>{

        try {
            const pagina=Math.floor(Math.random()*20);
            const url=`https://api.themoviedb.org/3/discover/movie?with_genres=${genero}&sort_by=popularity.desc&page=${pagina}&api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES`
           
            const res =await axios.get(url)
            const numPelicula=Math.floor(Math.random()*20);
            /*console.log(numPelicula)
            console.log(res.data.results[0].title)*/
            dispatch({
                type:OBTENER_PELICULA_POR_GENERO_EXITO,
                payload:{
                    titulo:res.data.results[numPelicula].title,
                    descripcion:res.data.results[numPelicula].overview,
                    foto:res.data.results[numPelicula].poster_path,
                }
            })
        } catch (error) {
            console.log(error)
        }
}
//https://api.themoviedb.org/3/keyword/420/movies?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&include_adult=false
export const obtenerPeliculaPorKeyWordAccion = (idMovie)=>async(dispatch,getState)=>{

    try {
       
        
        var numPelicula=Math.floor(Math.random()*20);
        const codigoPelicula=await db.collection('keywords').doc(idMovie).get()
        var pagina=Math.floor(Math.random()*codigoPelicula.data().paginas);
        pagina===0&&(pagina=pagina+1)
        const url=`https://api.themoviedb.org/3/keyword/${codigoPelicula.data().id}/movies?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&include_adult=false&page=${pagina}`
        const res =await axios.get(url)
        do{  
            numPelicula=Math.floor(Math.random()*20);
        }while(res.data.results[numPelicula].overview==="")
        dispatch({
            type:OBTENER_PELICULA_POR_KEYWORD_EXITO,
            payload:{
                titulo:res.data.results[numPelicula].title,
                descripcion:res.data.results[numPelicula].overview,
                foto:res.data.results[numPelicula].poster_path,
                url:url
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const obtenerKeyWordsAccion = ()=>async(dispatch,getState)=>{

    try {
        const keyWords=await db.collection('keywords').get();
       
        console.log(keyWords.docs)
        dispatch({
            type:OBTENER_KEYWORD_EXITO,
            payload:keyWords.docs
        })
    } catch (error) {
        console.log(error)
    }
}

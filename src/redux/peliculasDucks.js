import axios from 'axios'
//data inicial
const dataInicial = {
    count : 0,
    next:null,
    previous:null,
    results: []
  };
//types
const OBTENER_PELICULA_EXITO='OBTENER_PELICULA_EXITO';
//reducer
export default function peliculasReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_PELICULA_EXITO:
            return{...state,...action.payload}
        /*case SIGUIENTE_POKEMONES_EXITO:
              return {...state,...action.payload}
        case ANTERIOR_POKEMONES_EXITO:
              return {...state,...action.payload}
        case INFO_POKEMON_EXITO:
            return{...state,unPokemon:action.payload}  */    
        default:
            return state
    }
  }
//acciones

export const obtenerPeliculaRandom = (url='https://api.themoviedb.org/3/discover/movie?api_key=caadbbd987383ccb2f8c8ec69e418f15&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')=>async(dispatch,getState)=>{

    
        try {
            
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

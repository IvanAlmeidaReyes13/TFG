import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import peliculasReducer from './peliculasDucks'

import usuarioReducer,{leerUsuarioActivoAccion} from './usuarioDucks'



const rootReducer = combineReducers({
    peliculas: peliculasReducer,
    usuario:usuarioReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ) )
    leerUsuarioActivoAccion()(store.dispatch)
    return store
}

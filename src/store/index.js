import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import FavoritosReducer from './Favoritos/Favoritos.reducer'
import FiltroReducer from './Filtro/Filtro.reducer'
import CarregamentoReducer from './Carregamento/Carregamento.reducer'
import AuthReducer from './Auth/Auth.reducer'

const rootReducer = combineReducers({
  favoritos: FavoritosReducer,
  parametros: FiltroReducer,
  carregamento: CarregamentoReducer,
  auth: AuthReducer,
})

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer)

export const store = createStore(persistedReducer)
export const persisetdStore = persistStore(store)
import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import favoritosReducer from './Favoritos/Favoritos.reducer'
import FiltroReducer from './Filtro/Filtro.reducer'

const rootReducer = combineReducers({
  favoritos: favoritosReducer,
  parametros: FiltroReducer
})

const persistedReducer = persistReducer({
  key: 'root',
  storage
}, rootReducer)

export const store = createStore(persistedReducer)
export const persisetdStore = persistStore(store)
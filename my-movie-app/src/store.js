import {
  setupListeners
} from '@reduxjs/toolkit/query';

import { 
  configureStore
} from '@reduxjs/toolkit';

import 
  cacheReducer
from '../src/featuresReducers/pokemonSlice'; 

import {
  pokemonApi
} from './services/api';

export const store = configureStore({
  reducer: { 
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    cache: cacheReducer 
  },
  middleware: (getDefaultMiddleware) => //handle api request
  getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);// dispatch send actions to redux store.

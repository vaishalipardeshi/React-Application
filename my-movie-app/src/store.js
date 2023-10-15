import {
  configureStore
} from '@reduxjs/toolkit';

import {
  setupListeners
} from '@reduxjs/toolkit/query';

import {
  pokemonApi
} from './services/api';

import 
  cacheReducer
  from '../src/featuresReducers/pokemonSlice';

  export const store = configureStore({
    reducer: { 
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      cache: cacheReducer, //add cache to store
    },
    middleware: (getDefaultMiddleware) => //handle api request
    getDefaultMiddleware().concat(pokemonApi.middleware),
  });

  setupListeners(store.dispatch);// dispatch send actions to redux store.

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
  reducer: { //necessary for making api calls & make data available to components.
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    cache: cacheReducer, // add cache reducer to store
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

//creating a redux store for store all app data.
//manage large data
//connect api slice reducers to redux store
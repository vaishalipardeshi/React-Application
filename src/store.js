import {
  configureStore
} from '@reduxjs/toolkit';

import {
  composeWithDevTools
} from 'redux-devtools-extension';

import {
  setupListeners
} from '@reduxjs/toolkit/query';

import {
  pokemonApi
} from './services/api';

import 
  cacheReducer
  from '../src/featuresReducers/pokemonSlice';

  //Add redux devtool extension.
  const composeEnhancers = composeWithDevTools({
    name: 'MyReduxStore'
  });

  export const store = configureStore({
    reducer: { 
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      cache: cacheReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
    enhancer: [composeEnhancers],
  });

  setupListeners(store.dispatch);

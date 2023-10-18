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

  // export const store = configureStore({
  //   reducer: { 
  //     [pokemonApi.reducerPath]: pokemonApi.reducer,
  //     cache: cacheReducer, //add cache to store
  //   },
  //   middleware: (getDefaultMiddleware) => //handle api request
  //   getDefaultMiddleware().concat(pokemonApi.middleware),
  // });

  //Add redux devtool extension.
  const composeEnhancers = composeWithDevTools({
    name: 'MyReduxStore',
    actionsBlacklist: ['SOME_ACTION_TYPE'],
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  export const store = configureStore({
    reducer: { 
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      cache: cacheReducer,
    },
    middleware: (getDefaultMiddleware) => //handle api request
    getDefaultMiddleware().concat(pokemonApi.middleware),
    enhancer: [composeEnhancers],
  });

  setupListeners(store.dispatch);

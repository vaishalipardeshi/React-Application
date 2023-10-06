import { 
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

import {
  setCacheValue
} from '../featuresReducers/pokemonSlice';

  export const pokemonApi = createApi({
    reducerPath: 'pokemonApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }), 
    endpoints: (builder) => ({
      getAllPokemon: builder.query({ 
        query: () => '',
        //caching behaviour
        onCacheKey: (cacheKey) => `cacheData:${cacheKey}`, //this callback fun used to generate cache key for caching data
        onSuccess: ( data, {dispatch, cacheKey }) => {
          dispatch(setCacheValue({ key: `cacheData:${cacheKey}`, value: data })); // Cache the data with generated cache key
        },
      }),
      getAllPokemonDetails: builder.query({ 
        query: (id) => `/${id}`,
        onCacheKey: (cacheKey) => `cacheData:${cacheKey}`,
        onSuccess: ( data, {dispatch, cacheKey }) => {
          dispatch(setCacheValue({ key: `cacheData:${cacheKey}`, value: data }));
        },
      }),
    }),
  });
 
  export const { useGetAllPokemonQuery, useGetAllPokemonDetailsQuery } = pokemonApi;
  
  
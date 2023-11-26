import { 
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';

  export const pokemonApi = createApi({
    reducerPath: 'pokemonApi', 
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }), 
    endpoints: (builder) => ({
      getAllPokemon: builder.query({ 
        query: () => '',
      }),
      getAllPokemonDetails: builder.query({ 
        query: (id) => `/${id}`,
      }),
    }),
  });
 
  export const { useGetAllPokemonQuery, useGetAllPokemonDetailsQuery } = pokemonApi;
  
  
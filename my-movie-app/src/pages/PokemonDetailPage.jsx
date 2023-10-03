import {
  useParams
} from 'react-router-dom';

import {
  useGetAllPokemonDetailsQuery
} from '../services/api';

import 
  PokemonDetail
from '../components/PokemonDetail'; 

const PokemonDetailPage = () => {

  const { id } = useParams(); //hook to fetch detailed info about pokemon with specific id
  // hook to fetch data about pokemon & result stored in pokemonData
  const { data: pokemonData, isLoading, isError } = useGetAllPokemonDetailsQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching Pokemon detail: {isError.message}</div>;
  }

  if (!pokemonData) {
    return <div>Pokemon not found.</div>;
  }

  return (
    <div className='pokemon-detail-page'>
      <PokemonDetail pokemon={pokemonData} />
    </div>
  );
};

export default PokemonDetailPage;

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

  const { id } = useParams(); 
  const { data: pokemonData, isLoading, isError } = useGetAllPokemonDetailsQuery(id);

  if (isLoading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (isError) {
    return <div className="text-center">Error fetching Pokemon detail: {isError.message}</div>;
  }

  if (!pokemonData) {
    return <div className='text-center'>Pokemon not found.</div>;
  }

  return (
    <div className='pokemon-detail-page max-h-screen'>
      <PokemonDetail pokemon={pokemonData} />
    </div>
  );
};

export default PokemonDetailPage;

import {
  useEffect, useState
} from 'react';

import
  PropTypes
from 'prop-types';

import {
  Link
} from 'react-router-dom';

import
  Fuse
from 'fuse.js';

import './PokemonList.css';

import { useDispatch } from 'react-redux';//hook to access to the redux store's dispatch fun & dispatch actions
import { addToFavorites } from '../featuresReducers/pokemonSlice';//actionCreator

function PokemonList({ pokemonData, limit, searchQuery }) {

  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  //fetch details when pokemonData prop changes
  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemonData]);

  const fetchPokemonDetails = async () => {
    try {
      const details = [];

      for (const pokemon of pokemonData) {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        details.push(data);
      }

      console.log('Fetched Pokemon Details:', details);

      setPokemonDetails(details);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fuse = new Fuse(pokemonDetails,
    {
    keys: ['name'],
    includeMatches: true,
    includeScore: true,
  });

  const filteredPokemon = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : pokemonDetails.slice(0, limit);

  if (isLoading) {
    return <div className="Loader text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (filteredPokemon.length === 0) {
    return <div className="Error">No matching Pokemon found.</div>;
  }

  const handleAddToFavorite = (pokemon) => {
    console.log('Clicked Add to Favorites:', pokemon);
    dispatch(addToFavorites(pokemon));
    // const id = pokemon.id;
    // dispatch(addToFavorites({key: `pokemonDetails.${id}`, value: pokemonData}));//used to send actionsto redux store, which triggered reducer to update state
    console.log(addToFavorites(pokemon), 'addtofav');
  };

  //performs an APi call to fetch random poke data.
  const handleRandomPokemon = async () => {
    try{
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`);
      const data = await response.json();
      
      console.log('random pokemon:', data);
      setPokemonDetails([data]);
    } catch (error) {
      console.error('error fetching random pokemon:', error);
    }
  };

  //it generates a random pokemon id withing the range of availabe pokemon ID's
  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) +1;
  };

  return (
    <div className='grid grid-cols-3 md:grid-cols-3 gap-4 p-6'>
      {filteredPokemon?.map((pokemon, index) => (
        <article key={index} className='pokemon-card bg-lime-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-90 border border-lime-500'>
          <Link className='block' to={`/pokemon/${pokemon.id}`}>
            <div className='pokemon-name-container bg-gray-200 p-2 rounded-lg'>
              <h2 className='pokemon-name text-lg font-bold text-black text-center'>{pokemon.name}</h2>
            </div>
            <div className='flex justify-center items-center h-32'>
              <img className='max-w-full max-h-full object-contain w-48'
                src={pokemon.sprites?.front_shiny}
                alt={pokemon.name}/>
            </div>
          </Link>
          <button onClick={() => handleAddToFavorite(pokemon)}>Add</button>
          <button onClick={handleRandomPokemon}>Random Pokemon</button>
          <span role="img" aria-label="heart">❤️</span>
        </article>
      ))}
    </div>
  );
}

PokemonList.propTypes = {
  pokemonData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  limit: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default PokemonList;
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

function PokemonList({ pokemonData, limit, searchQuery }) {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

      console.log('Fetched Pokemon Details:', details); // Debug: Check if details are fetched correctly

      setPokemonDetails(details);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  // const filteredPokemon = pokemonDetails
  // .filter((pokemon) => 
  //   pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) 
  // )
  // .slice(0, limit);

  const fuse = new Fuse(pokemonDetails,
    //object pass to Fuse | tells fuzzy search library that search based on name key
    {
    keys: ['name'],
    includeMatches: true,
    includeScore: true, //how well each result matches a query
  });

  //filteredPokemon array which contain search result
  //check whether searchQuery var exists or not
  const filteredPokemon = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item) //extract actual pokemon data items from search result
    : pokemonDetails.slice(0, limit); //empty search query

  // console.log('Filtered Pokemon:', pokemonDetails);

  if (isLoading) {
    return <div className="Loader text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  if (filteredPokemon.length === 0) {
    return <div className="Error">No matching Pokemon found.</div>;
  }

  return (
    <div className='grid grid-cols-3 md:grid-cols-3 gap-4 p-6'>
      {filteredPokemon?.map((pokemon, index) => (//chaining operator, if filteredPokemon is not null/undefined
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
  // sprites: PropTypes.shape({
  //   front_shiny: PropTypes.string.isRequired,
  // }).isRequired,
  limit: PropTypes.number.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default PokemonList;
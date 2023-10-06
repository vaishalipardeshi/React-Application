import 
  PropTypes
from 'prop-types';

import {
  Link
} from 'react-router-dom';

import {
  useEffect,
  useState
} from 'react';

import './PokemonList.css';

function PokemonList({ pokemonData, limit, searchQuery }) {

  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('PokemonData', pokemonData);

  useEffect(() => { 
    const fetchPokemonDetails = async () => {
      try {
      const details = [];

      for (const pokemon of pokemonData) {
        const response = await fetch(pokemon.url);
        const data = await response.json(); 
        details.push(data);
      }
      console.log('fetchPokemonDetails', details);
      setPokemonDetails(details); 
      setIsLoading(false); 
    } catch (error) {
      setError(error); 
      setIsLoading(false); 
      }
    };
    fetchPokemonDetails();
  }, [pokemonData]);

  const filteredPokemon = pokemonDetails
    .filter((pokemon) => 
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
    .slice(0, limit);

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isLoading) {
      return <div>Error: {error.message}</div>
    }

    if (!pokemonDetails.length) { 
      return <div>No matching pokemon found.</div>
    }

  return (
    <div className='pokemon-list-container'>
      {filteredPokemon.map((pokemon, index) => (
        <article key={index} className='pokemon-card'>
          <Link className='text-color' to={`/pokemon/${pokemon.id}`}>
            <h2 className='pokemon-home-name'>{pokemon.name}</h2>
            <img className='pokemon-home-image'
              src={pokemon.sprites.front_shiny}
              alt={pokemon.name}/>
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
    limit: PropTypes.number.isRequired,
    searchQuery: PropTypes.string.isRequired
  };

export default PokemonList;
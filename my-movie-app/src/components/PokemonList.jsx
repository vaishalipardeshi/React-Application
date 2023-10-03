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

function PokemonList({ pokemonData, limit, searchQuery }) { //functional component

  const [pokemonDetails, setPokemonDetails] = useState([]); //store details of pokemon
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('PokemonDataDataData', pokemonData);

  useEffect(() => { //callback fun for fetch details of each pokemon in pokemonData
    const fetchPokemonDetails = async () => {
      try {
      const details = [];

      for (const pokemon of pokemonData) { //iterate loop
        const response = await fetch(pokemon.url); //fetch request made to url
        const data = await response.json(); //response converted to json & add to details array
        details.push(data);
      }
      // console.log(details, 'details')
      setPokemonDetails(details); //details set to new state
      setIsLoading(false); //mark loading as complete
    } catch (error) {
      setError(error); //handle fetch error
      setIsLoading(false); //mark laoding as complete with error.
      }
    };
    fetchPokemonDetails();
  }, [pokemonData]);

  //filter method on pokemonDetails array
  //filter method iterate thr each ele of an array and return new array contains only ele which meet cond.
  const filteredPokemon = pokemonDetails
    .filter((pokemon) => 
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) //case -sensitive search
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
          <h2 className='pokemon-name'>{pokemon.name}</h2>
          <img className='pokemon-image'
            src={`../src/assets/Images/${pokemon.id}.png`}
            alt={pokemon.name}/>
          {/* <p className='base-experience'>Base Experience: {pokemon.base_experience}</p> */}
          {/*access only [0] array index*/}
          {/* <ul>
            <li>{pokemon.game_indices[0].version.name}</li>
          </ul> 
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul> */}
          {/*access all version name from game_indixes array*/}
          {/* <ul>
            {pokemon.game_indices.map((game_index, index) => (
              <li key={index}>{game_index.version.name}</li>
            ))}
          </ul> */}
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
    limit: PropTypes.number,
    searchQuery: PropTypes.string.isRequired
  };

export default PokemonList;
import 
  PropTypes
from 'prop-types';

import '../components/PokemonDetail.css';

const PokemonDetail = ({ pokemon, isLoading, isError }) => {  //takes pokemon obj, contain pokemon info

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return<div>Error occur during fetch data.</div>
  }
  
  if (!pokemon) {
    return <div>No Pokemon data available.</div>;
  }

  return (
    <>
      <h4 className='pokemon-title'>Pokemon Detail Page</h4>
      <div className='pokemon-detail'>
        <h3 className='pokemon-name'>{pokemon.name}</h3>
        <img src={`../src/assets/Images/${pokemon.id}.png`} alt={pokemon.name} />
        <p className='pokemon-type'>
          Type: {pokemon.types.map((type) => type.type.name).join(', ')}
        </p>
        <p className='pokemon-abilities'> {/*map fun Iterate thr each ability from pokemon.abilities array*/}
          Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}
        </p>
        <p className='pokemon-experience'>
          Base Experience : {pokemon.base_experience}
        </p>
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
      </div>
    </>
  );
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({ //object with those properties 
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    types: PropTypes.array.isRequired,
    abilities: PropTypes.array.isRequired,
    base_experience: PropTypes.number.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default PokemonDetail;

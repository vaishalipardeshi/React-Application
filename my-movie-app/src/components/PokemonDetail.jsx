import 
  PropTypes
from 'prop-types';

import { 
  useState
} from 'react';

import '../components/PokemonDetail.css';

const PokemonDetail = ({ pokemon, isLoading, isError }) => {  
  const[showMore, setShowMore] = useState(false);

  const renderList = (label, items) => (
    <p className='pokemon-details'>
      {label}: {items.join(', ')}
    </p>
  );

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return<div>Error occur during fetch data.</div>
  }
  
  if (!pokemon) {
    return <div>No Pokemon data available.</div>;
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <main className='pokemon-info'>
        <h4 className="pokemon-title">Pokemon Details</h4>
        <section className="pokemon-images">
          <h3 className="pokemon-name">{pokemon.name}</h3> 
            {Object.entries(pokemon.sprites).map(([key, value]) => 
              typeof value === 'string' ? (
                <img
                  key={key}
                  className="pokemon-image"
                  src={value}
                />
              ) : null
            )}
        </section>
        <article className='description'>
          {/*basic info */}      
          {renderList('Types',pokemon.types.map((type) => type.type.name))}
          {renderList('Height', [pokemon.height])}
          {renderList('Base Experience', [pokemon.base_experience])}
          {renderList('Abilities', pokemon.abilities.map((ability)=> ability.ability.name))}
          {renderList('Stats', pokemon.stats.map((statData) => statData.stat.name))} 
          {renderList('Game Indices', pokemon.game_indices.map((gameIndex) => gameIndex.version.name))} 

          {showMore && (
            <>
              {renderList('Moves', pokemon.moves.map((moveData) => moveData.move.name))}
            </>
          )}
          <h5 className='show-more' onClick={toggleShowMore}>
            {showMore ? 'show less' : 'show more...'}
          </h5>
        </article>
      </main>
    </>
  );
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.shape({ 
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    types: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    abilities: PropTypes.array.isRequired,
    base_experience: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
      back_shiny: PropTypes.string.isRequired,
    }).isRequired,
    game_indices: PropTypes.arrayOf(
      PropTypes.shape({
        version: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      }),
    ),
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        move: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })
    ),
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        effort: PropTypes.number.isRequired,
          stat: PropTypes.shape({
            name: PropTypes.string.isRequired
          })
      })
    ),
  }).isRequired,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};

export default PokemonDetail;

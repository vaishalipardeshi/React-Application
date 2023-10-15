import {
  useState
} from 'react';

import 
  PropTypes
from 'prop-types';

import
  backgroundImage
from '../assets/Images/background.jpg';

import '../components/PokemonDetail.css';

const PokemonDetail = ({ pokemon }) => {  
  const[showMore, setShowMore] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);

  const renderList = (label, items) => (
    <p className='text-base my-3'>
      {label}: {items.join(', ')}
    </p>
  );

  const handlePictureClick = (value) => {
    setSelectedPicture(value);
  };
  
  if (!pokemon) {
    return <div>No Pokemon data available.</div>;
  }

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <h2 className="text-2xl italic uppercase font-bold p-4">Pokemon Details</h2>
      <main className='main flex text-xl text-black-300 p-6 bg-white rounded-lg' style={{ backgroundImage: `url(${backgroundImage})` }}>
        <section className="small-images w-1/5 flex flex-col items-center gap-10 mr-8">
          {/*to convert array */}
          {Object.entries(pokemon.sprites).map(([key, value]) =>
            typeof value === 'string' ? (
              <div key={key} className='border border-lime-500 rounded cursor pointer overflow-hidden shadow-1xl hover:shadow-md'>
                <img
                  className="img w-24 h-24"
                  src={value}
                  alt={`${pokemon.name}-${key}`}
                  onClick={() => handlePictureClick(value)}
                />
              </div>
            ) : null
          )}
          </section>
          <section className='main-image-section text-center flex justify-center flex-col'>
            <div className='max-w-full max-h-full'>
              <img
                className='main-image border border-lime-500 w-48 h-48 rounded-lg shadow-1xl hover:shadow-md'
                src={selectedPicture || pokemon.sprites.front_default}
                alt={`${pokemon.name}-main`}
              />
              <h3 className="name italic uppercase font-bold text-1xl">{pokemon.name}</h3> 
            </div>
          </section>
        <article className='description-box w-3/5 text-base text-black text-left p-6 border border-lime-500 rounded-lg shadow-1xl hover:shadow-md ml-10'>
          {/*basic info */}      
          {renderList('Types',pokemon.types.map((type) => type.type.name))}
          {renderList('Height', [pokemon.height])}
          {renderList('Base Experience', [pokemon.base_experience])}
          {renderList('Abilities', pokemon.abilities.map((ability)=> ability.ability.name))}
          {renderList('Stats', pokemon.stats.map((statData) => statData.stat.name))} 
          {/* {renderList('Game Indices', pokemon.game_indices.map((gameIndex) => gameIndex.version.name))}  */}
          <div className="game-indices mt-4">
            <span className='game-indices-title text-base'>Game Indices: </span>
            {pokemon.game_indices.map((gameIndex, index) => ( //current ele in game-indices
              <span
                key={index} //unique
                className={`game-index-color${index + 1} w-6 h-4 rounded-full inline-block mx-1`}
              />
            ))}
          </div>
          {showMore && (
            <>
              {renderList('Moves', pokemon.moves.map((moveData) => moveData.move.name))}
            </>
          )}
          <h5 className='button text-blue-300 text-base cursor-pointer hover:underline' onClick={toggleShowMore}>
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
      front_default: PropTypes.string.isRequired,
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
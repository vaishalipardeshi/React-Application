import { useSelector } from 'react-redux';

const FavoritesPage = () => {

  //selector fun provided to useSelector || []-fallback value || is expr is undefined not exists then the hook return an empty array
  const favoritePokemon = useSelector((state) => state.pokemon?.favorites || []);
  console.log(favoritePokemon, 'favoritepokemon');

  return (
    <div>
      <h1>Favorite Pokémon</h1>
      {favoritePokemon.length === 0 ? (
        <p>You have not added any Pokémon to your favorites yet.</p>
        ) : (
        <div className="pokemon-card-container">
          {favoritePokemon.map((pokemon) => (
            <div className="pokemon-card" key={pokemon.id}>
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <p>Base Experience: {pokemon.base_experience}</p>
              <p>Height: {pokemon.height}</p>
              {/* Add a button to remove the Pokemon from favorites */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

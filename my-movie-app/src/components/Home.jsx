import
PokemonList
from '../components/PokemonList';

import {
FaSearch, FaTimes
} from 'react-icons/fa';

import {
useState
} from 'react';

import {
useGetAllPokemonQuery
} from '../services/api';

import '../components/Home.css'

const Home = () => {

const [searchQuery, setSearchQuery] = useState('');

// hook to fetch data about pokemon & result stored in pokemonData
const { data: pokemonData, isLoading, isError } = useGetAllPokemonQuery();
console.log("getAllPokemonResponse", pokemonData);

if (isLoading) {
  return <div>Loading...</div>
}

if(isError) {
  return <div>Error occured: {isError.message}</div>
}

return (
  <main>
    <div className="search-bar">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
        type="text"
        placeholder="Type here to search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // capture new value & update searchQuery state with new value.
        className="search-input"/>
        <FaTimes
          className="clear-icon"
          onClick={() => setSearchQuery('')} //clear search input field by pass empty string
        />
      </div>
    </div>
    <PokemonList pokemonData={pokemonData.results} limit={9} searchQuery={searchQuery} />
  </main>
);
};

export default Home;
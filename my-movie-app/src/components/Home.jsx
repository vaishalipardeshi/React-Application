import 
  Navbar
from '../components/Navbar';

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

import '../components/Home.css';

const Home = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const { data: pokemonData, isLoading, isError } = useGetAllPokemonQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  if (isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error occured: {isError.message}</div>
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(pokemonData.results.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if(newPage >=1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const hasSearchResults = searchQuery !== '' && pokemonData.results.some((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSearchBar = currentPage === 1;

  return (
    <main>
      <Navbar currentPage={currentPage} totalPages={totalPages} />
      {renderSearchBar && (
        <div className="search-bar">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
            type="text"
            placeholder="Type here to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="search-input"/>
            <FaTimes
              className="clear-icon"
              onClick={() => setSearchQuery('')}
            />
          </div>
        </div>
      )}
      {hasSearchResults ? (
        <PokemonList pokemonData={pokemonData.results.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(startIndex,endIndex)} limit={9} searchQuery={searchQuery} />
        ) : (
        <>
          <PokemonList pokemonData={pokemonData.results.slice(startIndex, endIndex)} limit={9} searchQuery={searchQuery} />
          <div className='pagination'>
            {currentPage > 1 &&
              <img src="../src/assets/Images/icons/arrow-left.svg" alt="left-arrow" /> 
            }
            {currentPage > 1 && (
              <span onClick={() => handlePageChange(currentPage - 1)}>
                previous 
              </span>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <span 
                key={index + 1}
                onClick={() => handlePageChange (index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </span>
            ))}
            {currentPage < totalPages && (
              <span onClick={() => handlePageChange(currentPage + 1)}>
                Next 
              </span>
            )}
            {currentPage < totalPages &&
              <img src="../src/assets/Images/icons/arrow-right.svg" alt="right-arrow" />
            }
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
import {
  useState
} from 'react';

import {
  FaSearch, FaTimes
} from 'react-icons/fa';

import {
  useGetAllPokemonQuery
} from '../services/api';

import
  Navbar
from '../components/Navbar';

import
  PokemonList
from '../components/PokemonList';

import '../components/Home.css';

import leftArrow from '../assets/Images/icons/arrow-left.svg';

import rightArrow from '../assets/Images/icons/arrow-right.svg';


const Home = () => {

  //fetch data about pokemon & result stored in pokemonData
  const { data: pokemonData, isLoading, isError } = useGetAllPokemonQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  if (isLoading) {
    return <div className='loader text-center'>Loading...</div>
  }

  if(isError) {
    return <div className='text-center'>Error occured: {isError.message}</div>
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
        <div className="search-bar p-4 rounded-md shadow-md">
          <div className="search-input-container relative ml-4 mr-4 rounded">
            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700'>
              <FaSearch className="h-5 w-5 search icon"/>
            </span>
            <input
            type="text"
            placeholder="Type here to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} //capture new value & update searchQuery state with new value
            className="search-input pl-10 pr-16 py-2 rounded-md border border-grey-300 focus:ring focus:ring-lime-200 focus:outline-none w-full"/>
            {searchQuery && (
              <span className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                <FaTimes
                  className="h-5 w-5 text-gray-400 clear icon"
                  onClick={() => setSearchQuery('')} //clear search input field by pass empty string
                />
              </span>
            )}
          </div>
        </div>
      )}
      {hasSearchResults ? (
        <PokemonList pokemonData={pokemonData.results.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(startIndex,endIndex)} limit={9} searchQuery={searchQuery} />
        ) : (
        <>
          <PokemonList pokemonData={pokemonData.results.slice(startIndex, endIndex)} limit={9} searchQuery={searchQuery} />
          <div className="p-4 mx-2 transform -translate-y-1/2 text-gray-700 rounded-md">
            <div className='pagination flex justify-center items-center mt-20 text-base space-x-8 bg-lime-100 text-black p-2 rounded-md shadow-xl hover:shadow'>
              {currentPage > 1 &&
                <img src={leftArrow} alt="left-arrow" className='w-4 h-4'/> 
              }
              {currentPage > 1 && (
                <span onClick={() => handlePageChange(currentPage - 1)}
                className='cursor-pointer'>
                  previous 
                </span>
              )}
              {/*destructuring assignment */}
              {Array.from({ length: totalPages }, (_, index) => ( // create new array with length of totalPages.
                <span 
                  key={index + 1}
                  onClick={() => handlePageChange (index + 1)}
                  className={`cursor-pointer ${currentPage === index + 1 ? 'font-bold' : 'text-gray-500'}`}>
                  {index + 1}
                </span>
              ))}
              {currentPage < totalPages && (
                <span onClick={() => handlePageChange(currentPage + 1)}
                className='cursor-pointer'>
                  Next 
                </span>
              )}
              {currentPage < totalPages &&
                <img src={rightArrow} alt="right-arrow" className='w-4 h-4'/>
              }
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
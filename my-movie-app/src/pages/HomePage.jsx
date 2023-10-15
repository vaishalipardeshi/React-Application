import {
  Link
} from 'react-router-dom';

import backgroundImage from '../assets/Images/pokemonimage.jpg';

const HomePage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="text-white text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-4 px-4">
        <h1 className="text-4xl md:text-4xl lg:text-5xl mb-4">Welcome to the Pokemon App!</h1>
        <h5 className='text-lg md:text-xl'>
          <Link to="/HomePage">Go to Home</Link>
        </h5>
      </div>
    </div>
  );
};

export default HomePage;

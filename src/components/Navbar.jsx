import {
  Link
} from 'react-router-dom';

import PropTypes from 'prop-types';

const Navbar = ({ currentPage }) => {
  return (
    <nav className='navbar flex items-center justify-between p-4 bg-lime-100 shadow-md rounded shadow-xl hover:shadow'>
      <Link to='/' className={`text-lg ${currentPage === 1 ? 'font-bold' : ''}`}>
        <div className='flex items-center'>
          <img src="../src/assets/Images/icons/back-arrow.svg" alt="arrow" className='w-6 h-6 ml-4'/> 
          <p className='navbar-back-name text-black'>Back</p> 
        </div>
      </Link>
    </nav>
  );
};

Navbar.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

export default Navbar;

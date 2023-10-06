import {
  Link
} from 'react-router-dom';

import 
  PropTypes
from 'prop-types';

import './Navbar.css';

const Navbar = ({ currentPage }) => {
  return (
    <nav className='navbar'>
      <img src="../src/assets/Images/icons/back-arrow.svg" alt="arrow" /> 
      <Link to='/' className={currentPage === 1 ? 'active' : ''}>
        <p className='navbar-back-name'>Back</p> 
      </Link>
    </nav>
  );
};

Navbar.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

export default Navbar;

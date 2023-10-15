import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';

import
  HomePage
from '../pages/HomePage';

import
  Home
from '../components/Home';

import
  PokemonDetailPage
from '../pages/PokemonDetailPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<Home />} />
        <Route path="/" Component={<Home/>} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
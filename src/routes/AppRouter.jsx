import {
  BrowserRouter as Router, Routes, Route, Outlet
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

import FavoritesPage from '../pages/FavoritesPage';

const AppRouter = () => {
  return (
    <Router basename="/React-Application">
      <Routes>
        <Route path="/" element={<Outlet />}>{/*used to handle child routes within main route */}
          <Route index element={<HomePage />} />
          <Route path="/React-Application" element={<HomePage />} />
          <Route path="/HomePage" element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
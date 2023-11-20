import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Connexion from './Connexion';
import Home from './Home';
import MusicForm from './MusicForm';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/connexion">Connexion</Link>
        </li>
        <li>
          <Link to="/ajouter-musique">Ajouter Musique</Link>
        </li>
      </ul>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/ajouter-musique" element={<MusicForm />} />
      </Routes>
    </Router>
  );
};

export default App;

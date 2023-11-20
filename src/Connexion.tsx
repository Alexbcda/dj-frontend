import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Connexion: React.FC = () => {
  const [pseudo, setPseudo] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: pseudo,
        password: motDePasse,
      });

     
      localStorage.setItem('token', response.data.jwt);

     
      navigate('/');
    } catch (error) {
      setError('Pseudo ou mot de passe incorrect');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleConnexion}>
        <label>
          Pseudo:
          <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
        </label>
        <br />
        <label>
          Mot de passe:
          <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
        </label>
        <br />
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Connexion;

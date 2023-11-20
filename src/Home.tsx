import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [favoris, setFavoris] = useState<any[]>([]);
  const [derniersAjouts, setDerniersAjouts] = useState<any[]>([]);

  useEffect(() => {
    const getFavoris = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/musiques?filters[Favoris][$eq]=true&populate=chanteur');
        const data = await response.json();
        console.log('data favoris', data.data);
        setFavoris(data.data);
      } catch (error) {
        console.error('Error fetching favoris:', error);
      }
    };

    getFavoris();
  }, []);

  useEffect(() => {
    const getDerniersAjouts = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/musiques?sort=createdAt:desc&populate=chanteur');
        const data = await response.json();
        console.log('data derniers ajouts', data.data);
        setDerniersAjouts(data.data);
      } catch (error) {
        console.error('Error fetching derniers ajouts:', error);
      }
    };

    getDerniersAjouts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>My Personal DJ</h1>
      <h2>Mes Musiques Préférées</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {favoris.map((musique, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <p>Titre de la musique</p>
            <p>{musique.attributes.Titre}</p>
          </div>
        ))}
      </div>

      <h2>Derniers Ajouts</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {derniersAjouts.map((musique, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <p>Titre du dernier ajout</p>
            <p>{musique.attributes.Titre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

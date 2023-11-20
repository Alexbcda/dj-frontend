import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

interface Chanteur {
  id: number;
  attributes: {
    nom: string;
    prenom: string;
    date: string;
    relations: {
      musiques: Musique[];
    };
  };
}

interface Musique {
  id: number;
  attributes: {
    titre: string;
    lien: string;
    sortie: string;
    favoris: boolean | null;
  };
}

const Api: React.FC = () => {
  const [chanteurs, setChanteurs] = useState<Chanteur[]>([]);

  const apiUrl = 'http://localhost:1337/api';
  const tokenChanteurs = 'd8fd16f1c330995424dbb4a0b394e4fb1106c1a518c7fee8962ab0eccb56ec42d6ceaf6441052fff17b62f3bab3be8b5f96f9b661f27026a2662db4b5a81bb5da3e8b5958b1a86673406a3b3cc81132538f9a7c84bf2439412e6d9210b5d329174a14899ff1c8ab9779baa209b9efe3c8baad812d4d66d22e0b9eb28d64924e9';
  const tokenMusiques = '733e069614fe032947555bf07b1d4e7978e107618d8fbb8c6153de011762bc780817edd587afb157d9ad05e9fb23263e97687d829f86410f116794b750cf1bbe66586d478dec86260d748a77a133dcb9b0c5f25e62f00f62fb95047abf99bcffe4bd153d61a3eb9c55195994706660f846f7a9c9dceea259bc6cfa7eab989115';

  const fetchData = useCallback(async () => {
    try {
      const responseChanteurs = await axios.get<{ data: Chanteur[] }>(`${apiUrl}/chanteurs`, {
        headers: {
          Authorization: `Bearer ${tokenChanteurs}`,
        },
      });

      setChanteurs(responseChanteurs.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [tokenChanteurs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const chanteursList = useMemo(() => {
    return chanteurs.map((chanteur) => (
      <li key={chanteur.id}>
        {chanteur.attributes.nom} {chanteur.attributes.prenom} - {chanteur.attributes.date}
        <ul>
          {chanteur.attributes.relations?.musiques?.map((musique) => (
            <li key={musique.id}>
              {musique.attributes.titre} - {musique.attributes.lien} - {musique.attributes.sortie} - Favoris: {musique.attributes.favoris}
            </li>
          ))}
        </ul>
      </li>
    ));
  }, [chanteurs]);

  return (
    <div>
      <h1>Chanteurs</h1>
      <ul>{chanteursList}</ul>
    </div>
  );
};

export default Api;

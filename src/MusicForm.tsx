import React, { useState } from "react";
import axios, { AxiosError } from "axios";

interface MusicFormProps {
  onAddMusic: () => void;
}

const MusicForm: React.FC<MusicFormProps> = ({ onAddMusic }) => {
  const [titre, setTitre] = useState<string>("");
  const [chanteur, setChanteur] = useState<string>("");
  const [favoris, setFavoris] = useState<boolean>(false);
  const [sortie, setSortie] = useState<string>("");
  const [lien, setLien] = useState<string>("");

  const tokenMusiques =
    '42768e38f929fcb654263b9d0b28bbffc552b2019166a336154f46301b39b0dec65f6d1cc91c9eeba34913056b782977f67a97d58d2ba85b7f87846da9a7afbe2453f1fb26c7304d7e91b92d5d93f22acdca9280194841e4930773b52d38ad5933b1bc0dc5beaf8acc720187b5a321885ca7765f758add5e98a74081835405a1'; // Remplacez cela par votre véritable token

  const handleAddMusic = async () => {
    try {
      const formattedDate = `${sortie.substring(4, 8)}-${sortie.substring(2, 4)}-${sortie.substring(0, 2)}`;

      await axios.post(
        "http://localhost:1337/api/musiques",
        {
          Titre: titre,
          Chanteur: chanteur,
          Favoris: favoris,
          Sortie: formattedDate,
          Lien: lien,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenMusiques}`,
          },
        }
      );

      setTitre("");
      setChanteur("");
      setFavoris(false);
      setSortie("");
      setLien("");

      onAddMusic();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la musique :", error);
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          console.error("Réponse du serveur :", axiosError.response.data);
        } else if (axiosError.request) {
          console.error("Pas de réponse reçue du serveur");
        } else {
          console.error("Erreur de configuration de la requête :", axiosError.message);
        }
      }
    }
  };

  return (
    <div>
      <h2>Ajouter une musique</h2>
      <form>
        <label htmlFor="titre">
          Titre:
          <input
            id="titre"
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="chanteur">
          Chanteur:
          <input
            id="chanteur"
            type="text"
            value={chanteur}
            onChange={(e) => setChanteur(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="favoris">
          Favori:
          <input
            id="favoris"
            type="checkbox"
            checked={favoris}
            onChange={(e) => setFavoris(e.target.checked)}
          />
        </label>
        <br />
        <label htmlFor="sortie">
          Sortie:
          <input
            id="sortie"
            type="text"
            value={sortie}
            onChange={(e) => setSortie(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="lien">
          Lien YouTube:
          <input
            id="lien"
            type="text"
            value={lien}
            onChange={(e) => setLien(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddMusic}>
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default MusicForm;

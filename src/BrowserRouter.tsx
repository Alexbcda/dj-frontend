import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Connexion from './Connexion';
import Home from './Home';
import MusicForm from "./MusicForm";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/ajouter-musique" element={<MusicForm/>} />
      </Routes>
    </Router>
  );
};


export default App;

import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
//import ThreeParticles from './component/ThreeParticles';
import ParticleTutorial from "./component/ThreeParticles";
import ScenarioModal from "./components/ScenarioModal";
import NicknameModal from "./component/NicknameModal";
import StoryModal from "./components/StoryModal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/modal" element={<ScenarioModal />} />
        <Route path="/nicknamemodal" element={<NicknameModal />} />
        <Route path="/landingpage" element={<LandingPage />}></Route>
        <Route path="/three" element={<ParticleTutorial />} />
        <Route path="/story" element={<StoryModal />} />
      </Routes>
    </Router>
  );
};

export default App;

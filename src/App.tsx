import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
//import ThreeParticles from './component/ThreeParticles';
import ParticleTutorial from "./component/ThreeParticles";
import NicknameModal from "./component/NicknameModal";
import StoryModal from "./components/StoryModal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/scenario" element={<ScenarioPage />} />
        <Route path="/nicknamemodal" element={<NicknameModal />} />
        <Route path="/landingpage" element={<LandingPage />}></Route>
        <Route path="/three" element={<ParticleTutorial />} />
        <Route path="/story" element={<StoryModal />} />
      </Routes>
    </Router>
  );
};

export default App;

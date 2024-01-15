import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
import ParticleTutorial from "./component/ThreeParticles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/scenario" element={<ScenarioPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/three" element={<ParticleTutorial />} />
      </Routes>
    </Router>
  );
};

export default App;

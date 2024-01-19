import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import LandingPage from "./component/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
import ParticleTutorial from "./component/ThreeParticles";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/scenario" element={<ScenarioPage />} />
          <Route path="/three" element={<ParticleTutorial />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;

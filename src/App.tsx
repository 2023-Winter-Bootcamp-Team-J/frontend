import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
import ParticleTutorial from "./components/ThreeParticles";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/scenario" element={<ScenarioPage />} />
          <Route path="/three" element={<ParticleTutorial />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;

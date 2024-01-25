import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import LandingPage from "./pages/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
import ParticleTutorial from "./components/ThreeParticles";
import Onboading3 from "./components/OnBoarding3";
import Onboading4 from "./components/Onboarding4";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/scenario/:rootId" element={<ScenarioPage />} />
          <Route path="/three" element={<ParticleTutorial />} />
          <Route path="/temp" element={<Onboading3 />} />
          <Route path="/temp2" element={<Onboading4 />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;

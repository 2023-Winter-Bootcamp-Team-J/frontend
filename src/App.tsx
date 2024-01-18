import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/MainPage";
import LandingPage from "./component/LandingPage";
import ScenarioPage from "./pages/ScenarioPage";
import ParticleTutorial from "./component/ThreeParticles";
import NicknameModal from "./component/NicknameModal";
import Navbar from "./components/Navbar";

const App = () => {
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);

  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/scenario" element={<ScenarioPage />} />
          <Route path="/three" element={<ParticleTutorial />} />
        </Routes>

        {isNicknameModalOpen && (
          <NicknameModal
            isOpen={true}
            onClose={() => setNicknameModalOpen(false)}
          />
        )}
        <Navbar />
      </Router>
    </RecoilRoot>
  );
};

export default App;

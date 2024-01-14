// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LandingPage from './component/LandingPage';
import ParticleTutorial from './component/ThreeParticles';
import ScenarioModal from './components/ScenarioModal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/modal" element={<ScenarioModal />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/three" element={<ParticleTutorial />} />
      </Routes>
    </Router>
  );
};

export default App;

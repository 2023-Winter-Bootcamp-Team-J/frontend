import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ScenarioModal from "./components/ScenarioModal";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/modal" element={<ScenarioModal />} />
      </Routes>
    </Router>
  );
};

export default App;

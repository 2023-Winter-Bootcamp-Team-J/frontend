import ParticleTutorial from "@/components/ThreeParticles";
import ForceGraph from "@/components/ForceGraph";
import Navbar from "@/components/Navbar";
// import { useLocation } from "react-router-dom";

const ScenarioPage = () => {
  // const location = useLocation();
  // const state = location.state as { story_id: number };
  // const story_id = state.story_id;
  const story_id = 9;

  return (
    <div>
      <ParticleTutorial />
      <div className="flex w-[100vw] h-[100vh] flex-col justify-center items-center absolute top-1/2 left-1/2 z-1 bg-transparent -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col w-full h-full gap-[50px]">
          <Navbar />
          {/* <div className="bg-white flex justify-center items-center w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"> */}
          <div className="w-[800px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ForceGraph storyId={story_id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPage;

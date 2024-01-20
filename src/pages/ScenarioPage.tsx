import ParticleTutorial from "@/components/ThreeParticles";
import ForceGraph from "@/components/ForceGraph";
import Navbar from "@/components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

const ScenarioPage = () => {
  const location = useLocation();
  const state = location.state as { story_id: number };
  const story_id = state.story_id;
  // const story_id = 9;
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

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
      <div
        onClick={handleClickBack}
        className="w-[50px] h-[50px] text-white absolute left-8 bottom-8"
      >
        <svg
          className="hover:scale-125 hover:opacity-35 h-full drop-shadow"
          style={{
            filter: "drop-shadow(7px 1px 8px rgba(255, 255, 255, 0.7))",
          }}
          data-slot="icon"
          fill="none"
          stroke-width="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ScenarioPage;

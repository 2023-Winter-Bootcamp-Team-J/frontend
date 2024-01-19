import ParticleTutorial from "@/component/ThreeParticles";
import ForceGraph from "@/components/ForceGraph";

const ScenarioPage = () => {
  return (
    <div className="flex items-center relative w-[100%] h-[100%]">
      <ParticleTutorial />
      {/* <div className="bg-white flex justify-center items-center w-[200px] h-[200px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"> */}
      <div className="w-[800px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ForceGraph />
      </div>
    </div>
  );
};

export default ScenarioPage;

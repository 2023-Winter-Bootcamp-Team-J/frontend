import ParticleTutorial from "@/component/ThreeParticles";
import ForceGraph from "@/components/ForceGraph";

const ScenarioPage = () => {
  return (
    <div className="flex items-center w-[100vw] h-[100vh]">
      <ParticleTutorial />
      <div className="flex justify-center items-center w-[100vw] h-[100vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <ForceGraph />
      </div>
    </div>
  );
};

export default ScenarioPage;

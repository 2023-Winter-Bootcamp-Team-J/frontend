import d3ver5 from "../../public/asset/d3ver5.svg";
import { motion } from "framer-motion";

const Onboarding3 = () => {
  const style = {
    width: "100vw",
    height: "960px",
    overflow: "hidden",
    // backgroundImage: `url(${backgroundImageUrl})`,
    // backgroundSize: "cover", // 이미지를 커버하도록 설정
    // backgroundPosition: "center", // 이미지를 중앙에 두기
    // backgroundRepeat: "no-repeat", // 이미지를 반복하지 않도록 설정
  };

  return (
    <div
      className="flex justify-center items-center relative p-[50px] text-center whitespace-nowrap font-['NextPage'] text-white"
      style={style}
    >
      <div className="relative w-[1000px] min-w-[1000px] h-[600px] m-[50ox] text-[45px]">
        {" "}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <span className="text-left absolute top-0 left-[-40px] z-10 animate-scale-up-ver-top">
            직접 만드는
            <br />
            나만의 <span className="text-[#7AFF8F]">멀티버스</span>
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 70, y: -30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 0.4,
          }}
        >
          <img
            // className="absolute top-[-360px] left-[400px] w-[1000px] animate-slide-left"
            className="absolute top-[-360px] left-[400px] w-[1000px] animate-slide-bl"
            style={{
              filter: "drop-shadow(0 0 14px rgba(255, 255, 255, 0.424))",
            }}
            src={d3ver5}
            alt="d3"
          />
        </motion.div>
      </div>
    </div>
  );
};
export default Onboarding3;

import { motion } from "framer-motion";
import createModal from "../../public/asset/createmodal.png";
import storyModal from "../../public/asset/storymodal.png";
import grid from "../../public/asset/grid.png";

interface Onboaring4Props {
  topScroll: any;
}

const Onboarding4: React.FC<Onboaring4Props> = ({ topScroll }) => {
  const style = {
    width: "100vw",
    height: "960px",
    overflow: "hidden",
  };

  return (
    <div
      className="relative flex justify-center items-center p-[50px] text-[40px] text-white"
      style={style}
    >
      <div className="w-[1000px] min-w-[900px] h-[600px] flex justify-between items-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <div
            className="animate-flip-vertical-fwd relative"
            style={{
              transformStyle: "preserve-3d", // 양면이 있는 3d 박스임을 명시
            }}
          >
            <img
              className="w-[400px] z-1"
              style={{
                backfaceVisibility: "hidden", // 뒷면이 보이지 않게
              }}
              src={createModal}
              alt="생성 모달"
            />
            <img
              className="w-[400px] absolute top-0 left-0"
              style={{
                transform: "rotateY(180deg) translateZ(1px)", // 미리 뒤집어 놓기
                filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.424))",
              }}
              src={storyModal}
              alt="스토리 모달"
            />
          </div>
        </motion.div>
        <div className="flex flex-col">
          <span className="text-right animate-scale-up-ver-top mt-[20px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.5,
              }}
            >
              다양한 <span className="text-[#7AFF8F]">세계관</span>을<br />
              지금 만들어 보세요
            </motion.div>
          </span>
          <button
            onClick={() => {
              window.scrollTo({
                top: topScroll.current.offsetTop,
                left: 0,
                behavior: "smooth",
              });
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                delay: 1,
              }}
            >
              <img
                className="w-[120px] flex ml-[110px] mt-[40px]  animate-bounce hover:scale-125"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.424))",
                }}
                src="/asset/arrow.svg"
                alt=""
              />
              <p className="text-green-400 text-[18px]">시작하러 가기</p>
            </motion.div>
          </button>
        </div>
      </div>
      <img
        className="absolute bottom-0 w-[2000px] h-[250px] object-cover object-top"
        src={grid}
        alt="그리드"
      />
    </div>
  );
};
export default Onboarding4;

import backgroundImageUrl from "../../public/asset/bg.png";
import createModal from "../../public/asset/createmodal.png";
import storyModal from "../../public/asset/storymodal.png";
import grid from "../../public/asset/grid.png";

const Onboading4 = () => {
  const style = {
    width: "100vw",
    height: "960px",
    overflow: "hidden",
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover", // 이미지를 커버하도록 설정
    backgroundPosition: "center", // 이미지를 중앙에 두기
    backgroundRepeat: "no-repeat", // 이미지를 반복하지 않도록 설정
  };

  return (
    <div
      className="relative flex justify-center items-center p-[50px] font-['NextPage'] text-[40px] text-white"
      style={style}
    >
      {/* 내용 */}
      <div className="w-[1000px] min-w-[900px] h-[600px] flex justify-between items-center z-10">
        <div
          className="animate-flip-card relative"
          style={{
            transformStyle: "preserve-3d", // 양면이 있는 3d 박스임을 명시
          }}
        >
          <img
            className="w-[480px] z-1"
            style={{
              backfaceVisibility: "hidden", // 뒷면이 보이지 않게
            }}
            src={createModal}
            alt="생성 모달"
          />
          <img
            className="w-[480px] absolute top-0 left-0"
            style={{
              transform: "rotateX(180deg) translateZ(1px)", // 미리 뒤집어 놓기
            }}
            src={storyModal}
            alt="스토리 모달"
          />
        </div>
        <span className="text-right animate-bounce">
          다양한 <span className="text-[#7AFF8F]">세계관</span>을<br />
          지금 만들어 보세요
        </span>
      </div>
      <img
        className="absolute bottom-0 w-[2000px] h-[250px] object-cover object-top"
        src={grid}
        alt="그리드"
      />
    </div>
  );
};
export default Onboading4;

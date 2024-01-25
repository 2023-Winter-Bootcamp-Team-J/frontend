import d3ver4 from "../../public/asset/d3ver4.png";

const Onboading3 = () => {
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
      {/* 내용 */}
      <div className="relative w-[1000px] min-w-[1000px] h-[600px] m-[50ox] text-[45px]">
        <span className="text-left absolute top-0 left-[-40px] z-10 animate-scale-up-ver-top">
          직접 만드는
          <br />
          나만의 <span className="text-[#7AFF8F]">멀티버스</span>
        </span>
        <img
          // className="absolute top-[-360px] left-[400px] w-[1000px] animate-slide-left"
          className="absolute top-[-360px] left-[400px] w-[1000px] animate-slide-bl"
          src={d3ver4}
          alt="d3"
        />
      </div>
    </div>
  );
};
export default Onboading3;

import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";

const SwiperComponent: React.FC<{ onSlideClick: (index: number) => void }> = ({
  onSlideClick,
}) => {
  useEffect(() => {
    const swiper = new Swiper(".Myswiper", {
      loop: true,
      loopAdditionalSlides: 1,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      mousewheel: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, bullet) {
          return `<div class="${bullet}  border-2 bg-transparent border-green-300 rounded-full" style="width: 40px; height: 16px; opacity: 1;"></div>`;
        },
      },
      modules: [EffectCoverflow, Navigation, Mousewheel, Pagination],
    });

    // 각 슬라이드에 클릭 이벤트 추가
    swiper.slides.forEach((slide, index) => {
      slide.addEventListener("click", () => onSlideClick(index));
    });
    return () => {
      // 컴포넌트 언마운트 시에 이벤트 리스너 제거
      swiper.slides.forEach((slide, index) => {
        slide.removeEventListener("click", () => onSlideClick(index));
      });

      swiper.destroy();
    };
  }, [onSlideClick]);

  return (
    <div className="swiper-container w-[1100px] pt-[10px] pb-[50px] Myswiper overflow-hidden block">
      <div className="swiper-wrapper">
        <div className="swiper-slide w-[400px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test.png"
            alt="슬라이드1"
            style={{
              filter: "drop-shadow(7px 1px 8px rgba(255, 252, 234, 0.759))",
            }}
          />
        </div>
        <div className="flex bg-center w-[400px] object-cover">
          <img
            className="w-full block drop-shadow(3px 3px 5px #ffffffb6)"
            src="/asset/test2.jpeg"
            alt="슬라이드2"
          />
        </div>
        <div className="swiper-slide w-[400px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test3.jpeg"
            alt="슬라이드3"
          />
        </div>
        <div className="swiper-slide w-[400px] flex bg-center object-cover">
          <img className="w-full block" src="/asset/test.png" alt="슬라이드1" />
        </div>
        <div className="swiper-slide w-[400px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test2.jpeg"
            alt="슬라이드2"
          />
        </div>
        <button className="swiper-slide w-[400px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test3.jpeg"
            alt="슬라이드3"
          />
        </button>
      </div>
      <div className="swiper-pagination bullet "></div>
    </div>
  );
};

export default SwiperComponent;

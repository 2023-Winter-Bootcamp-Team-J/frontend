import React, { useEffect } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";

const SwiperComponent: React.FC = () => {
  useEffect(() => {
    const swiper = new Swiper(".Myswiper", {
      loop: true,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 200,
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
      },
      modules: [EffectCoverflow, Navigation, Mousewheel, Pagination],
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <div className="swiper-container w-[1100px] Myswiper overflow-hidden block">
      <div className="swiper-wrapper">
        <div className="swiper-slide w-[450px] flex bg-center object-cover">
          <img className="w-full block" src="/asset/test.png" alt="슬라이드1" />
        </div>
        <div className="flex bg-center w-[450px] object-cover">
          <img
            className="w-full block"
            src="/asset/test2.jpeg"
            alt="슬라이드2"
          />
        </div>
        <div className="swiper-slide w-[450px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test3.jpeg"
            alt="슬라이드3"
          />
        </div>
        <div className="swiper-slide w-[450px] flex bg-center object-cover">
          <img className="w-full block" src="/asset/test.png" alt="슬라이드1" />
        </div>
        <div className="swiper-slide w-[450px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test2.jpeg"
            alt="슬라이드2"
          />
        </div>
        <div className="swiper-slide w-[450px] flex bg-center object-cover">
          <img
            className="w-full block"
            src="/asset/test3.jpeg"
            alt="슬라이드3"
          />
        </div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default SwiperComponent;

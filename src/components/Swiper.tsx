import React, { useEffect, useState } from "react";
import axios from "axios";
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

interface SwiperComponentProps {
  onSlideClick: (index: number, storyId: string) => void;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({ onSlideClick }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const RootStory = async () => {
      try {
        const response = await axios.get(`/api/v1/stories/`);
        if (response.status === 200) {
          console.log(response.data.message);
          const stories = response.data.data;
          setStories(stories);
        }
      } catch (error) {
        console.error("루트 스토리 조회 중 에러 발생");
      }
    };

    if (stories.length === 0) {
      RootStory();
    }

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
      slide.addEventListener("click", () =>
        onSlideClick(index, stories[index].story_id)
      );
    });
    return () => {
      // 컴포넌트 언마운트 시에 이벤트 리스너 제거
      swiper.slides.forEach((slide, index) => {
        slide.removeEventListener("click", () =>
          onSlideClick(index, stories[index].story_id)
        );
      });

      swiper.destroy();
    };
  }, [onSlideClick, stories]);

  return (
    <div className="swiper-container w-[1100px] pt-[10px] pb-[50px] Myswiper overflow-hidden block">
      <div className="swiper-wrapper">
        {stories.map((story, index) => (
          <div className="swiper-slide w-[400px] flex bg-center object-cover">
            <img
              className="w-full block"
              src={story.image_url}
              alt={`슬라이드${index + 1}`}
              style={{
                filter: "drop-shadow(7px 1px 8px rgba(255, 252, 234, 0.759))",
              }}
            />
          </div>
        ))}
      </div>
      <div className="swiper-pagination bullet "></div>
    </div>
  );
};

export default SwiperComponent;

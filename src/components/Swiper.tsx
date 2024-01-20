import React, { useEffect, useState } from "react";
// import axios from "axios";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import RootModal from "@/components/RootModal";
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
  // 선택된 슬라이드의 인덱스를 기억하는 상태
  const [slideIndex, setSlideIndex] = useState<number | null>(null);
  const [storyId, setStoryId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stories, setStories] = useState<any[]>([]);
  const [storyOpen, setStoryOpen] = useState(false);

  //스토리 모달 관련 함수
  const closeStory = () => {
    setStoryOpen(false);
  };
  const openStory = () => {
    setStoryOpen(true);
  };
  useEffect(() => {
    // slideIndex가 변경될 때마다 해당 값을 출력
  }, [slideIndex]);

  // 스와이퍼 슬라이드를 클릭할 때 스토리 모달 열도록 하는 함수
  const handleSlideClick = (index: number) => {
    setSlideIndex(index);
    setStoryId(stories[index]?.story_id || null);
    openStory();
    onSlideClick(index, stories[index]?.story_id || ""); // MainPage의 handleSlideClick 호출
    setStories(stories); //임시로..
  };

  // useEffect(() => {
  //   const RootStory = async () => {
  //     try {
  //       const response = await axios.get(`/api/v1/stories/`);
  //       if (response.status === 200) {
  //         console.log(response.data.message); //전체 루트 스토리 조회
  //         const stories = response.data.data;
  //         setStories(stories);
  //       }
  //     } catch (error) {
  //       console.error("루트 스토리 조회 중 에러 발생");
  //     }
  //   };

  //   if (stories.length === 0) {
  //     RootStory();
  //   }

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
      renderBullet: function (_index, bullet) {
        return `<div class="${bullet}  border-2 bg-transparent border-green-300 rounded-full" style="width: 40px; height: 16px; opacity: 1;"></div>`;
      },
    },
    modules: [EffectCoverflow, Navigation, Mousewheel, Pagination],
  });

  // 각 슬라이드에 클릭 이벤트 추가
  swiper.slides.forEach((slide, index) => {
    slide.addEventListener("click", () => handleSlideClick(index));
  });

  // return () => {
  //   swiper.slides.forEach((slide, index) => {
  //     slide.removeEventListener("click", () => handleSlideClick(index));
  //   });

  //   swiper.destroy();
  // };

  return (
    <div>
      <div className="swiper-container w-[1100px] pt-[10px] pb-[50px] Myswiper overflow-hidden block">
        <div className="swiper-wrapper">
          {stories.map((story, index) => (
            <div
              key={index}
              className="swiper-slide w-[400px] flex bg-center object-cover"
              onClick={() => handleSlideClick(index)}
            >
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
      {storyOpen && (
        <RootModal
          isOpen={storyOpen}
          closeStory={() => {
            closeStory();
            setSlideIndex(null);
          }}
          storyId={storyId || ""}
        />
      )}
    </div>
  );
};
export default SwiperComponent;

import React, { useEffect, useState } from "react";
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
  stories: {
    story_id: number;
    user_id: number;
    user_nickname: string;
    content: string;
    image_url: string;
  }[];
  modalOpen: boolean;
}

const SwiperComponent: React.FC<SwiperComponentProps> = ({
  stories,
  modalOpen,
}) => {
  const [storyId, setStoryId] = useState<number>(0);
  const [storyOpen, setStoryOpen] = useState(false);

  //스토리 모달 관련 함수
  const closeStory = () => {
    setStoryOpen(false);
  };
  const openStory = () => {
    setStoryOpen(true);
  };

  const handleClickRoot = (story: {
    story_id: number;
    user_id: number;
    user_nickname: string;
    content: string;
    image_url: string;
  }) => {
    console.log("story: ", story);
    setStoryId(story.story_id);
    openStory();
  };

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
          // index가 빠지면 불렛 중앙 정렬이 해제됨
          return `<div class="${bullet} border-2 bg-transparent border-green-300 rounded-full" style="width: 40px; height: 16px; opacity: 1;"></div>`;
        },
      },
      modules: [EffectCoverflow, Navigation, Mousewheel, Pagination],
    });
  }, [stories]);

  return (
    <div>
      <div className="swiper-container w-[1100px] pt-[10px] pb-[50px] Myswiper overflow-hidden block">
        <div className="swiper-wrapper">
          {stories.map((story, index) => (
            <div
              key={index}
              className="swiper-slide w-[400px] flex bg-center object-cover"
              onClick={() => handleClickRoot(story)}
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
          }}
          storyId={storyId}
        />
      )}
    </div>
  );
};
export default SwiperComponent;

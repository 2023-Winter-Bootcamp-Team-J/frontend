import React, { useState, useEffect } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js";

interface CarouselProps {
  images: string[];
  onCurrentIndexChange: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  onCurrentIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [countImages, setCountImages] = useState(0); // 추가

  // useEffect를 사용하여 images가 업데이트될 때마다 currentIndex를 0으로 설정
  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(images.length - 1);
    }
  }, [images]);

  useEffect(() => {
    onCurrentIndexChange(currentIndex);
  }, [currentIndex, onCurrentIndexChange, images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    // console.log(currentIndex + 1);
  };
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="flex w-full">
      <div className="relative w-[350px] h-[350px] overflow-hidden">
        {images.map((image, index) => (
          <div key={index}>
            {image ? (
              <img
                className={`w-full h-full object-cover transition-transform duration-300 transform ${
                  index === currentIndex ? "" : "hidden"
                }`}
                src={image}
                alt={`Image ${index + 1}`}
              />
            ) : (
              <p>Image</p>
            )}
          </div>
        ))}
      </div>{" "}
      {images.length > 1 && (
        <>
          <button
            className="absolute z-10 top-[37%] left-[1rem] transform -translate-y-1/2 text-white text-6xl"
            onClick={prevImage}
          >
            &#8249;
          </button>
          <div className="absolute z-10 text-white"></div>
          <button
            className="absolute z-10 top-[37%] right-[1rem] transform -translate-y-1/2 text-white text-6xl"
            onClick={nextImage}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;

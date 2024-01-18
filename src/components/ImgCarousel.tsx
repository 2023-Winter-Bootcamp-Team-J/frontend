import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect를 사용하여 images가 업데이트될 때마다 currentIndex를 0으로 설정
  useEffect(() => {
    setCurrentIndex(images.length - 1);
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    console.log(currentIndex);
  };
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="relative w-[270px] h-[270px] overflow-hidden"
      style={{ filter: "drop-shadow(0px 6px 17px rgba(255, 255, 255, 0.3))" }}
    >
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
      <button
        className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2 text-white text-5xl"
        onClick={prevImage}
      >
        &#8249;
      </button>
      <button
        className="absolute z-10  top-1/2 right-4 transform -translate-y-1/2 text-white text-5xl"
        onClick={nextImage}
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;

import React, { useState } from "react";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-[270px] h-[270px] overflow-hidden">
      <img
        className="w-full h-full object-cover transition-transform duration-300 transform"
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
      />
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

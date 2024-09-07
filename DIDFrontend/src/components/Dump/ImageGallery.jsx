import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  PauseCircle,
  PlayCircle,
} from "@phosphor-icons/react";

const images = [
  "https://cbpssubscriber.mygov.in/assets/uploads/juGajmc1gOVBUtt5?57",
  "https://cdn.s3waas.gov.in/s3c361bc7b2c033a83d663b8d9fb4be56e/uploads/2022/08/2022082426.jpg",
  "https://cdn.s3waas.gov.in/s3c361bc7b2c033a83d663b8d9fb4be56e/uploads/2021/02/2021020877.jpeg",
  "https://cdn.s3waas.gov.in/s3c361bc7b2c033a83d663b8d9fb4be56e/uploads/2018/08/2018080878.jpg",
  "https://cdn.s3waas.gov.in/s3c361bc7b2c033a83d663b8d9fb4be56e/uploads/2018/08/2018080824.jpg",
  "https://cdn.s3waas.gov.in/s3c361bc7b2c033a83d663b8d9fb4be56e/uploads/2018/08/2018080887.jpg"

];

const Slide = ({ image }) => (
  <motion.img
    src={image}
    alt="Slide"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    // style={{
    //   width: "100vw", // Adjust width as needed
    //   height: "450px", // Adjust height as needed
    //   objectFit: "cover", // Use 'cover' to fit as an object weight="duotone"
    // }}
    className="w-full h-60 sm:h-[450px] object-cover"
  />
);

const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [currentImage, isPaused]);

  return (
    <div className="flex flex-col">
      <Slide image={images[currentImage]} />
      <div className="flex items-center justify-around my-2">
        <button onClick={handlePrev}>
          <ArrowCircleLeft width={28} height={28} weight="duotone" />
        </button>
        <button onClick={handlePause}>
          {isPaused ? (
            <PlayCircle width={28} height={28} weight="duotone" />
          ) : (
            <PauseCircle width={28} height={28} weight="duotone" />
          )}
        </button>
        <button onClick={handleNext}>
          <ArrowCircleRight width={28} height={28} weight="duotone" />
        </button>
      </div>
    </div>
  );
};

export default ImageCarousel;

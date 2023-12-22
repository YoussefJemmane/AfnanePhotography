import React from 'react'

import Image from "next/image";
import img1 from "../../../../public/nouveaune/IMG20231005165037.webp";
import img2 from "../../../../public/nouveaune/imp-2.webp";
import img3 from "../../../../public/nouveaune/im-1.webp";


import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";

import { useState, useRef, useEffect } from "react";


interface SplideRef {
  splide: {
    on: (event: string, callback: () => void) => void;
    go: (index: number) => void;
    index: number;
  };
}
const Slider = () => {
  const images = [img1, img2, img3];
  const [activeSlide, setActiveSlide] = useState(0);
  const splideRef = useRef<SplideRef | null>(null);

  const handleImageClick = (index: any) => {
    if (splideRef.current) {
      splideRef.current.splide.go(index);
    }
  };

  useEffect(() => {
    if (splideRef.current) {
      splideRef.current.splide.on('moved', () => {
        if (splideRef.current) {
          setActiveSlide(splideRef.current.splide.index);
        }
      });
    }
  }, []);
  return (
    <div>
      <div className="relative">
        <div
          className="h-[745px] bg-cover bg-center"
        >
          <Splide ref={splideRef} aria-label="My Favorite Images">
            {images.map((img, index) => (
              <SplideSlide key={index}>
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="h-[745px] object-scale-down "
                  loading="lazy"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className=" mt-4">
          <div className="grid grid-cols-3 gap-x-1">
            {images.map((img, index) => (
              <div key={index} onClick={() => handleImageClick(index)} className="">
                <Image
                  src={img}
                  alt={`Image ${index + 1}`}
                  layout="fixed"
                  className={`object-scale-down h-[120px] ${index === activeSlide ? '' : 'grayscale'}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Slider
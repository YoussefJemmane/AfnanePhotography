"use client"

import Navbar from "@/components/Navbar";

import React from "react";
import Image from "next/image";
import img1 from "../../../../public/_MG_1641.jpg";
import img2 from "../../../../public/imp2.jpg";
import img3 from "../../../../public/_MG_0444.jpg";
import img4 from "../../../../public/_MG_1107.jpg";

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

const NouveauNe = () => {
  const images = [img1, img2, img3, img4];
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
      <Navbar />
      <div className="relative">
        <div
          className="h-[745px] bg-cover bg-center"
          id="home"
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
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div key={index} onClick={() => handleImageClick(index)}>
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={100}
                height={100}
                className={`object-cover ${index === activeSlide ? '' : 'grayscale'}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NouveauNe;
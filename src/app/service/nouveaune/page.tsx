"use client"

import Navbar from "@/components/Navbar";

import React from "react";
import Image from "next/image";
import img1 from "../../../../public/IMG20231005165037.jpg";
import img2 from "../../../../public/imp2.jpg";
import img3 from "../../../../public/im1.jpg";


import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/service/nouveaune/Header";

interface SplideRef {
  splide: {
    on: (event: string, callback: () => void) => void;
    go: (index: number) => void;
    index: number;
  };
}

const NouveauNe = () => {
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7" id="nouveaune">
        <Header />
        <div className="pt-4">
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
              <div className="flex justify-around gap-4">
                {images.map((img, index) => (
                  <div key={index} onClick={() => handleImageClick(index)} className="">
                    <Image
                      src={img}
                      alt={`Image ${index + 1}`} 
                      layout="fixed"
                      className={`object-cover w-[100px] ${index === activeSlide ? '' : 'grayscale'}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NouveauNe;
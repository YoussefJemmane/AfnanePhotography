"use client"
import React from 'react'
import Image from 'next/image'
import img1 from '../../public/_MG_1641.jpg'
import img2 from '../../public/imp2.jpg'
import img3 from '../../public/_MG_0444.jpg'
import img4 from '../../public/_MG_1107.jpg'
import bannier from '../../public/banniere.jpg'
import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import 'splide-nextjs/splide/dist/css/themes/splide-default.min.css';

const Slider = () => {
  const images = [img1, img2, img3, img4]
  return (
    <div className='h-[745px] bg-cover bg-center' style={{ backgroundImage: `url(${bannier.src})` }}  id='home'>
      <Splide aria-label="My Favorite Images">
        {images.map((img, index) => (
          <SplideSlide key={index}>
            <Image src={img} alt={`Image ${index + 1}`} className='h-[745px] object-scale-down ' loading="lazy"/>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}

export default Slider
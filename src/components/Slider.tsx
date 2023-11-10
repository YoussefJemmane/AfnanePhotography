"use client"
import React from 'react'
import Image from 'next/image'
import img1 from '../../public/_MG_1641.jpg'
import img2 from '../../public/imp2.jpg'
import img3 from '../../public/_MG_0444.jpg'
import img4 from '../../public/_MG_1107.jpg'


import { Splide, SplideSlide } from 'splide-nextjs/react-splide';
import 'splide-nextjs/splide/dist/css/themes/splide-default.min.css';



const Slider = () => {
  const images = [img1, img2, img3, img4]
  return (
    <div className=' h-[745px]'>
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <Image src={img1} alt="Image 1" className='h-[745px]'/>
        </SplideSlide>
        <SplideSlide>
          <Image src={img2} alt="Image 2"  className='h-[745px]'/>
        </SplideSlide> 
        <SplideSlide>
          <Image src={img3} alt="Image 3" className='h-[745px]'/>
        </SplideSlide>
        <SplideSlide>
          <Image src={img4} alt="Image 4" className='h-[745px]'/>
        </SplideSlide>
      </Splide>
    </div>
  )
}

export default Slider
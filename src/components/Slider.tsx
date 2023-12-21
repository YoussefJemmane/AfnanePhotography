"use client"
import React from 'react'
import Image from 'next/image'

import img2 from '../../public/logo-FINAL-afnane.webp'

import bannier from '../../public/banniere.jpg'

const Slider = () => {
 
  return (
    <div className='h-[745px] bg-cover bg-center' style={{ backgroundImage: `url(${bannier.src})` }}  id='home'>
      
        <div className='flex justify-center '>
            <Image src={img2} alt={`Image`} className='h-[745px] object-scale-down ' loading="lazy"/>

        </div>
      
    </div>
  )
}

export default Slider
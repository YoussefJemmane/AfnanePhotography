"use client"
import React from 'react'
import Image from 'next/image'

import bannier from '../../public/banniere.webp'

const Slider = () => {

  return (
    <div className='' id='home'>

      <Image
        src={bannier}
        alt="banniere"
        className='image bg-cover bg-center'
        loading='lazy'
      />
    </div>
  )
}

export default Slider
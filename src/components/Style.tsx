import React from 'react'
import Image from 'next/image'
import img1 from '../../public/famille/PhotosAccueil-003.webp'

export const Style = () => {
  return (
    <div className='max-w-768 mx-auto' id='monstyle'>
      <div className='flex flex-col b1:flex-row b1:flex-wrap'>
        <div className='pl-8 b1:pl-32 pt-24 pr-8 b1:pr-32'>
          <h1 className='monstyle text-3xl b1:max-w-768 flex justify-center'>Mon Style</h1>
          <div className='pt-5 grid b1:grid-cols-2 grid-cols-1'>
            <p className='order-1 b1:order-1 b1:pr-0 text-lg'>Je vous propose des séances photos personnalisées et uniques, pour une expérience mémorable. J’ai à cœur de créer pour vous des moments doux, joyeux et simples pour capturer une série de portraits naturels et intimes de votre bébé et de votre famille. Je vous accompagnerai dans le choix du style de vos photos, la sélection des mises en scène et des couleurs. Je mettrai à votre disposition un ensemble de bloomers, habits, bonnets, bandeaux pour les filles et wraps, et je vous montrerai les accessoires et les décors que j’ai prévus. Nous affinerons ensemble, en fonction de vos goûts, et de ce que vous avez apporté.</p>
            <div className=' b1:pt-0 pt-10  b1:pl-40 order-2 b1:order-2'>
              <Image src={img1} alt="Image 1" className='w-full b1:w-144 border' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
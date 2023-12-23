import Image from 'next/image';
import img1 from "../../public/poster/noueau né.webp";
import img2 from '../../public/poster/bebe.webp'
import img3 from '../../public/poster/smash cake.webp'
import img4 from '../../public/poster/grossesse.webp'
import img5 from '../../public/poster/famille.webp'
import img6 from '../../public/poster/Professional .webp'
import img7 from '../../public/poster/mode.webp'
import Link from 'next/link';
const services = [
  {
    name: "Nouveau Né",
    image: img1,
    href: '/service/nouveaune',
  },
  {
    name: "Bébé",
    image: img2,
    href: '/service/bebe',
  },
  {
    name: "Smash Cake",
    image: img3,
    href: '/service/smashcake',
  },
  {
    name: "Grossesse",
    image: img4,
    href: '/service/grossesse',
  },
  {
    name: "Famille",
    image: img5,
    href: '/service/famille',
  },
  {
    name: "Professional",
    image: img6,
    href: '/service/proffesional',
  },
  {
    name: "Mode",
    image: img7,
    href: '/service/mode',
  }
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services">
      <div className="pt-24">
        <h1 className="services text-3xl text-center w-full">Services</h1>
        <div className='flex justify-center py-5   text-lg'>
          <p>What Services do you like to choose?</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Link href={service.href ? service.href : '/'} key={index}>
              <div className="relative group aspect-ratio-16/9">
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={225}
                  layout="responsive" // Add this line
                  quality={75} // Adjust the quality as needed
                  objectFit="cover"
                  className="border image"
                  sizes={`(max-width: 600px) 480px, 800px`}
                />
                <div className="flex justify-center items-center absolute inset-0 bg-black bg-opacity-0 text-white transition-all duration-500 ease-in-out group-hover:bg-opacity-50">
                  <h1 className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xl">{service.name}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
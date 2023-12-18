import Image from 'next/image';
import img1 from "../../public/IMG20231005165037.jpg";
import img2 from '../../public/_MG_1107.jpg'
import img3 from '../../public/_MG_1641.jpg'
import imagenotfound from '../../public/imagenotfound.png'
import img4 from '../../public/PhotosAccueil-003.jpg'
import img5 from '../../public/T2 002 .jpg'
import Link from 'next/link';
const services = [
  {
    name: "Nouveau Né",
    image: img1,
    href : 'service/nouveaune',
  },
  {
    name: "Bébé",
    image: img2,
    position: 'center top'
  },
  {
    name: "Smash Cake",
    image: img3,
  },
  {
    name: "Grossesse",
    image: imagenotfound,
  },
  {
    name : "Famille",
    image : img4,
  },
  {
    name : "Professional",
    image : imagenotfound,
  },
  {
    name : "Mode",
    image : img5,
    position: 'center top'

  }
];

export const Services = () => {
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
            <div  className="h-64 sm:h-96 relative group">
              <Image src={service.image} alt={service.name} layout="fill" objectFit="cover" objectPosition={service.position ? service.position : 'center'} className='border'/>
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
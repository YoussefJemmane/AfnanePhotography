"use client";

import img1 from "../../public/bebe/MG_1107.webp";
import img2 from "../../public/bebe/MG_1180.webp";
import img3 from "../../public/bebe/MG_1205.webp";
import img4 from "../../public/famille/PhotosAccueil-003.webp";
import img5 from "../../public/famille/one-happy-family.webp";
import img6 from "../../public/famille/photo-smiling-young-parents-with-little-child-lying-floor-isolated.webp";
import img7 from "../../public/grossesse/beauty-glamour-young-pregnant-woman-blue-chiffon-blue.webp";
import img8 from "../../public/grossesse/pregnant-woman-pink-dress-holds-hands-her-belly(1).webp";
import img9 from "../../public/mode/_MG_0444.webp";
import img10 from "../../public/mode/T2 002 .webp";
import img11 from "../../public/mode/T3 003.webp";
import img12 from "../../public/nouveaune/IMG20231005165037.webp";
import img13 from "../../public/nouveaune/imp-2.webp";
import img14 from "../../public/nouveaune/im-1.webp";
import img15 from "../../public/proffesional/0 (1).webp";
import img16 from "../../public/proffesional/0.webp";
import img17 from "../../public/proffesional/_MG_2072.webp";
import img18 from "../../public/smashcake/MG_1641.webp";
import img19 from "../../public/smashcake/MG_1604.webp";
import img20 from "../../public/smashcake/MG_1571.webp";
import Image from 'next/image';
import { useState } from "react";
import { StaticImageData } from 'next/image';
const images = [
  { src: img1, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
  { src: img5, alt: "Image 5" },
  { src: img6, alt: "Image 6" },
  { src: img7, alt: "Image 7" },
  { src: img8, alt: "Image 8" },
  { src: img9, alt: "Image 9" },
  { src: img10, alt: "Image 10" },
  { src: img11, alt: "Image 11" },
  { src: img12, alt: "Image 12" },
  { src: img13, alt: "Image 13" },
  { src: img14, alt: "Image 14" },
  { src: img15, alt: "Image 15" },
  { src: img16, alt: "Image 16" },
  { src: img17, alt: "Image 17" },
  { src: img18, alt: "Image 18" },
  { src: img19, alt: "Image 19" },
  { src: img20, alt: "Image 20" },
];



type ImageType = {
  src: StaticImageData;
  alt: string;
};

type LightboxProps = {
  src: StaticImageData;
  alt: string;
  onClose: () => void;
};


const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 ">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose} />
      <div className="dialog max-w-md mx-auto rounded overflow-hidden shadow-lg relative bg-white flex items-center justify-center">
        <Image src={src} alt={alt} layout="responsive" className="images" loading="lazy" />
      </div>
    </div>
  );
};





const Gallerie = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(images[index]);


  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto px-4"> {/* Center and add padding */}
      <h1 className="services text-3xl text-center mb-8">Gallerie</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Responsive grid */}
        {images.map((img, index) => (
          <button key={index} className="relative" onClick={() => openLightbox(index)}>
            <Image
              src={img.src}
              alt={img.alt}
              layout="fixed"
              className={`object-cover image h-[320px]`}
              loading="lazy"
              sizes={`(max-width: 600px) 480px, 800px`}
              data-lightbox="gallery"
            />
          </button>
        ))}

        {selectedImage && (
          <Lightbox src={selectedImage.src} alt={selectedImage.alt} onClose={closeLightbox} />
        )}
      </div>
    </div>
  )
}

export default Gallerie
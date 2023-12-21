import React from 'react';
import Image from 'next/image';
import logo from '../../public/logonoir.png';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-20 text-[#4D4D4D]" id="footer">
      <div className="pb-10 lg:pb-20 grid grid-cols-1 md:grid-cols-2">
        <div className="md:pr-4">
          <Image src={logo} alt="Logo" width={180} height={80} />
          <p className="text-xl pt-5 md:pt-10">
            Parlons un peu ! Si vous souhaitez en savoir plus, poser des questions ou bien réserver une séance, n&apos;hésitez pas à me contacter. Yousra elomari
          </p>
          <div className="flex gap-3 pt-5 md:pt-10">
            <Link href="https://www.facebook.com/afnanephotography">
              <FaFacebookF className="text-lg text-[#4D4D4D]" />
            </Link>
            <Link href="https://www.instagram.com/afnane.photography/">
              <FaInstagram className="text-xl text-[#4D4D4D]" />
            </Link>
            <Link href="https://www.linkedin.com/company/afnanphotography/">
            <FaLinkedin className="text-xl text-[#4D4D4D]" />
            </Link>
          </div>
        </div>
        <div className="md:pl-4 pt-5 md:pt-0">
          <h1 className="text-xl font-bold">Contact</h1>
          <div className="text-lg underline pt-2 md:pt-5 pl-0 md:pl-8">
            <p>
              <Link href="tel:0661615758">Phone: 0661 615 758</Link>
            </p>
            <p>
              <Link href="mailto:afnane.photography@gmail.com">Email: afnane.photography@gmail.com</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="pb-10">
        <hr />
      </div>
      <p className="pb-10 md:pb-20 flex justify-center text-center text-xl">
        All text and images © 2024 Afnane Photography Web Development by Youssef Jemmane
      </p>
    </div>
  );
};

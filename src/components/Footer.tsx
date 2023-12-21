import React from 'react';
import Image from 'next/image';
import logo from '../../public/logo-noir.webp';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-20 text-[#4D4D4D]" id="footer">
            <div className="pb-10 lg:pb-20 grid grid-cols-1 md:grid-cols-2">
                <div className="md:pr-4">
                    <Image src={logo} alt="Logo" width={180} height={80} />
                    <div className='pt-[15px]'>

                        <h1 className="text-xl font-bold">Contact</h1>
                    </div>

                    <p className="text-xl pt-[10px]">
                        Parlons un peu ! Si vous souhaitez en savoir plus, poser des questions ou bien réserver une séance, n&apos;hésitez pas à me contacter. Yousra elomari
                    </p>
                    <div className="flex gap-3 pt-[20px] md:pt-[20px]">
                        <Link href="https://www.facebook.com/afnanephotography">
                            <FaFacebookF className="text-lg text-[#4D4D4D]" />
                        </Link>
                        <Link href="https://www.instagram.com/afnane.photography/?igsh=MWRsa3hodTJwdmJtOA%3D%3D">
                            <FaInstagram className="text-xl text-[#4D4D4D]" />
                        </Link>
                        <Link href="https://www.linkedin.com/company/afnanphotography/">
                            <FaLinkedin className="text-xl text-[#4D4D4D]" />
                        </Link>
                    </div>
                    <div className="text-lg underline pt-[10px]">
                        <p>
                            <Link href="tel:0779793915">Phone: 0779 793 915</Link>
                        </p>
                        <p>
                            <Link href="mailto:afnane.photography@gmail.com">Email: afnane.photography@gmail.com</Link>
                        </p>

                    </div>
                </div>
                <div className="md:pl-4 pt-5 md:pt-0">

                    <div className="text-lg underline pt-2 md:pt-5 pl-0 md:pl-8">

                        <div className="map-container pt-[10px]">
                            <iframe
                                title="AFNANE Photography Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.848300429848!2d-6.590998885068165!3d34.2599267805445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda759a8080bc421%3A0x779d7cd26b2672ac!2sAFNANE%20Photography!5e0!3m2!1sen!2s!4v1632934280179!5m2!1sen!2s"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-10">
                <hr />
            </div>
            <p className="pb-10  flex justify-center text-center text-xl">
                All text and images © 2024 Afnane Photography Web Development by Youssef Jemmane
            </p>
        </div>
    );
};
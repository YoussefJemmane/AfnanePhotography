"use client"
import React, { useState } from 'react';
import Contact from './Contact';
import { useMediaQuery } from '@uidotdev/usehooks';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import logo from '../../public/logonoir.png'
import { AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
    const isSmallDevice = useMediaQuery('only screen and (max-width: 850px)');

    const [isOpened, setIsOpened] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
        console.log(showDetails)
    };

    const toggle = () => {
        setIsOpened(!isOpened);
    };

    return (
        <div className='sticky top-0 z-50 bg-white shadow-lg'>
            <Contact />
            {isSmallDevice ? (
                <div className='flex justify-between items-center px-4 py-2 '>
                    <div>
                        <Image src={logo} alt='Logo' width={120} height={40} />
                    </div>
                    <div className='bg-[#4D4D4D] text-[#FFFFFF] w-10 h-10 flex items-center justify-center'>
                        <button onClick={toggle}>
                            <RxHamburgerMenu size={24} />
                        </button>
                    </div>
                    {isOpened && (
                        <nav className='fixed top-0 left-0 h-screen w-full bg-white z-50'>
                            <div className=' float-right px-[30px] pt-[30px]'>
                                <button onClick={toggle}>

                                    <AiOutlineClose size={24} />
                                </button>
                            </div>
                            <ul className='flex flex-col items-center mt-16 space-y-4'>

                                <li>Home</li>
                                <li>Mon Style</li>
                                <li>
                                    <button onClick={toggleDetails}>

                                        Services

                                    </button>


                                </li>

                                <li>Pricing</li>
                                <li>Gallery</li>
                                <li>Contact Us</li>
                            </ul>
                        </nav>
                    )}
                    {showDetails && (
                        <nav className='fixed top-0 left-0 h-screen w-full bg-white z-50'>
                            <div className=' float-right px-[30px] pt-[30px]'>
                                <button onClick={toggleDetails}>

                                    <AiOutlineClose size={24} />
                                </button>
                            </div>
                            <ul className='flex flex-col items-center mt-16 space-y-4'>

                                <li>Newborns</li>
                                <li>Maternity</li>
                                <li>Family</li>
                                <li>Older Babies</li>
                                <li>Cake Smashes</li>

                            </ul>
                        </nav>
                    )}
                </div>
            ) : (
                <div className='h-[123px] flex justify-center'>
                    <nav className='flex items-center'>
                        <ul className='flex justify-center items-center space-x-6'>
                            <li>Home</li>
                            <li>Mon Style</li>
                            <li className='dropdown-menu'>
                                <button onMouseEnter={() => setShowDetails(true)}  onMouseLeave={() => setShowDetails(false)}>
                                    Services

                                </button>

                            {
                                showDetails && (
                                    <div className='border mt-2 absolute bg-white z-50' >
                                        <ul className='flex flex-col items-center space-y-4 p-[20px]'>
                                            <li>Newborns</li>
                                            <li>Maternity</li>
                                            <li>Family</li>
                                            <li>Older Babies</li>
                                            <li>Cake Smashes</li>
                                        </ul>
                                    </div>
                                )
                            }
                            </li>
                            <li>
                                <Image src={logo} alt='Logo' width={200} height={60} />
                            </li>
                            <li>Pricing</li>
                            <li>Gallery</li>
                            <li>Contact Us</li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;

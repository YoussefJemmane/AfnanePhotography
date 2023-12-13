"use client"

import React from 'react'
import { BsTelephoneFill } from 'react-icons/bs'
import { FiPhone } from 'react-icons/fi'
import { MdEmail, MdOutlineEmail } from 'react-icons/md'
import Link from 'next/link';
const Contact = () => {
    const [isSmallDevice, setIsSmallDevice] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsSmallDevice(window.matchMedia("only screen and (max-width : 768px)").matches);
        };
 
        window.addEventListener('resize', handleResize);
        handleResize();
 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
 
    const renderIcon = () => {
        if (isSmallDevice) {
            return (
                <div className=' bg-[#4D4D4D] text-[#FFFFFF] h-[50px] flex items-center justify-between px-[20px]'>
                    <div className=' bg-[#FFFFFF] text-[#4D4D4D] w-[26px] h-[26px] flex items-center justify-center' >
                        <Link href={`tel:0661615758`}>
                            <BsTelephoneFill />

                        </Link>
                    </div>
                    <div className=' bg-[#FFFFFF] text-[#4D4D4D] w-[26px] h-[26px] flex items-center justify-center' >
                        <Link href={`mailto:afnane.photography@gmail.com`}>
                            <MdEmail />

                        </Link>
                    </div>
                </div>

            )
        } else {
            return (
                <div className=' bg-[#4D4D4D] text-[#FFFFFF] h-[40px] flex items-center justify-around'>
                    <Link href={`tel:0661615758`}>
                        <div className="flex items-center ">
                            <div className='px-[8px] '>
                                <FiPhone />

                            </div>
                            <span>0661 615 758</span>
                        </div>
                    </Link>
                    <Link href={`mailto:afnane.photography@gmail.com`}>

                        <div className='flex items-center '>
                            <div className='px-[8px] '>
                                <MdOutlineEmail />
                            </div>
                            <span>afnane.photography@gmail.com</span>
                        </div>
                    </Link>
                </div>

            )
        }
    }

    return (
        <div>
            {renderIcon()}


        </div>
    )
}

export default Contact

"use client";

import React, { useState } from "react";
import Contact from "./Contact";
import Link from "next/link";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../public/logo-noir.webp";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [isSmallDevice, setIsSmallDevice] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallDevice(
        window.matchMedia("only screen and (max-width : 850px)").matches
      );
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isOpened, setIsOpened] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggle = () => {
    setIsOpened(!isOpened);
  };

  const handleLinkClick = () => {
    setIsOpened(false);
    setShowDetails(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <Contact />
      {isSmallDevice ? (
        <div className="flex justify-between items-center px-4 py-2 ">
          <div>
            <Link href="/#home" onClick={handleLinkClick}>
              <Image src={logo} alt="Logo" width={120} height={40} className="image" />
            </Link>
          </div>
          <div className="bg-[#4D4D4D] text-[#FFFFFF] w-10 h-10 flex items-center justify-center">
            <button onClick={toggle}>
              <RxHamburgerMenu size={24} />
            </button>
          </div>
          {isOpened && (
            <nav className="fixed top-0 left-0 h-screen w-full bg-white z-50">
              <div className=" float-right px-[30px] pt-[30px]">
                <button onClick={toggle}>
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <ul className="flex flex-col items-center mt-16 space-y-4">
                <li>
                  <Link href="/" onClick={handleLinkClick}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/#monstyle">
                    Mon Style
                  </Link>
                </li>
                <li>
                  <Link href="" onClick={toggleDetails}>
                    Services
                  </Link>
                </li>

                <li>
                  <Link onClick={handleLinkClick} href="/gallerie">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/#contactus">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {showDetails && (
            <nav className="fixed top-0 left-0 h-screen w-full bg-white z-50">
              <div className=" float-right px-[30px] pt-[30px]">
                <button onClick={toggleDetails}>
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <ul className="flex flex-col items-center mt-16 space-y-4">
                <li>
                  <Link onClick={handleLinkClick} href="/service/nouveaune">Nouveau né</Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/grossesse">Grossesse</Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/famille">Famille</Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/bebe">Bébé</Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/smashcake">Smash Cake</Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/mode">
                    Mode
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLinkClick} href="/service/proffesional">
                    Professional
                  </Link>
                </li>

              </ul>
            </nav>
          )}
        </div>
      ) : (
        <div className="h-[123px] flex justify-center">
          <nav className="flex items-center" onMouseLeave={() => setShowDetails(false)} >
            <ul className="flex justify-center items-center space-x-6">

              <li>
                <Link href="/#monstyle" onMouseEnter={() => setShowDetails(false)} >

                  Mon Style</Link>
              </li>
              <li className="dropdown-menu">
                <Link
                  href="/#services"
                  onMouseEnter={() => setShowDetails(true)}

                >
                  Services
                </Link>
                {showDetails && (
                  <div className="border mt-2 absolute bg-white z-50" onMouseLeave={() => setShowDetails(false)} >
                    <ul className="flex flex-col items-center space-y-4 p-[20px]">
                      <li>
                        <Link href="/service/nouveaune">Nouveau né</Link>
                      </li>
                      <li>
                        <Link href="/service/grossesse">Grossesse</Link>
                      </li>
                      <li>
                        <Link href="/service/famille">Famille</Link>
                      </li>
                      <li>
                        <Link href="/service/bebe">Bébé</Link>
                      </li>
                      <li>
                        <Link href="/service/smashcake">Smash Cake</Link>
                      </li>
                      <li>
                        <Link href="/service/mode">
                          Mode
                        </Link>
                      </li>
                      <li>
                        <Link href="/service/proffesional">
                          Professional
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link href="/" onMouseEnter={() => setShowDetails(false)} >
                  <Image src={logo} alt="Logo" width={200} height={60} className="image" />
                </Link>
              </li>

              <li>
                <Link href="/gallerie">Gallery</Link>
              </li>
              <li>
                <Link href="/#contactus">Contact Us</Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;

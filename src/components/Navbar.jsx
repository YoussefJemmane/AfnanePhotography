import logo from '../assets/logo noir.png'
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <nav className=" p-4 sticky bg-opacity-50 bg-pink-100  top-0 w-full z-10 animate-fade-right animate-once">
        <div className="flex justify-between items-center">
          <ul className="hidden lg:flex space-x-4 text-black">
            <li><a href="#mon_style">Mon Style</a> </li>
            <li>Les séances</li>
          </ul>
          <a href="#slider">

            <img src={logo} alt="" width={200} height={200} />
          </a>
          <ul className="hidden lg:flex space-x-4 text-black">
            <li>Galerie</li>
            <li>Les tarifs</li>
            <li>Contact</li>
          </ul>
          <button
            className="lg:hidden text-black"
            onClick={handleMobileMenuToggle}
          >
            {/* svg of a hamburger menu */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>

          </button>
        </div>
        {isMobileMenuOpen && (
          <ul className="lg:hidden bg-white px-4 py-2 my-4 space-y-2 animate-fade-down animate-once rounded-md"


          >
            <li><a href="#mon_style">Mon Style</a> </li>
            <li>Les séances</li>
            <li>Galerie</li>
            <li>Les tarifs</li>
            <li>Contact</li>
          </ul>
        )
        }
      </nav>
    </>
  );


}

export default Navbar;
import React, { Suspense } from "react";
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import logo from "../../public/logo-FINAL-afnane.webp"
import Image from "next/image";

export default function Home() {
  const Style = React.lazy(() => import("@/components/Style"));
  const Slider = React.lazy(() => import("@/components/Slider"));
  const Services = React.lazy(() => import("@/components/Services"));
  return (
    <>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">
        <Image src={logo} alt="logo" />
      </div>}>
        <Navbar />
        <div className='relative' >
          <Slider />
          <Style />
          <Services />
          <Footer />
        </div>
      </Suspense>

    </>
  )
}

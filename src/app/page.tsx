import React, { Suspense } from "react";
import { Footer } from '@/components/Footer'
import Navbar from '@/components/Navbar'
import logo from "../../public/logo-FINAL-afnane.webp"
import Image from "next/image";

const LazyStyle = React.lazy(() => import("@/components/Style"));
const LazySlider = React.lazy(() => import("@/components/Slider"));
const LazyServices = React.lazy(() => import("@/components/Services"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">
        <Image src={logo} alt="logo" />
      </div>}>
        <Navbar />
        <div className='relative' >
          <LazySlider />
          <LazyStyle />
          <LazyServices />
          <Footer />
        </div>
      </Suspense>
    </>
  )
}
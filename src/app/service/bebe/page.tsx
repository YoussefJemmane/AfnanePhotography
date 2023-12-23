import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import logo from "../../../../public/logo-FINAL-afnane.webp"
import Image from "next/image";

const LazyBebeHeader = React.lazy(() => import("@/components/service/bebe/Header"));
const LazyBebeSlider = React.lazy(() => import("@/components/service/bebe/Slider"));
const LazyBebeTarifs = React.lazy(() => import("@/components/service/bebe/Tarifs"));

const Bebe = () => {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">
        <Image src={logo} alt="logo" />
      </div>}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7" id="bebe">
          <LazyBebeHeader />
          <div className="pt-4">
            <LazyBebeSlider />
          </div>
          <div className="pt-4">
            <LazyBebeTarifs />
          </div>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Bebe;
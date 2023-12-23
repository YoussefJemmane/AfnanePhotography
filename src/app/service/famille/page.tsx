import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import logo from "../../../../public/logo-FINAL-afnane.webp"
import Image from "next/image";
const Famille = () => {
  const Header = React.lazy(() => import("@/components/service/famille/Header"));
  const Slider = React.lazy(() => import("@/components/service/famille/Slider"));
  const Tarifs = React.lazy(() => import("@/components/service/famille/Tarifs"));

  return (
    <div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">
        <Image src={logo} alt="logo" />
      </div>}>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7" id="famille">
          <Header />
          <div className="pt-4">
            <Slider />
          </div>
          <div className="pt-4">
            <Tarifs />
          </div>
        </div>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Famille;
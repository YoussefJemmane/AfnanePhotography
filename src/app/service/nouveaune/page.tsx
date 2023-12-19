"use client"

import Navbar from "@/components/Navbar";

import React from "react";

import Header from "@/components/service/nouveaune/Header";
import Slider from "@/components/service/nouveaune/Slider";
import Tarifs from "@/components/service/nouveaune/Tarifs";
import{ Footer} from "@/components/Footer";

const NouveauNe = () => {
  

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7" id="nouveaune">
        <Header />
        <div className="pt-4">
          <Slider />
        </div>
        <div className="pt-4">
          <Tarifs />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NouveauNe;
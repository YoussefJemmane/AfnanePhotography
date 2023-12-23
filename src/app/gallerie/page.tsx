import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import logo from "../../../public/logo-FINAL-afnane.webp"
import Image from "next/image";

const LazyGallerie = React.lazy(() => import("@/components/Gallerie"));


const Bebe = () => {
    return (
        <div>
            <Suspense fallback={<div className="h-screen flex items-center justify-center">
                <Image src={logo} alt="logo" />
            </div>}>
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7" >
                    <LazyGallerie />
                </div>
                <Footer />
            </Suspense>
        </div>
    );
};

export default Bebe;
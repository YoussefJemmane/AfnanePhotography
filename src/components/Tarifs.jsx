import React, { useEffect } from "react"

const Tarifs = () => {



    const tarifs = [
        {
            text: "Nouveau né",
            price: "1200 dh",
            duration: "Environ 2h de séance photo",
            details: [
                "3 thèmes variés",
                "Accessoires et tenues sont fournis",
                "15 images retouchées (avec tirage)"
            ]
        },
        {
            text: "Bébé",
            price: "600 dh",
            duration: "Environ 1h de séance photo",
            details: [
                "Accessoires et tenues à disposition",
                "Les photos de famille sont possibles",
                "10 images retouchées (sans tirage)"
            ]
        },
        {
            text: "smash cake",
            price: "700 dh",
            duration: "Environ 1h30 de séance photo",
            details: [
                "Des portrait bébé avec un décor simple",
                "Un décore d’anniversaire avec un bon gâteau",
                "Les photos de famille sont possibles",
                "15 image retouchés (sans tirage)"
            ]
        },
        {
            text: "Grossesse",
            price: "500 dh",
            duration: "Environ 1h30 de séance photo",
            details: [
                "Accessoires et tenues à disposition",
                "Conjoint et ainé convié",
                "10 images retouchés"
            ]
        },
        {
            text: "famille",
            price: "500 dh",
            duration: "Environ 1h de séance photo",
            details: [
                "15 images traitées",
                "Dispose de plusieurs fonds"
            ]
        },
        {
            text: "Professional",
            price: "300 dh",
            duration: "Environ 30min de séance photo",
            details: [
                "10 images traitées"
            ]
        },
        {
            text: "Mode",
            price: "700 dh",
            duration: "Une photo de profil, Des photos mode, Un portrait artistique."
        }
    ]
    return (
        <div>
            <div className='w-full m-auto p-[10px] group animate-fade-right animate-once' id="tarifs">
                <div className="flex flex-col items-center justify-center w-full mb-6">
                    <h2 className="text-3xl font-bold text-center text-[#3f4042]">
                        Tarifs
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {tarifs.map((tarif, index) => (
                        <div key={index} className="bg-white rounded-md shadow-slate-200 shadow-2xl p-4">
                            <h3 className="text-lg font-bold text-[#3f4042] mb-2">{tarif.text}</h3>
                            <p className="text-[#3f4042]">{tarif.price}</p>
                            <p className="text-[#3f4042]">{tarif.duration}</p>
                            <ul className="list-disc list-inside">
                                {tarif.details && tarif.details.map((detail, index) => (
                                    <li key={index} className="text-[#3f4042]">{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tarifs
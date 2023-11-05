import React, { useEffect } from "react"

const MonStyle = () => {
    const styles = [
        {
            text: "Nouveau né ",
            desc: "Votre minuscule bébé ne tiendra bientôt plus dans vous mains, la séance naissance vous aidera à vous souvenir de ces précieux moments ",
        },
        {
            text: "Bébé",
            desc: "Votre bébé grandit si vite, chaque jour est une bonne occasion de faire un shooting photo "
        },
        {
            text: "Grossesse",
            desc: "Venez vivre l’expérience d’un shooting grossesse "
        },
        {
            text : "Famille",
            desc : "Venez tous ensemble pour de belles photos que vous serez heureux de revoir dans quelques années."
        },
        {
            text : "Smash cake",
            desc : "Votre tout petit va bientôt fêter son premier anniversaire ? Chic, c’est l’occasion rêvée d’avoir de merveilleux souvenirs et de s’amuser !"
        },
        {
            text : "Professional",
            desc : "Osez prendre la pose, osez penser à vous. Oui, cela fait un bien fou ! "
        },
       
    ]

    return (
        <div className='w-full m-auto p-[10px] group animate-fade-right animate-once' id="les_seances">
            <div className="flex flex-col items-center justify-center w-full mb-6">
                <h2 className="text-3xl font-bold text-center text-[#3f4042]">
                    Les Séances
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {styles.map((style, index) => (
                    <div key={index} className="bg-white rounded-md shadow-slate-200 shadow-2xl p-4">
                        <h3 className="text-lg font-bold text-[#3f4042] mb-2">{style.text}</h3>
                        <p className="text-[#3f4042]">{style.desc && style.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MonStyle
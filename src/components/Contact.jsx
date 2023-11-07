import React from 'react'
const Footer = () => {

    return (
        <div>
            <div className=' w-full m-auto p-[10px]  group animate-fade-right animate-once 
    ' id="contact">
                <div className="flex flex-col items-center justify-center w-full mb-6">
                    <h2 className="text-3xl font-bold text-center text-[#3f4042]">
                        Contact
                    </h2>
                </div>
                <div className="relative w-full glide-08">
                    <div
                        className="overflow-hidden text-center bg-white rounded-md shadow-2xl text-[#3f4042] shadow-slate-200 "
                        data-glide-el="track"
                    >
                        <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">

                            <li >
                                <div className="w-full">

                                    <div className="overflow-hidden ">
                                        <div className="relative p-6">
                                            
                                        </div>
                                    </div>

                                </div>
                            </li>

                        </ul>
                    </div>
                    {/*    <!-- Indicators --> */}
                </div>
            </div>
        </div>
    )
}

export default Footer
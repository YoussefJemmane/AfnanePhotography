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
            </div>
            <div className="flex justify-center">
                <div className="bg-white rounded-md shadow-slate-200 shadow-2xl p-4 mb-4">
                    <h3 className="text-lg font-bold text-[#3f4042] mb-2">Contactez-moi</h3>
                    <p className="text-[#3f4042]">Si vous souhaitez en savoir plus, poser des questions ou bien réserver une séance, n'hésitez pas à me contacter. </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
                        <a href="mailto:afnane.photography@gmail.com">
                            <svg fill="#000000" height="24" width="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 330.001 330.001" xml: space="preserve">
                                <g id="XMLID_348_">
                                    <path id="XMLID_350_" d="M173.871,177.097c-2.641,1.936-5.756,2.903-8.87,2.903c-3.116,0-6.23-0.967-8.871-2.903L30,84.602
		L0.001,62.603L0,275.001c0.001,8.284,6.716,15,15,15L315.001,290c8.285,0,15-6.716,15-14.999V62.602l-30.001,22L173.871,177.097z"
                                    />
                                    <polygon id="XMLID_351_" points="165.001,146.4 310.087,40.001 19.911,40 	" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
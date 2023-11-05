import React from 'react'
import img1 from "../assets/im1.jpg"
import img2 from "../assets/IMG20231005165037.jpg"
import img3 from "../assets/imp2.jpg"
import img4 from "../assets/_MG_1107.jpg"
import img5 from "../assets/_MG_1180.jpg"
import img6 from "../assets/_MG_1205.jpg"

const Gallerie = () => {
    const [photos, setPhotos] = React.useState([])
    const [seances, setSeances] = React.useState([])
    const [selectedSeance, setSelectedSeance] = React.useState('')
    const images = [
        {
            photo: "img1",
            id: 1,
            title: "photo1"
        },
        {
            photo: img2,
            id: 2,
            title: "photo2"
        },
        {
            photo: img3,
            id: 3,
            title: "photo3"
        },
        {
            photo: img4,
            id: 4,
            title: "photo4"
        },
        {
            photo: img5,
            id: 5,
            title: "photo5"
        },
        {
            photo: img6,
            id: 6,
            title: "photo6"
        }
    ]
    const gallerie = [
        {
            text: "Séance photo Nouveau né ",
            images: [
                {
                    photo: img1,
                    id: 1,
                    title: "photo1"
                },
                {
                    photo: img2,
                    id: 2,
                    title: "photo2"
                },
                {
                    photo: img3,
                    id: 3,
                    title: "photo3"
                }
            ]
        },
        {
            text: "Séance photo Bébé",
            images: [
                {
                    photo: img4,
                    id: 4,
                    title: "photo4"
                },
                {
                    photo: img5,
                    id: 5,
                    title: "photo5"
                },
                {
                    photo: img6,
                    id: 6,
                    title: "photo6"
                }
            ]
        },
        {
            text: "Séance photo Grossesse",
            images: [

            ]
        },
        {
            text: "Séance photo Famille",
            images: [

            ]
        },
        {
            text: "Séance photo Smash cake",
            images: [

            ]
        },
        {
            text: "Séance photo Professional",
            images: [

            ]
        }
    ]

    const handleSeanceChange = (e) => {
        const selectedSeance = e.target.value;
        setSelectedSeance(selectedSeance);
        const selectedGallerie = gallerie.find((gallerie) => gallerie.text === selectedSeance);
        if (selectedGallerie) {
            setPhotos(selectedGallerie.images);
        } else {
            setPhotos([]);
        }
    }


    return (
        <div>
            <div className="w-full m-auto p-[10px] group animate-fade-right animate-once" id="gallerie">
                <div className="flex flex-col items-center justify-center w-full mb-6">
                    <h2 className="text-3xl font-bold text-center text-[#3f4042]">
                        Gallerie
                    </h2>
                </div>
                <select className=" mb-4 p-2  bg-[#ffffff] rounded-md" onChange={handleSeanceChange}>
                    <option value="">Select a seance</option>
                    {gallerie.map((gallerie) => (
                        <option key={gallerie.text} value={gallerie.text}>
                            {gallerie.text}
                        </option>
                    ))}
                </select>
                {selectedSeance && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {photos.length > 0 ? (
                            photos.map((photo) => (
                                <div key={photo.id} className="  rounded-md">
                                    <img src={photo.photo} alt={photo.title} className="w-full h-auto rounded-md" />

                                </div>
                            ))
                        ) : (
                            <div className="bg-white p-4 rounded-md">
                                <p className="text-[#3f4042]">Il n'y a aucune image dans cette séance. Soyez le premier à contribuer à cette collection !</p>
                            </div>
                        )}
                    </div>
                )}
                {!selectedSeance && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {images.map((image) => (
                            <div key={image.id} className="  rounded-md">
                                <img src={image.photo} alt={image.title} className="w-full h-auto rounded-md" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Gallerie




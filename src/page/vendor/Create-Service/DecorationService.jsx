import { ImageIcon } from "lucide-react";
import React, { useState } from "react";

const DecorationService = ({ images, setImages }) => {
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [img3, setImg3] = useState(null);

    // Function to convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handler for file input change
    const handleFileChange = async (e, setImage, imageIndex) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await convertToBase64(file);
                setImage(base64Image);
                setImages((prevImages) => {
                    const updatedImages = [...prevImages];
                    updatedImages[imageIndex] = base64Image;
                    return updatedImages;
                });
            } catch (error) {
                console.error("Error converting file to Base64:", error);
            }
        }
    };

    return (
        <div className="h-full">
            <label>Decoration images : </label>
            <br />
            <br />
            {[img1, img2, img3].map((img, index) => (
                <div
                    key={index}
                    className="bg-input rounded-[25px] h-[300px] overflow-hidden border-[2px] border-primary group mt-5"
                >
                    <label className="h-full cursor-pointer flex items-center justify-center">
                        {img ? (
                            <div className="relative w-full h-full">
                                <img
                                    src={img}
                                    alt={`image-${index}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300"></div>
                            </div>
                        ) : (
                            <ImageIcon className="size-20 text-gray-400" />
                        )}
                        <input
                            type="file"
                            className="hidden w-full"
                            onChange={(e) =>
                                handleFileChange(
                                    e,
                                    [setImg1, setImg2, setImg3][index],
                                    index
                                )
                            }
                        />
                    </label>
                    <br />
                </div>
            ))}
        </div>
    );
};

export default DecorationService;

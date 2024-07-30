import { ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

const ClientInputImageEdit = ({ title, value, setValue }) => {
    const [image, setImage] = useState(value); // State to store the Base64 image

    // useEffect(() => {
    //     if (image) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setValue(reader.result); // Update the parent component with the Base64 string
    //         };
    //         reader.readAsDataURL(image);
    //     }
    // }, [image]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setValue(reader.result); // Update the parent component with the Base64 string
            setImage(reader.result); // Update the parent component with the Base64 string
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <label>{title}:</label>
            <br />
            <div className="bg-input rounded-[25px] h-[400px] overflow-hidden border border-[2px] border-primary group shadow-custom">
                <label className="w-full h-full cursor-pointer flex items-center justify-center">
                    <input
                        type="file"
                        className="hidden w-full h-full"
                        onChange={handleFileChange}
                    />
                    {image ? (
                        <div className="relative w-full h-full">
                            <img
                                src={image}
                                alt="Selected"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300"></div>
                        </div>
                    ) : (
                        <>
                            <ImageIcon className="size-20 text-gray-400" />
                        </>
                    )}
                </label>
            </div>
        </>
    );
};

export default ClientInputImageEdit;

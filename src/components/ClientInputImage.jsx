import { ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import useImageToBase64 from "@/hooks/useImageToBase64"; // Import your custom hook

const ClientInputImage = ({ title, value, setValue }) => {
    const [image, setImage] = useState(value);

    const { base64, error } = useImageToBase64(image);

    // Set the base64 value when conversion is complete
    useEffect(() => {
        if (base64) {
            setValue(base64); // Update the value with base64
        }
    }, [base64, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Set file to state to trigger conversion
        }
    };

    return (
        <>
            &nbsp;&nbsp;<label>{title} : </label>
            <br />
            <div className="bg-input rounded-[25px] h-[400px] overflow-hidden border border-[2px] group shadow-custom">
                <label className="w-full h-full cursor-pointer flex items-center justify-center">
                    <input
                        type="file"
                        className="hidden w-full h-full"
                        onChange={handleFileChange}
                    />
                    {base64 ? (
                        <div className="relative w-full h-full">
                            <img
                                src={base64}
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

export default ClientInputImage;

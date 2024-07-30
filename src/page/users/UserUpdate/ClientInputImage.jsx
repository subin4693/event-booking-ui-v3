import { ImageIcon } from "lucide-react";
import React, { useState } from "react";

const ClientInputImage = ({ title, value, setValue }) => {
    const [image, setImage] = useState(value);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setValue([file]);
        }
    };

    return (
        <>
            &nbsp;&nbsp;<label>{title} : </label>
            <br />
            <div className="bg-input rounded-[25px] h-[400px] overflow-hidden border border-[2px]  group shadow-custom">
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
                        // <img

                        //     className="w-full h-full object-cover group-hover:scale-200 transition-all duration-100"
                        // />
                        <>
                            <ImageIcon className="size-20 text-gray-400" />
                            {/* <CiImageOn className="size-20 text-gray-400" />{" "} */}
                        </>
                    )}
                </label>
            </div>
        </>
    );
};

export default ClientInputImage;

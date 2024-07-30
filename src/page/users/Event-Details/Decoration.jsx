import React from "react";

const Decoration = ({ image1, image2, image3 }) => {
    return (
        <div className="space-y-5">
            <div className="bg-input rounded-[25px]   h-[300px]">
                <img
                    src={` ${image1}`}
                    className="object-fit w-full h-full rounded-[15px]"
                />
            </div>
            <div className="bg-input rounded-[25px]   h-[300px]">
                <img
                    src={` ${image2}`}
                    className="object-fit w-full h-full rounded-[15px]"
                />
            </div>
            <div className="bg-input rounded-[25px]   h-[300px]">
                <img
                    src={` ${image3}`}
                    className="object-fit w-full h-full rounded-[15px]"
                />
            </div>
        </div>
    );
};

export default Decoration;

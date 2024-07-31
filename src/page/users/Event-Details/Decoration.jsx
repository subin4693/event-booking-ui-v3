import React from "react";

const Decoration = ({ image1, image2, image3 }) => {
    return (
        <div className="space-y-5">
            {[image1, image2, image3].map((image) => {
                if (!image) return;
                return (
                    <div className="bg-input rounded-[25px]   h-[300px]">
                        <img
                            src={` ${image}`}
                            className="object-fit w-full h-full rounded-[15px]"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Decoration;

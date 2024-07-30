import React from "react";

const Photograph = ({ portfolio }) => {
    return (
        <ol className="bg-input rounded-[25px] p-3">
            {portfolio.map((val, index) => (
                <li key={val}>{index + 1 + " " + val}</li>
            ))}
        </ol>
    );
};

export default Photograph;

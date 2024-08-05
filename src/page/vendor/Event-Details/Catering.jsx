import React from "react";

const Catering = ({ menuOptions }) => {
    return (
        <ol className="bg-input rounded-[25px] p-3">
            {menuOptions?.map((val, index) => (
                <li key={val}>{index + 1 + " " + val}</li>
            ))}
        </ol>
    );
};

export default Catering;

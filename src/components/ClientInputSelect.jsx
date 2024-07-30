import React from "react";

const InputSelect = ({ title, value, setValue, options }) => {
    return (
        <>
            &nbsp;&nbsp;<label>{title} : </label>
            <br />
            <select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-input rounded-[25px] p-2 w-full shadow-custom p-3 pl-5"
            >
                {options.map((option) => (
                    <option
                        className="bg-input"
                        key={option._id}
                        value={option._id}
                    >
                        {option.type}
                    </option>
                ))}
            </select>
        </>
    );
};

export default InputSelect;

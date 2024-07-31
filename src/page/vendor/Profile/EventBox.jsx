import React from "react";
import { Card } from "@/components/ui/card";

const EventBox = ({ number, text, colors }) => {
    return (
        <Card
            className={`w-[14rem] h-[14rem] flex-col flex justify-center items-center ${colors}`}
        >
            <h2 className="text-2xl font-bold mb-2">{number}</h2>

            <h3>{text}</h3>
        </Card>
    );
};

export default EventBox;

import React from "react";
import { Card } from "@/components/ui/card";
import { Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServiceCard = ({
    name,
    description,
    price,
    contact,
    image,
    handleDelete,
    handleEdit,
    id,
}) => {
    return (
        <Card className="flex flex-col md:flex-row w-full p-3 md:w-[500px] relative group h-fit">
            <div className="w-full md:w-[300px] flex-1 h-[200px] rounded-lg overflow-hidden">
                <img src={image} className="w-full h-full object-coveer" />
            </div>
            <div className="md:px-3 w-full md:w-[200px] m-3 md:ml-6 flex-1 flex flex-col">
                <div className="flex-1 justify-center">
                    <p>Title : {name}</p>
                    <p>Description : {description}</p>
                    <p>Price : {price}</p>
                    <p>Contact : {contact}</p>
                </div>
                <div className="mt-10  flex flex-end absolute right-5 bottom-5 opacity-0 delay-50 duration-100 group-hover:opacity-100">
                    <Button
                        onClick={() => handleEdit(id)}
                        variant="outline"
                        size="icon"
                    >
                        <Pen />
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(id)}
                    >
                        <Trash />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ServiceCard;

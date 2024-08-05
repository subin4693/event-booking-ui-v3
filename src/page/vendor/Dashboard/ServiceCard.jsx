import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EventCard = ({ image, title, id, date, location }) => {
    return (
        <div className="flex mt-10">
            <Card className="w-[300px] overflow-hidden pt-5 bg-muted">
                <CardContent>
                    <div className="   rounded-[25px]   overflow-hidden border  group shadow-custom  w-[250px]">
                        <div className="relative">
                            <img
                                src={`${image && image[0]}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div
                                className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                            ></div>
                        </div>
                    </div>

                    <p>Title : {title}</p>
                    <p>Date : {date}</p>
                    <p>location : {location}</p>
                    <br />
                    <Button>
                        <Link to={`#`}>Book now</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventCard;

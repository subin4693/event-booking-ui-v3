import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";

const Topbar = ({ events, setSelectedService }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [navService, setNavService] = useState("Pending");
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="flex justify-center items-center gap-10 rounded-2xl relative overflow-hidden bg-secondary px-10 hidden lg:flex">
                    {events?.map((event, index) => (
                        <div
                            key={event}
                            className={`   p-5 py-3 flex-1 z-10 flex items-center justify-center cursor-pointer duration-500 ${
                                index === activeIndex && " text-white    "
                            }`}
                            onClick={() => {
                                setSelectedService(event);
                                return setActiveIndex(index);
                            }}
                            style={{
                                width: `${100 / events?.length}%`,
                            }}
                        >
                            {event}
                        </div>
                    ))}

                    <span
                        className="absolute top-0 left-0 bg-primary h-full rounded-2xl transition-transform duration-500"
                        style={{
                            width: `${100 / events?.length}%`,
                            transform: `translateX(${activeIndex * 100}%)`,
                        }}
                    ></span>
                </div>
            </div>
            <div className="lg:hidden relative ">
                <span className="font-bold text-lg">{navService} Events</span>
                <Button
                    size="icon"
                    variant={`${open ? "destructive" : "secondary"}`}
                    className="absolute right-0"
                    onClick={() => setOpen((prev) => !prev)}
                >
                    {open ? <X /> : <Menu />}
                </Button>
                <div
                    className={`absolute border   p-2 rounded-lg right-10 top-10 opacity-0 duration-200 transition-opacity  bg-background ${
                        open ? " opacity-100 z-10 " : "-z-10  "
                    }`}
                >
                    {events?.map((event, index) => (
                        <div
                            key={event}
                            className={`hover:bg-secondary px-5 py-2 cursor-pointer duration-200 delay-50 rounded-md my-2 ${
                                index === activeIndex && " bg-secondary    "
                            }`}
                            onClick={() => {
                                setSelectedService(event);
                                setNavService(event);
                                setActiveIndex(index);
                                setOpen(false);
                            }}
                        >
                            {event}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Topbar;

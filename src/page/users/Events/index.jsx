import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Events = () => {
    const [event, setEvent] = useState("Upcoming");
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);

                const res = await axios.get(BASE_URL + "/events");

                setEvents({ Upcoming: res.data.Upcoming, Past: res.data.Past });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);
    return (
        <div>
            <div className="flex flex-col sm:flex-row  items-center space-y-4 sm:space-y-0">
                <div className="flex-1">
                    <h1 className="font-bold text-lg text-center sm:text-left hidden lg:inline">
                        {event} Events
                    </h1>
                </div>
                <div className="flex mr-5  relative w-full sm:w-[300px] bg-secondary rounded-3xl overflow-hidden border">
                    <span
                        className={`absolute w-1/2 h-full duration-500 p-3 bg-primary   rounded-3xl text-center ${
                            event === "Upcoming"
                                ? "-translate-x-0"
                                : "translate-x-full"
                        }`}
                    />
                    <button
                        onClick={() => setEvent("Upcoming")}
                        className={`flex-1 p-3 text-center z-10 duration-500 ${
                            event === "Upcoming"
                                ? "text-white"
                                : "text-black dark:text-white"
                        }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setEvent("Past")}
                        className={`flex-1 p-3 text-center z-10 duration-500 ${
                            event !== "Upcoming"
                                ? "text-white"
                                : "text-black dark:text-white"
                        }`}
                    >
                        Past
                    </button>
                </div>
                <Button variant="secondary" size="icon" asChild>
                    <Link to="/users/create-event">
                        <Plus />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 mt-10">
                {!loading ? (
                    events && events[event]?.length !== 0 ? (
                        events[event]?.map(({ item }) => {
                            return (
                                <EventCard
                                    key={item && item?._id}
                                    id={item && item?._id}
                                    image={item && item?.images}
                                    title={item && item?.name}
                                    date={item && item?.dates}
                                />
                            );
                        })
                    ) : (
                        <div>There is no {event} events</div>
                    )
                ) : (
                    <>
                        <Skeleton className="  rounded-2xl h-[250px]   " />

                        <Skeleton className="  rounded-2xl h-[250px]   " />

                        <Skeleton className="  rounded-2xl h-[250px] " />
                    </>
                )}
            </div>
        </div>
    );
};

export default Events;

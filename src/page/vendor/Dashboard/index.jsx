import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const categories = ["Design", "Art", "Sports", "Music", "Business"];

const eventsData = {
    Design: [],
    Art: [],
    // Add more events for other categories
};

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);
                const res = await axios.get(BASE_URL + "/events/published");

                setEvents(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getEvents();
    }, []);

    const getEvents = () => {
        const allEvents = Object.values(events).flat();
        return allEvents;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day} `;
    };

    const handleCategoryClick = (category) => {
        setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.includes(category)
                ? prevSelectedCategories.filter((cat) => cat !== category)
                : [...prevSelectedCategories, category]
        );
    };

    const isSelected = (category) => selectedCategories.includes(category);

    const getRandomEvents = () => {
        const allEvents = Object.values(events).flat();
        return allEvents.sort(() => 0.5 - Math.random()).slice(0, 3); // Get 3 random events
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-0 font-foreground">
                Popular Events by Qatar Hub
            </h2>
            <div className="flex gap-10 flex-col md:flex-row">
                <div className="flex justify-center md:justify-between flex-wrap gap-5 mt-2">
                    {!loading ? (
                        getEvents().map(({ item, image }) => {
                            return (
                                <ServiceCard
                                    key={item && item?._id}
                                    id={item && item?._id}
                                    image={item && item?.images}
                                    title={item && item?.name}
                                    date={item.dates.map((date) =>
                                        formatDate(date)
                                    )}
                                    location={"Doha, Qatar"}
                                />
                            );
                        })
                    ) : (
                        <Skeleton className="rounded-2xl h-[250px]" />
                    )}
                </div>
            </div>
            <h2 className="text-xl font-semibold mb-4 mt-10">
                Choose by Category
            </h2>
            <div className="flex overflow-x-auto mb-3 flex-wrap">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="p-4 cursor-pointer"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div
                            className={`p-2 rounded-2xl border font-semibold text-foreground px-5 ${
                                isSelected(category)
                                    ? "bg-primary border-primary text-white"
                                    : "bg-muted border-primary"
                            }`}
                        >
                            <h3 className="text-center">{category}</h3>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCategories.length > 0 ? (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Selected Events
                    </h2>
                    {selectedCategories.map((category) => (
                        <div key={category} className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                {category} Events
                            </h3>
                            <div>
                                {eventsData[category]?.map((event, index) => {
                                    return (
                                        <CategoryEventCard
                                            key={index}
                                            eventImage={event.eventImage}
                                            eventTitle={event.eventTitle}
                                            date={event.date}
                                            place={event.place}
                                            description={event.description}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Random Events
                    </h2>
                    <div>
                        {getRandomEvents().map(({ item, image }) => (
                            <CategoryEventCard
                                key={item && item?._id}
                                eventImage={image && item?.images}
                                eventTitle={item && item?.name}
                                date={item.dates.map((date) =>
                                    formatDate(date)
                                )}
                                place={"Doha, Qatar"}
                                description={item.description}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const CategoryEventCard = ({ image, eventTitle, date, place, description }) => {
    return (
        <div className="p-4 mb-4 flex items-center justify-between rounded-lg bg-muted shadow-md">
            <img
                src={`${image && image[0]}`}
                className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{eventTitle}</h3>
                <p className="text-sm">{date}</p>
                <p className="text-sm">{place}</p>
                <p className="text-sm mt-2">{description}</p>
            </div>
            <Button>
                <Link to="">Book now</Link>
            </Button>
        </div>
    );
};
export default Dashboard;

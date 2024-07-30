import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Topbar from "./Topbar";
import Venue from "./Venue";
import Catering from "./Catering";
import Photograph from "./Photograph";
import Decoration from "./Decoration";

const EventDetails = () => {
    const [topBarItems, setTopBarItems] = useState([]);
    const [selectedService, setSelectedService] = useState("Event");
    const [searchParams, setSearchParams] = useSearchParams();
    const [creator, setCreator] = useState(false);

    const [details, setDetails] = useState({});

    const { event_id } = useParams();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    BASE_URL + "/events/single-event/" + event_id
                );
                let { photograph, venue, decoration, catering, event, images } =
                    res.data.data;
                let { rejectedBy } = res.data.data.event.details;

                let tempData = {};
                let tempTitle = [];
                if (event) {
                    tempData = { ...tempData, Event: event };
                    tempTitle.push("Event");
                    tempData.Event.status = event.details.status;
                }
                if (venue) {
                    tempData = { ...tempData, Venue: venue };
                    tempTitle.push("Venue");
                }
                if (decoration) {
                    tempData = { ...tempData, Decoration: decoration };

                    tempTitle.push("Decoration");
                }
                if (photograph) {
                    tempData = { ...tempData, Photograph: photograph };

                    tempTitle.push("Photograph");
                }

                if (catering) {
                    tempData = { ...tempData, Catering: catering };
                    tempTitle.push("Catering");
                }

                rejectedBy?.forEach((rejected) => {
                    if (
                        rejected?.type?.toLowerCase() == "venue" &&
                        tempData.Venue
                    )
                        tempData.Venue.status = "Rejected by venue";
                    if (
                        rejected?.type?.toLowerCase() == "catering" &&
                        tempData.Catering
                    )
                        tempData.Catering.status = "Rejected by catering";
                    if (
                        rejected?.type?.toLowerCase() == "photograph" &&
                        tempData.Photograph
                    )
                        tempData.Photograph.status = "Rejected by photograph";
                    if (
                        rejected?.type?.toLowerCase() == "decoration" &&
                        tempData.Decoration
                    )
                        tempData.Decoration.status = "Rejected by decoration";
                });

                setDetails(tempData);
                setTopBarItems(tempTitle);
                let c = searchParams.get("creator");
                setCreator(c == "true" ? true : false);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, []);

    return (
        <div className=" max-w-[1200px] ">
            <Topbar
                title={topBarItems}
                setSelectedService={setSelectedService}
            />
            <div className="mt-10 flex gap-10 flex-col lg:flex-row flex-wrap">
                <div className="flex-1 space-y-5">
                    <div className="bg-input rounded-[25px] p-3">
                        {details[selectedService]?.details?.name}
                    </div>
                    <div className="bg-input rounded-[25px] p-3">
                        {/* {event[0]?.itemId?.description} */}
                        {details[selectedService]?.details?.description}
                    </div>
                    <div className="bg-input rounded-[25px] p-3">
                        {/* {event[0]?.itemId?.contactInfo} */}
                        {details[selectedService]?.details?.contactInfo ||
                            details[selectedService]?.details?.dates[0]?.split(
                                "T",
                                1
                            )[0] +
                                "  --- " +
                                details[selectedService]?.details?.dates[
                                    details[selectedService]?.details?.dates
                                        .length - 1
                                ]?.split("T", 1)[0]}
                    </div>
                    <div className="bg-input rounded-[25px] max-h-[400px] overflow-hidden  ">
                        <img
                            src={`${
                                details[selectedService]?.details?.images &&
                                details[selectedService]?.details?.images[0]
                            }`}
                            className="object-fit w-full h-full rounded-[15px]"
                        />
                    </div>
                    {creator && (
                        <div
                            className={`bg-input rounded-[25px] p-3 ${
                                details[selectedService]?.status &&
                                "bg-red-300 dark:bg-red-900"
                            }`}
                        >
                            {details[selectedService]?.status
                                ? details[selectedService]?.status
                                : "Booked"}
                        </div>
                    )}
                    {/* <div
                    className={` rounded-[25px] p-3 capitalize text-black ${
                        event[0]?.isConfirmed
                            ? "bg-green-300"
                            : "bg-red-300"
                    }`}
                    > */}
                    {/* {event[0]?.isConfirmed ? "Confirmed" : "Booked"} */}
                    {/* </div> */}
                </div>
                <div className="flex-1">
                    {selectedService.toLowerCase() === "venue" && (
                        <Venue
                            location={
                                details[selectedService]?.details?.location
                            }
                        />
                    )}
                    {selectedService.toLowerCase() === "catering" && (
                        <Catering
                            menuOptions={details[
                                selectedService
                            ]?.details?.menuOptions[0]?.split(",")}
                        />
                    )}
                    {selectedService.toLowerCase() === "photograph" && (
                        <Photograph
                            portfolio={details[
                                selectedService
                            ]?.details?.portfolio[0]?.split(",")}
                        />
                    )}
                    {selectedService.toLowerCase() === "decoration" && (
                        <Decoration
                            image1={
                                details[selectedService]?.details
                                    ?.decorationImages[0]
                            }
                            image2={
                                details[selectedService]?.details
                                    ?.decorationImages[1]
                            }
                            image3={
                                details[selectedService]?.details
                                    ?.decorationImages[2]
                            }
                        />
                    )}
                    {/*    {itemName == "catering" && (
                        <ol className="bg-input rounded-[25px] p-3">
                            {event[0]?.itemId?.menuOptions[0]
                                ?.split(",")
                                ?.map((val, index) => (
                                    <li key={val}>{index + 1 + " " + val}</li>
                                ))}
                        </ol>
                    )}
                    {itemName == "photograph" && (
                        <ol className="bg-input rounded-[25px] p-3">
                            {event[0]?.itemId?.portfolio[0]
                                ?.split(",")
                                .map((val, index) => (
                                    <li key={val}>{index + 1 + " " + val}</li>
                                ))}
                        </ol>
                    )}
                    {itemName == "decoration" && (
                        <div className="space-y-5">
                            <div className="bg-input rounded-[25px] p-3 h-[300px]">
                                <img
                                    src={`data:image/jpeg;base64,${event[0]?.item.images[1]?.data}`}
                                    className="object-fit w-full h-full rounded-[15px]"
                                />
                            </div>
                            <div className="bg-input rounded-[25px] p-3 h-[300px]">
                                <img
                                    src={`data:image/jpeg;base64,${event[0]?.item.images[2]?.data}`}
                                    className="object-fit w-full h-full rounded-[15px]"
                                />
                            </div>
                            <div className="bg-input rounded-[25px] p-3 h-[300px]">
                                <img
                                    src={`data:image/jpeg;base64,${event[0]?.item.images[3]?.data}`}
                                    className="object-fit w-full h-full rounded-[15px]"
                                />
                            </div>
                        </div>
                    )}*/}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

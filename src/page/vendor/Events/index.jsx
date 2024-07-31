import React, { useCallback, useEffect, useState } from "react";
import Topbar from "./Topbar";
import { useSelector } from "react-redux";
import axios from "axios";
import ServiceCard from "./ServiceCard";

const Events = () => {
    const [selectedService, setSelectedService] = useState("Upcoming");
    const { client } = useSelector((state) => state.client);
    const [loading, setLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [reload, setReload] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState({});

    const handleConfirm = useCallback(
        async (bookingId, confirmation) => {
            setConfirmLoading(!confirmLoading);

            try {
                setConfirmLoading(true);
                const res = await axios.post(
                    BASE_URL + "/events/confirm/" + bookingId
                );

                setData({ Upcoming: res.data.events });
                setReload((prev) => !prev);
            } catch (error) {
                console.log(error);
            } finally {
                setConfirmLoading(false);
            }
        },
        [BASE_URL, confirmLoading]
    );
    const handleReject = useCallback(
        async (bookingId) => {
            try {
                setRejectLoading(true);
                const res = await axios.post(
                    BASE_URL + "/events/reject/" + bookingId
                );

                setData({ Upcoming: res.data.events });
                setReload((prev) => !prev);
            } catch (error) {
                console.log(error);
            } finally {
                setRejectLoading(false);
            }
        },
        [BASE_URL]
    );

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    BASE_URL + "/events/client/" + client._id
                );

                setData({ Upcoming: res.data.Upcoming, Past: res.data.Past });
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getEvents();
    }, [client._id, reload, BASE_URL]);
    return (
        <div className="">
            <div className="mt-1">
                <Topbar
                    events={["Upcoming", "Past"]}
                    setSelectedService={setSelectedService}
                />
            </div>
            <div className=" flex justify-center md:justify-start flex-wrap gap-5">
                {data &&
                    data[selectedService] &&
                    data[selectedService]?.map((singleData) => {
                        return (
                            <>
                                <ServiceCard
                                    key={
                                        singleData &&
                                        singleData?.item?.eventId?._id
                                    }
                                    bookingId={
                                        singleData && singleData?.item?._id
                                    }
                                    title={
                                        singleData &&
                                        singleData?.item?.eventId?.name
                                    }
                                    image={
                                        singleData && singleData?.event?.images
                                    }
                                    description={
                                        singleData &&
                                        singleData?.item?.eventId?.description
                                    }
                                    mail={
                                        singleData &&
                                        singleData?.item?.userId?.email
                                    }
                                    status={
                                        singleData &&
                                        singleData?.item?.isConfirmed
                                    }
                                    name={
                                        singleData &&
                                        singleData?.item?.userId?.name
                                    }
                                    itemId={
                                        singleData && singleData?.item?.itemId
                                    }
                                    selectedService={selectedService}
                                    handleConfirm={handleConfirm}
                                    handleReject={handleReject}
                                    confirmLoading={confirmLoading}
                                    rejectLoading={rejectLoading}
                                    dates={
                                        singleData && singleData?.event?.dates
                                    }
                                />
                            </>
                        );
                    })}
            </div>
        </div>
    );
};

export default Events;

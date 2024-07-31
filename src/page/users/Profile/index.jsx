import React, { useEffect, useState } from "react";
import Topbar from "./Topbar";
import ServiceCard from "./ServiceCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
    const [selectedService, setSelectedService] = useState("Upcoming");
    const { user } = useSelector((state) => state.user);
    const { userDetail } = useSelector((state) => state.userDetail);
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [data, setData] = useState({});

    const handleConfirm = async (eventId, setPublishLoading) => {
        try {
            setPublishLoading(true);
            const res = await axios.post(
                BASE_URL + "/events/publish/" + eventId
            );

            setData({ Upcoming: res.data.Upcoming, Past: res.data.Past });
        } catch (error) {
            console.log(error);
        } finally {
            setPublishLoading(false);
        }
    };
    const handleCancel = async (eventId, setCancelLoading) => {
        try {
            setCancelLoading(true);
            const res = await axios.post(
                BASE_URL + "/events/publish/cancel/" + eventId
            );
            setData({ Upcoming: res.data.Upcoming, Past: res.data.Past });
        } catch (error) {
            console.log(error);
        } finally {
            setCancelLoading(false);
        }
    };

    useEffect(() => {
        const getEvents = async () => {
            try {
                setLoading(true);

                const res = await axios.get(BASE_URL + "/events/" + user.id);
                setData({ Upcoming: res.data.Upcoming, Past: res.data.Past });
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
            <div className="flex gap-10 flex-col md:flex-row">
                <div className="   rounded-[25px]   overflow-hidden border  group shadow-custom h-[300px] w-[300px]">
                    <div className="relative">
                        {userDetail && userDetail.profile_photo ? (
                            <img
                                src={userDetail.profile_photo}
                                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        )}

                        <div
                            className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                        ></div>
                    </div>
                </div>
                <div className="font-bold text-xl space-y-5">
                    <h2>
                        Name :<span className="ml-4 ">{user?.name}</span>
                    </h2>
                    <h2>
                        Email :<span className="ml-4">{user?.email}</span>
                    </h2>
                    <h2>
                        Contact :<span className="ml-4">{user?.role}</span>
                    </h2>
                </div>
            </div>
            <div className="mt-10">
                <Topbar
                    events={["Upcoming", "Past"]}
                    setSelectedService={setSelectedService}
                />
            </div>
            <div className=" flex justify-center md:justify-start flex-wrap gap-5 mt-10">
                {!loading ? (
                    data &&
                    data[selectedService] &&
                    data[selectedService]?.map((singleData) => {
                        console.log(singleData?.item.dates);
                        return (
                            <ServiceCard
                                handleConfirm={handleConfirm}
                                handleCancel={handleCancel}
                                key={singleData.item._id}
                                date={singleData && singleData?.item?.dates}
                                eventId={singleData && singleData.item._id}
                                image={singleData && singleData?.item?.images}
                                title={singleData && singleData?.item?.name}
                                isPublished={
                                    singleData && singleData?.item?.isPublished
                                }
                                status={singleData && singleData?.item?.status}
                                description={
                                    singleData && singleData?.item?.description
                                }
                                mail={singleData.mail}
                                selectedService={selectedService}
                            />
                        );
                    })
                ) : (
                    <>
                        <Skeleton className={"w-[350px] h-[400px]"} />
                        <Skeleton className={"w-[350px] h-[400px]"} />
                        <Skeleton className={"w-[350px] h-[400px]"} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;

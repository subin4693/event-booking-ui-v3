import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

const EventCard = ({
    isOpen,
    onClose,
    bookingId,
    index,
    image,
    title,
    status,
    description,
    mail,
    selectedService,
    handleConfirm,
    handleReject,
    confirmLoading,
    rejectLoading,
    itemId,
    name,
    date,
}) => {
    console.log(date);
    if (!isOpen) return null;

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [item, setItem] = useState(null);

    useEffect(() => {
        const getItem = async () => {
            try {
                const res = await axios.get(BASE_URL + "/items/" + itemId);
                setItem(res.data.item);
            } catch (error) {
                console.log(error);
            }
        };
        getItem();
    }, []);

    return (
        <div
            id="default-modal"
            // tabindex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden "
        >
            <div
                className="fixed inset-0 bg-black/100 opacity-50 z-40"
                onClick={onClose}
            />
            <div className="relative w-full max-w-[900px] max-h-full z-50 gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg  ">
                <div className="flex justify-between items-center">
                    <h1 className="text-center text-xl font-bold">{title}</h1>
                    <div>
                        {selectedService !== "Past" && (
                            <>
                                {status.toLowerCase() === "rejected" && (
                                    <Button className="w-full">
                                        {confirmLoading ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            "Rejected "
                                        )}
                                    </Button>
                                )}

                                {status.toLowerCase() === "booked" && (
                                    <>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleReject(bookingId, index)
                                            }
                                        >
                                            {rejectLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                "X Reject"
                                            )}
                                        </Button>{" "}
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button
                                            onClick={() =>
                                                handleConfirm(bookingId, true)
                                            }
                                        >
                                            {confirmLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                "Confirm"
                                            )}
                                        </Button>
                                    </>
                                )}
                                {status.toLowerCase() === "confirmed" && (
                                    <>
                                        <Button
                                            variant="destructive"
                                            onClick={() =>
                                                handleReject(bookingId, index)
                                            }
                                        >
                                            {rejectLoading ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                "X Reject"
                                            )}
                                        </Button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <Button>
                                            {confirmLoading ? (
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            ) : (
                                                "Confirmed"
                                            )}
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="flex mt-5">
                    <div className="flex flex-col sm:flex-row  gap-10 w-full h-full">
                        <div className="flex-1 ">
                            <div className="  bg-input rounded-[25px] overflow-hidden border  group shadow-custom">
                                <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                                    <img
                                        src={` ${image && image[0]}`}
                                        className="w-[400px] h-full min-h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 space-y-5 ml-5">
                            <p>
                                <span className="font-semibold">
                                    Booked by :{" "}
                                </span>
                                {name}
                            </p>
                            <div className=" w-[400px] break-words">
                                <p>
                                    <span className="font-semibold">
                                        Description :
                                    </span>{" "}
                                    {description}
                                </p>
                            </div>
                            <p>
                                {" "}
                                <span className="font-semibold">Mail : </span>
                                {mail}
                            </p>
                            <p>
                                {" "}
                                <span className="font-semibold">Name : </span>
                                {item?.name}
                            </p>
                            <p>
                                {" "}
                                <span className="font-semibold">Price : </span>
                                {item?.price}
                            </p>
                            <p>
                                {" "}
                                <span className="font-semibold">Status : </span>
                                {status}
                            </p>
                            <p>
                                {" "}
                                <span className="font-semibold">Dates : </span>
                                {date && date}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

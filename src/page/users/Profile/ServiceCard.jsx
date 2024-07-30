import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, Loader2 } from "lucide-react";

const EventCard = ({
    isPublished,
    cancelLoading,
    handleCancel,
    handleConfirm,
    publishLoading,
    eventId,
    image,
    title,
    status,
    description,
    mail,
    selectedService,
}) => {
    return (
        <div className="flex group   ">
            <Card className="w-[350px] overflow-hidden pt-5  bg-muted ">
                <CardContent>
                    <div className="   rounded-[25px]   overflow-hidden border  group shadow-custom  w-[300px]">
                        <div className="relative h-[200px]">
                            <Link
                                to={`/users/event-details/${eventId}?creator=true`}
                            >
                                <img
                                    src={`${image && image[0]}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div
                                    className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                                ></div>
                                <ExternalLink className=" opacity-0 group-hover:opacity-100 absolute right-2 bottom-2  duration-200 group-hover:zindex-10 text-white/50" />
                            </Link>
                        </div>
                    </div>

                    <p className="mt-4 line-clamp-1">Title : {title}</p>
                    <p className="line-clamp-1">Description : {description}</p>
                    {/* <p className="line-clamp-1">Mail : {mail}</p> */}
                    <p className="mb-4 line-clamp-1">Status : {status}</p>

                    {selectedService !== "Past" && (
                        <>
                            {status.toLowerCase() === "canceled" && (
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    Canceled
                                </Button>
                            )}
                            {status.toLowerCase() !== "canceled" && (
                                <>
                                    {" "}
                                    <Button
                                        onClick={() => handleCancel(eventId)}
                                        variant="destructive"
                                    >
                                        {cancelLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            "X Cancel"
                                        )}
                                    </Button>{" "}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>
                            )}

                            {status.toLowerCase() === "booked" && (
                                <Button>
                                    <Link to={"/users/edit-event/" + eventId}>
                                        Edit Service
                                    </Link>
                                </Button>
                            )}
                            {status.toLowerCase() === "confirmed" &&
                                !isPublished && (
                                    <Button
                                        onClick={() => handleConfirm(eventId)}
                                    >
                                        {publishLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            "Publish"
                                        )}
                                    </Button>
                                )}
                            {status.toLowerCase() === "confirmed" &&
                                isPublished && <Button>Published</Button>}
                            {status.toLowerCase() === "rejected" && (
                                <Button>
                                    <Link to={"/users/edit-event/" + eventId}>
                                        Change Service
                                    </Link>
                                </Button>
                            )}
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default EventCard;

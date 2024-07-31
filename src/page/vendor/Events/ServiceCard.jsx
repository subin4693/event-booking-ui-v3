import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import EventCard from "@/page/vendor/Events/EventCard";

const ServiceCard = ({
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
    dates,
}) => {
    const { toast } = useToast();
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const [date, setDate] = useState("");

    useEffect(() => {
        if (dates) {
            setDate(
                dates[0]?.split("T", 1)[0] +
                    " --- " +
                    dates[dates.length - 1]?.split("T", 1)[0]
            );
        }
    }, [dates]);

    useEffect(() => {
        if (confirmLoading) {
            toast({
                title: "Confirmed",
            });
        }

        if (rejectLoading) {
            toast({ title: "Rejected" });
        }
    }, [confirmLoading, rejectLoading]);

    return (
        <>
            <div onClick={openModal} className="flex mt-10 cursor-pointer">
                <Card className="w-[350px] overflow-hidden pt-5  bg-muted">
                    <CardContent>
                        <div className="rounded-[25px] overflow-hidden border  group shadow-custom  w-[300px]">
                            <div className="relative w-full h-[200px] ">
                                <img
                                    src={`${image && image[0]}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 "
                                />
                                <div
                                    className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                                ></div>
                            </div>
                        </div>

                        <p className="mt-4">Title : {title}</p>
                        <p className="line-clamp-2">
                            Description : {description}
                        </p>
                        <p>Status : {status}</p>
                        <br />
                    </CardContent>
                </Card>
            </div>
            <EventCard
                isOpen={isModalOpen}
                onClose={closeModal}
                bookingId={bookingId}
                index={index}
                image={image}
                title={title}
                status={status}
                description={description}
                mail={mail}
                selectedService={selectedService}
                handleConfirm={handleConfirm}
                handleReject={handleReject}
                confirmLoading={confirmLoading}
                rejectLoading={rejectLoading}
                itemId={itemId}
                name={name}
                date={date}
            />
        </>
    );
};

export default ServiceCard;

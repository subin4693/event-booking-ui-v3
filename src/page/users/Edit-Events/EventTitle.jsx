import React from "react";
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { DatePickerWithRange } from "@/components/DatePicker";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

const EventTitle = ({
    setTitle,
    title,
    setDescription,
    description,
    setShowTitleField,
    setImage,
    image,
    date,
    setDate,
    initLoading,
    iosdate,
}) => {
    const { toast } = useToast();
    return (
        <div className="fixed inset-0 z-50 bg-black/80">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-[900px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-center text-xl font-bold">
                        Edit Event
                    </h1>
                    <div>
                        <Button>
                            <Link to="/users/profile">Close</Link>
                        </Button>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            onClick={() => {
                                console.log(!iosdate?.length < 1);
                                console.log(iosdate);
                                if (!iosdate)
                                    return toast({
                                        variant: "destructive",
                                        title: "Date is missing",
                                        description: "Select date properly",
                                    });

                                if (title.trim() && description.trim() && image)
                                    return setShowTitleField(false);
                                else
                                    return toast({
                                        variant: "destructive",
                                        title: "All the fields are required",
                                    });
                            }}
                        >
                            Update
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row  gap-5">
                    <div className="flex-1 ">
                        <div className="  bg-input rounded-[25px] h-full overflow-hidden border  group shadow-custom">
                            {initLoading ? (
                                <Skeleton className={"w-full h-[250px]"} />
                            ) : (
                                <label className=" h-full min-h-[300px] min-h-[300px] cursor-pointer flex items-center justify-center">
                                    {image ? (
                                        <div className="relative">
                                            <img
                                                src={` ${image && image[0]}`}
                                                className="w-full h-full min-h-[300px] min-h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                                            ></div>
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <img
                                                src={`${image && image[0]}`}
                                                className="w-full h-full min-h-[300px] min-h-[300px] object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-70 transition duration-300`}
                                            ></div>
                                        </div>
                                    )}
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="flex-1   space-y-5">
                        {initLoading ? (
                            <Skeleton className={" h-8 w-full"} />
                        ) : (
                            <input
                                type="text"
                                className="bg-input rounded-[25px] p-2 w-full shadow-custom"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Event Title"
                            />
                        )}
                        {initLoading ? (
                            <Skeleton className={" h-8 w-full"} />
                        ) : (
                            <DatePickerWithRange
                                date={date}
                                setDate={setDate}
                                className=" bg-input rounded-[25px]  w-full shadow-custom"
                            />
                        )}
                        {initLoading ? (
                            <Skeleton className={"h-[150px] w-full"} />
                        ) : (
                            <textarea
                                rows="5"
                                className="bg-input rounded-[25px] p-4 w-full shadow-custom resize-none overflow-auto box-border h-[60%]"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Event Description"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventTitle;

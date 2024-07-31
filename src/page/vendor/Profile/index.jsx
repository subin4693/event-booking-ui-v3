import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import EventBox from "./EventBox";
import ServiceCard from "./ServiceCard";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { addItem, clearItems, deleteItem } from "@/features/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { client } = useSelector((state) => state.client);
    const { items } = useSelector((state) => state.item);
    const { toast } = useToast();

    const handleDelete = async (id) => {
        await axios
            .delete(`${BASE_URL}/items/delete/${id}`)
            .then((res) => {
                toast({
                    title: "Deleted successfull",
                });
                dispatch(deleteItem(id));
            })
            .catch((err) => {
                toast({
                    variant: "destructive",
                    title: "Something wrong please try again later",
                });
                console.log(err);
            });
    };
    useEffect(() => {
        const getItems = async () => {
            // console.log(user.id);

            await axios
                .get(BASE_URL + "/items/user/" + client?._id)
                .then((res) => {
                    const data = res.data.items;

                    dispatch(clearItems());
                    data.map((d) => {
                        // d.item.images = d.image;
                        // d.item.decorationImages = d.decorationImages;
                        dispatch(addItem(d));
                    });
                })
                .catch((err) => console.log(err));
        };
        getItems();
    }, [location]);

    const handleEdit = (id) => {
        navigate("/vendor/create-services/", { state: { itemId: id } });
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-bold">
                    Vendor details :{" "}
                </h1>
                <Link to="/vendor/create-services">
                    <Button>Add Service</Button>
                </Link>
            </div>
            <br />
            <div>
                <h2 className="text-lg md:text-xl font-bold">
                    Organizing Events
                </h2>
                <br />
                <h3 className="text-xl font-bold">Pendin tasks</h3>
                <br />
                <div className=" flex justify-center md:justify-between flex-wrap gap-5">
                    <EventBox
                        number={10}
                        text={"Done"}
                        colors={"bg-red-500 dark:bg-red-800"}
                    />
                    <EventBox
                        number={10}
                        text={"In Progress"}
                        colors={"bg-pink-500 dark:bg-pink-800"}
                    />
                    <EventBox
                        number={10}
                        text={"Waiting for  Review"}
                        colors={"bg-purple-500 dark:bg-purple-800"}
                    />
                    <EventBox
                        number={10}
                        text={"Ongoing"}
                        colors={"bg-blue-500 dark:bg-blue-800"}
                    />
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold">Current Event</h2>
                <div className="bg-primary max-w-[400px] mt-5 rounded-lg py-2 pl-5 pr-10 text-white">
                    <h3 className="font-bold">Personal Wedding Event</h3>
                    <h4>Saber & Oro</h4>
                    <div className="flex  justify-between items-center">
                        <div className="w-9 mt-2 h-9 rounded-full overflow-hidden">
                            <img
                                src="https://github.com/shadcn.png"
                                className="w-full h-full object-cover"
                                alt="profile"
                            />
                        </div>
                        <span>Now</span>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold">Service Details</h2>
                <br />
                <div className="flex flex-wrap justify-start gap-5">
                    {items &&
                        items?.map((singleItem) => {
                            return (
                                <ServiceCard
                                    key={singleItem?._id}
                                    id={singleItem?._id}
                                    name={singleItem?.name}
                                    description={singleItem?.description}
                                    contact={singleItem?.contactInfo}
                                    price={singleItem?.price}
                                    image={singleItem?.images[0]}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

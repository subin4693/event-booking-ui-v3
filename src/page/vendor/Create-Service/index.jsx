import React, { useState } from "react";
import ClientInput from "@/components/ClientInput";
import ClientTextArea from "@/components/ClientTextArea";
import { Button } from "@/components/ui/button";
import ClientInputImage from "@/components/ClientInputImage";
import CatringService from "./CatringService";
import PhotographyService from "./PhotographyService";
import VenueService from "./VenueService";
import DecorationService from "./DecorationService";
import axios from "axios";
import { addItem } from "@/features/itemSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import ClientInputImageEdit from "@/components/ClientInputImageEdit";
import DecorationServiceEdit from "./DecorationServiceEdit";
import { useToast } from "@/components/ui/use-toast";

const ClientServices = () => {
    const { toast } = useToast();
    const Location = useLocation();
    const ID = Location?.state?.itemId;
    const { items } = useSelector((state) => state.item);

    const editItem = items.find((item) => item._id === ID);

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(editItem?.name || "");
    const [description, setDescription] = useState(editItem?.description || "");
    const [contactInfo, setContactInfo] = useState(editItem?.contactInfo || "");
    const [price, setPrice] = useState(editItem?.price || 0);
    const [image, setImage] = useState(editItem?.images[0] || null);

    //catring
    const [menuOptions, setMenuOptions] = useState(editItem?.menuOptions || []);

    //photography
    const [portfolio, setPortfolio] = useState(editItem?.portfolio || []);

    //venu
    const [location, setLocation] = useState(editItem?.location || "");
    const [capacity, setCapacity] = useState(editItem?.capacity || 0);

    //decoration
    const [decorationImages, setDecorationImages] = useState(
        editItem?.decorationImages || []
    );
    const [newDecorationImages, setNewDecorationImages] = useState([]);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const { client } = useSelector((state) => state.client);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const handleImageUpload = async (imageFile) => {
    //     // Convert image to Base64
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(imageFile);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };

    const handleSubmit = async () => {
        if (!name.trim()) {
            return toast({
                variant: "destructive",
                title: "Name is required.",
            });
        } else if (!description.trim()) {
            return toast({
                variant: "destructive",
                title: "Description is required.",
            });
        } else if (isNaN(price) || price <= 0) {
            return toast({
                variant: "destructive",
                title: "Enter a valid number for Price.",
            });
        } else if (
            client?.role?.type.toLowerCase() === "catering" &&
            !menuOptions
        ) {
            return toast({
                variant: "destructive",
                title: "Menu Options are required for Catering.",
            });
        } else if (client?.role?.type.toLowerCase() === "venue") {
            if (!location.trim()) {
                return toast({
                    variant: "destructive",
                    title: "Location is required for Venue.",
                });
            } else if (!capacity || isNaN(capacity) || capacity <= 0) {
                return toast({
                    variant: "destructive",
                    title: "Enter a valid number for Capacity.",
                });
            }
        } else if (
            client?.role?.type.toLowerCase() === "photograph" &&
            !portfolio
        ) {
            return toast({
                variant: "destructive",
                title: "Portfolio is required for Photography.",
            });
        } else if (
            client?.role?.type.toLowerCase() === "decoration" &&
            !decorationImages
        ) {
            return toast({
                variant: "destructive",
                title: "Decoration Images are required.",
            });
        }
        // All required fields are valid, prepare the data and proceed
        const data = {
            name,
            description,
            contactInfo,
            price,
            images: image ? [image] : editItem?.images,
            typeId: client?.role?._id,
            clientId: client._id,
            dates: client.availability,
        };

        if (client?.role?.type.toLowerCase() === "catering") {
            data.menuOptions = menuOptions;
        } else if (client?.role?.type.toLowerCase() === "venue") {
            data.location = location;
            data.capacity = capacity;
        } else if (client?.role?.type.toLowerCase() === "photograph") {
            data.portfolio = portfolio;
        } else if (client?.role?.type.toLowerCase() === "decoration") {
            data.decorationImages = decorationImages;
        }

        try {
            // return;
            setLoading(true);
            if (ID) {
                // Edit existing item
                await axios
                    .put(`${BASE_URL}/items/edit/${ID}`, data, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        navigate("/vendor/profile");
                    })
                    .catch((err) => console.log(err));
            } else {
                // Create new item
                await axios
                    .post(`${BASE_URL}/items/create`, data, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((res) => {
                        dispatch(addItem(res.data.newItem));
                        navigate("/vendor/profile");
                    })
                    .catch((err) => console.log(err));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-card text-foreground flex flex-col justify-center items-center">
            <div className="flex w-full max-w-[1200px] gap-10 flex-col lg:flex-row">
                <div className="space-y-5 flex-1">
                    <ClientInput
                        title={"Name"}
                        type={"text"}
                        value={name}
                        setValue={setName}
                    />
                    <br />
                    <br />
                    <ClientTextArea
                        title={"Description"}
                        value={description}
                        setValue={setDescription}
                    />
                    <br />
                    <br />
                    <ClientInput
                        title={"Contact info"}
                        type={"text"}
                        value={contactInfo}
                        setValue={setContactInfo}
                    />
                    <br />
                    <br />
                    <ClientInput
                        title={"Price"}
                        type={"number"}
                        value={price}
                        setValue={setPrice}
                    />
                    <br />
                    <br />
                    {ID && editItem ? (
                        <ClientInputImageEdit
                            title={"Image"}
                            value={editItem?.images}
                            setValue={setImage}
                            setLoading={setLoading}
                        />
                    ) : (
                        <ClientInputImage
                            title={"Image"}
                            value={image}
                            setValue={setImage}
                            setLoading={setLoading}
                        />
                    )}
                </div>
                <div className="space-y-5 flex-1">
                    {client?.role?.type.toLowerCase() === "catering" && (
                        <CatringService
                            ID={ID}
                            options={menuOptions}
                            setOptions={setMenuOptions}
                        />
                    )}
                    {client?.role?.type.toLowerCase() === "venue" && (
                        <VenueService
                            location={location}
                            setLocation={setLocation}
                            capacity={capacity}
                            setCapacity={setCapacity}
                        />
                    )}
                    {client?.role?.type.toLowerCase() === "photograph" && (
                        <PhotographyService
                            ID={ID}
                            options={portfolio}
                            setOptions={setPortfolio}
                        />
                    )}
                    {client?.role?.type.toLowerCase() === "decoration" &&
                        (ID && editItem ? (
                            <DecorationServiceEdit
                                images={decorationImages}
                                setImages={setDecorationImages}
                                setIsLoading={setLoading}
                            />
                        ) : (
                            <DecorationService
                                images={decorationImages}
                                setImages={setDecorationImages}
                                setIsLoading={setLoading}
                            />
                        ))}
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Button
                    className="w-fit mx-auto px-10 py-[10px]"
                    onClick={() => {
                        if (loading) return;
                        return handleSubmit();
                    }}
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : ID ? (
                        "Save"
                    ) : (
                        "Create"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ClientServices;

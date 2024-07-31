import React, { useEffect, useState } from "react";

import ClientInput from "@/components/ClientInput";
import ClientInputSelect from "@/components/ClientInputSelect";
import ClientTextArea from "@/components/ClientTextArea";
import { Button } from "@/components/ui/button";
import ClientInputImage from "@/components/ClientInputImage";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "@/components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setClient } from "@/features/clientSlice";
import { setUserDetail } from "@/features/userDetailSlice";

const Register = () => {
    const { user } = useSelector((state) => state.user);
    const { userDetail } = useSelector((state) => state.userDetail);

    const [firstName, setFirstName] = useState(user.name || "");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(user.email || "");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("Doha, Qatar");
    const [contact, setContact] = useState("");
    const [qid, setQid] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toast } = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(
                    BASE_URL + "/userDetail/" + user.id
                );
                if (res.data.status == "success") {
                    dispatch(setUserDetail(res?.data.data.UserDetail));
                    navigate("/users/profile");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        const trimmedFirstName = firstName?.trim();
        const trimmedLastName = lastName?.trim();
        const trimmedEmail = email?.trim();
        const trimmedContact = contact?.trim();
        const trimmedQid = qid?.trim();

        if (!trimmedFirstName) {
            return toast({
                variant: "destructive",
                title: "First Name is required.",
            });
        } else if (!trimmedLastName) {
            return toast({
                variant: "destructive",
                title: "Last Name is required.",
            });
        } else if (!trimmedEmail) {
            return toast({
                variant: "destructive",
                title: "Email is required.",
            });
        } else if (!trimmedContact) {
            return toast({
                variant: "destructive",
                title: "Contact is required.",
            });
        } else if (!trimmedQid) {
            return toast({
                variant: "destructive",
                title: "QID is required.",
            });
        }

        // Prepare the data object with trimmed values and optional image
        const userDetails = {
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            email: trimmedEmail,
            userId: user.id,
            contact: trimmedContact,
            qId: trimmedQid,
            profile_photo: image || null, // Set to null if image is not provided
        };

        try {
            setIsLoading(true);
            await axios
                .post(`${BASE_URL}/userDetail`, userDetails, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    dispatch(setUserDetail(res.data.data.newUser));

                    navigate("/users/profile");
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const options = [
        {
            _id: "Doha, Qatar",
            type: "Doha, Qatar",
        },
        {
            _id: "Michingam, US",
            type: "Michingam, US",
        },
        {
            _id: "Chennai, India",
            type: "Chennai, India",
        },
    ];

    return (
        <div className="  bg-card text-foreground   flex  justify-center items-center flex-col ">
            <div className="flex w-full max-w-[1200px] gap-10 flex-col lg:flex-row">
                <div className="space-y-5 flex-1 ">
                    {/* //typid //clientid */}
                    {/* name */}
                    <ClientInput
                        title={"First Name"}
                        type={"text"}
                        value={firstName}
                        setValue={setFirstName}
                    />

                    <br />
                    <br />
                    <ClientInput
                        title={"Last Name"}
                        type={"text"}
                        value={lastName}
                        setValue={setLastName}
                    />
                    <br />
                    <br />
                    <ClientInput
                        title={"Email"}
                        type={"email"}
                        value={email}
                        setValue={setEmail}
                    />

                    {/* <br />
                    <br />
                    <ClientInput
                        title={"Work Experience"}
                        type={"text"}
                        value={experience}
                        setValue={setExperience}
                    /> */}

                    <br />
                    <br />
                    <ClientInput
                        title={"Contact"}
                        type={"text"}
                        value={contact}
                        setValue={setContact}
                    />

                    {/* <br />
                    <br />
                    <ClientTextArea
                        title={"Description"}
                        value={description}
                        setValue={setDescription}
                    /> */}
                </div>

                <div className="space-y-5 flex-1 ">
                    {/* <ClientInputSelect
                        title={"Location"}
                        options={options}
                        value={location}
                        setValue={setLocation}
                    />
                    <br />
                    <br /> */}
                    <ClientInput
                        title={"QID"}
                        type={"text"}
                        value={qid}
                        setValue={setQid}
                    />
                    <br />
                    <br />
                    <ClientInputImage
                        title={"Image"}
                        value={image}
                        setValue={setImage}
                        setLoading={setIsLoading}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Button
                    className="w-fit mx-auto px-10 py-[10px]"
                    onClick={() => {
                        if (isLoading) return;
                        return handleSubmit();
                    }}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Create"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Register;

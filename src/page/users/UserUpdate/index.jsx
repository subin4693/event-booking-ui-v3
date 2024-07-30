import React, { useState } from "react";

import ClientInput from "@/components/ClientInput";
import ClientInputSelect from "@/components/ClientInputSelect";
import ClientTextArea from "@/components/ClientTextArea";
import { Button } from "@/components/ui/button";
import ClientInputImage from "./ClientInputImage";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setUserDetail } from "@/features/userDetailSlice";
import { setUser } from "@/features/userSlice";

const Register = () => {
    const { user } = useSelector((state) => state.user);
    const { userDetail } = useSelector((state) => state.userDetail);

    const name = user.name.split(" ");

    const [firstName, setFirstName] = useState(
        name[0] || userDetail.firstName || ""
    );
    const [lastName, setLastName] = useState(
        name[1] || userDetail.lastName || ""
    );
    const [email, setEmail] = useState(user.email || userDetail.email || "");
    const [experience, setExperience] = useState(
        userDetail.workExperience || ""
    );
    const [location, setLocation] = useState(
        userDetail.location || "Doha, Qatar"
    );
    const [contact, setContact] = useState(userDetail.contact || "");
    const [qid, setQid] = useState(userDetail.qId || "");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(
        userDetail.description || ""
    );
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { toast } = useToast();

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async () => {
        // if (!image || image.length === 0) {
        //   toast({
        //     description: "There is no image provided",
        //     variant: "destructive",
        //   });

        //   return;
        // }
        let picture = "";

        if (image === null) {
            picture = userDetail.profile_photo;
        } else if (image.length > 0) {
            const file = image[0];
            picture = await fileToBase64(file);
        }

        const userDetails = {
            firstName,
            lastName,
            email,
            userId: user.id,
            workExperience: Number(experience),
            location,
            contact,
            qId: qid,
            profile_photo: picture,
            description,
        };

        const nn = firstName + " " + lastName;

        try {
            setIsLoading(true);
            if (
                name[0] !== firstName ||
                name[1] !== lastName ||
                user.email !== email
            ) {
                await axios
                    .post(`${BASE_URL}/user/${user.id}`, {
                        name: nn,
                        email: email,
                    })
                    .then((res) => {
                        dispatch(setUser(res.data.data));
                        setIsLoading(false);
                    })
                    .catch((err) => console.log(err));
            }

            await axios
                .put(`${BASE_URL}/userDetail/${userDetail._id}`, userDetails, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    dispatch(setUserDetail(res.data.data.UserDetail));

                    navigate("/users/profile");
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
            setIsLoading(false);
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
        <div className="  bg-card text-foreground   flex flex-col justify-center items-center ">
            <div className="flex w-full max-w-[1200px] gap-10">
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
                    {/* 
                    <br />
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
                        value={userDetail.profile_photo}
                        setValue={setImage}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <Button
                    className="w-fit mx-auto px-10 py-[10px]"
                    onClick={handleSubmit}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Register;

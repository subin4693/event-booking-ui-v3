import React, { useEffect, useState } from "react";
import ClientInput from "@/components/ClientInput";
import ClientInputSelect from "@/components/ClientInputSelect";
import ClientTextArea from "@/components/ClientTextArea";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import MultiDatePicker from "@/components/MultiDatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setClient } from "@/features/clientSlice";
import ClientInputImageEdit from "@/components/ClientInputImageEdit";
import { setUser } from "@/features/userSlice";
import useImageToBase64 from "@/hooks/useImageToBase64";

const Register = () => {
    const { user } = useSelector((state) => state.user);
    const { client } = useSelector((state) => state.client);

    const name = user?.name?.split(" ");

    const [firstName, setFirstName] = useState(
        (name[0] && name[0]) || client?.firstName || ""
    );
    const [lastName, setLastName] = useState(
        (name[1] && name[1]) || client?.lastName || ""
    );
    const [email, setEmail] = useState(user?.email || client?.email || "");
    const [experience, setExperience] = useState(client?.workExperience || "");
    const [role, setRole] = useState(client?.role?._id || "");
    const [contact, setContact] = useState(client?.contact || "");
    const [qid, setQid] = useState(client?.qId || "");
    const [crno, setCrno] = useState(client?.crNo || "");
    const [image, setImage] = useState(client?.bestWork || "");
    const [description, setDescription] = useState(client?.description || "");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(client?.availability || []);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async () => {
        const trimmedFirstName = firstName?.trim();
        const trimmedLastName = lastName?.trim();
        const trimmedEmail = email?.trim();
        const trimmedRole = role?.trim();
        const trimmedContact = contact?.trim();
        const trimmedQid = qid?.trim();
        const trimmedCrno = crno?.trim();
        const trimmedDescription = description?.trim();

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
        } else if (!experience) {
            return toast({
                variant: "destructive",
                title: "Experience is required.",
            });
        } else if (isNaN(experience) || experience <= 0) {
            return toast({
                variant: "destructive",
                title: "Enter a valid number for Experience.",
            });
        } else if (!trimmedRole) {
            return toast({
                variant: "destructive",
                title: "Role is required.",
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
        } else if (!trimmedCrno) {
            return toast({
                variant: "destructive",
                title: "CR No is required.",
            });
        } else if (!trimmedDescription) {
            return toast({
                variant: "destructive",
                title: "Description is required.",
            });
        }

        const data = {
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            email: trimmedEmail,
            userId: user.id,
            role: trimmedRole,
            workExperience: experience, // Assuming experience is a number, no need to trim
            // location: location?.trim(), // Uncomment and trim if needed
            contact: trimmedContact,
            qId: trimmedQid,
            crNo: trimmedCrno,
            bestWork: image, // Assuming image is not a string, no need to trim
            description: trimmedDescription,
            date: date, // Assuming date is not a string, no need to trim
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
                        console.log(res.data);
                        dispatch(setUser(res.data.data));
                        setIsLoading(false);
                    })
                    .catch((err) => console.log(err));
            }
            console.log(data);

            await axios.patch(`${BASE_URL}/client/${client?._id}`, data);

            const res = await axios.get(`${BASE_URL}/client/${user.id}`);

            if (res.data.status === "success") {
                dispatch(setClient(res.data.data.client));
                navigate("/vendor/profile");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const getTypes = async () => {
            const res = await axios.get(BASE_URL + "/types");
            setOptions(res.data.types);
        };
        getTypes();
    }, []);

    return (
        <div className="bg-card text-foreground flex flex-col justify-center items-center">
            <div className="flex w-full max-w-[1200px] gap-10 flex-col lg:flex-row">
                <div className="space-y-5 flex-1">
                    <ClientInput
                        title={"First Name"}
                        type={"text"}
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <ClientInput
                        title={"Last Name"}
                        type={"text"}
                        value={lastName}
                        setValue={setLastName}
                    />
                    <ClientInput
                        title={"Email"}
                        type={"email"}
                        value={email}
                        setValue={setEmail}
                    />
                    <ClientInputSelect
                        options={options}
                        title={"Role"}
                        value={role}
                        setValue={setRole}
                    />
                    <ClientInput
                        title={"Work Experience"}
                        type={"text"}
                        value={experience}
                        setValue={setExperience}
                    />
                    <ClientInput
                        title={"Contact"}
                        type={"text"}
                        value={contact}
                        setValue={setContact}
                    />
                    <ClientTextArea
                        title={"Description"}
                        value={description}
                        setValue={setDescription}
                    />
                </div>
                <div className="space-y-5 flex-1">
                    <ClientInput
                        title={"QID"}
                        type={"text"}
                        value={qid}
                        setValue={setQid}
                    />
                    <ClientInput
                        title={"CRno"}
                        type={"text"}
                        value={crno}
                        setValue={setCrno}
                    />
                    <ClientInputImageEdit
                        title={"Image"}
                        value={image}
                        setValue={setImage}
                        setLoading={setIsLoading}
                    />
                    <MultiDatePicker date={date} setSelectedDate={setDate} />
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

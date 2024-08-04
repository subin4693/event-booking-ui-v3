import React, { useEffect, useState } from "react";
import ClientInput from "@/components/ClientInput";
import ClientInputSelect from "@/components/ClientInputSelect";
import ClientTextArea from "@/components/ClientTextArea";
import { Button } from "@/components/ui/button";
import ClientInputImage from "@/components/ClientInputImage";
import { v4 as uuidv4 } from "uuid";
import MultiDatePicker from "@/components/MultiDatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "@/components/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { setClient } from "@/features/clientSlice";

const Register = () => {
    const { user } = useSelector((state) => state.user);

    const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
    const [lastName, setLastName] = useState(user?.name?.split(" ")[1] || "");
    const [email, setEmail] = useState(user?.email || "");
    const [experience, setExperience] = useState("");
    const [role, setRole] = useState("");
    const [contact, setContact] = useState("");
    const [qid, setQid] = useState("");
    const [crno, setCrno] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState([]);

    // const { base64: imageBase64, error: imageError } = useImageToBase64(image);

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
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            userId: user.id.trim(),
            role: role.trim(),
            workExperience: experience.trim(),

            contact: contact.trim(),
            qId: qid.trim(),
            crNo: crno.trim(),
            bestWork: image,
            description: description.trim(),
            date: date,
        };
        try {
            setIsLoading(true);

            const res = await axios.post(`${BASE_URL}/client`, data);

            if (res.data.status === "success") {
                dispatch(setClient(res?.data.data.newClient));
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
            setOptions(res?.data?.types);


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
                    <ClientInputImage
                        title={"Image"}
                        value={image}
                        setValue={setImage}
                        setLoading={setIsLoading}
                    />
                    <MultiDatePicker setSelectedDate={setDate} />
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

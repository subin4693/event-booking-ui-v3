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
import useImageToBase64 from "@/hooks/useImageToBase64"; // Import your custom hook

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
        // console.log(imageBase64);
        if (!image) {
            toast({
                description:
                    "There is no image provided or failed to convert to Base64.",
                variant: "destructive",
            });
            return;
        }

        // const data = new FormData();
        // data.append("firstName", firstName);
        // data.append("lastName", lastName);
        // data.append("email", email);
        // data.append("userId", user.id);
        // data.append("role", role);
        // data.append("workExperience", experience);
        // data.append("location", location);
        // data.append("contact", contact);
        // data.append("qId", qid);
        // data.append("crNo", crno);
        // data.append("bestWork", image);
        // data.append("description", description);
        // date.forEach((d) => data.append("availability[]", d));
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: user.id,
            role: role,
            workExperience: experience,
            location: location,
            contact: contact,
            qId: qid,
            crNo: crno,
            bestWork: image,
            description: description,
            date: date,
        };
        try {
            setIsLoading(true);
            console.log(data);
            const res = await axios.post(`${BASE_URL}/client`, data);

            if (res.data.status === "success") {
                console.log(res.data);
                dispatch(setClient(res?.data.data.newClient));
                navigate("/vendor/dashboard");
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
                        type={"number"}
                        value={experience}
                        setValue={setExperience}
                    />
                    <ClientInput
                        title={"Contact"}
                        type={"number"}
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
                    />
                    <MultiDatePicker setSelectedDate={setDate} />
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
                        "Create"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Register;

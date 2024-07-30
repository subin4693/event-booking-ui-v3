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
        (name[0] && name[0]) || client?.firstName || "",
    );
    const [lastName, setLastName] = useState(
        (name[1] && name[1]) || client?.lastName || "",
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
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userId: user.id,
            role: role,
            workExperience: experience,
            // location: location,
            contact: contact,
            qId: qid,
            crNo: crno,
            bestWork: image,
            description: description,
            date: date,
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
                    <ClientInputImageEdit
                        title={"Image"}
                        value={image}
                        setValue={setImage}
                    />
                    <MultiDatePicker date={date} setSelectedDate={setDate} />
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

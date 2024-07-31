import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setClient } from "@/features/clientSlice";
import { Loader2 } from "lucide-react";

const RegisterCard = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const client = useSelector((state) => state.client.client);

    const { user } = useSelector((state) => state.user);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const getClientData = async () => {
            try {
                setLoading(true);
                if (client?._id) {
                    return navigate("/vendor/dashboard");
                }
                const res = await axios.get(BASE_URL + "/client/" + user.id);

                if (res.data.status == "success") {
                    dispatch(setClient(res?.data.data.client));
                    navigate("/vendor/dashboard");
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getClientData();
    }, []);

    return (
        <div className="flex justify-center items-center h-full">
            <Card className="max-w-[450px] overflow-hidden pt-5 bg-muted">
                <CardContent>
                    <div className="w-full max-h-[300px] overflow-hidden rounded-lg mb-4">
                        <img
                            src="https://github.com/shadcn.png"
                            className="w-full h-full object-coveer"
                        />
                    </div>

                    <CardTitle>Qatar Event Hub</CardTitle>
                    <br />
                    <CardDescription className="indent-5 text-justify">
                        Qatar's population is a diverse mix of locals and
                        expatriates, with a strong emphasis on maintaining
                        cultural traditions alongside modern development. The
                        country's infrastructure is state-of-the-art, featuring
                        iconic structures like the Museum of Islamic Art and the
                        futuristic skyline of Doha.
                    </CardDescription>
                    <div className="flex items-center justify-center mt-7">
                        <Link to="register">
                            <Button>
                                {loading ? (
                                    <Loader2 className="mx-5 h-4 w-4 animate-spin" />
                                ) : (
                                    "Register"
                                )}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterCard;

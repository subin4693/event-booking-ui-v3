import React from "react";
import ClientInput from "@/components/ClientInput";
import ClientTextArea from "@/components/ClientTextArea";

const VenueService = ({ location, setLocation, capacity, setCapacity }) => {
    return (
        <>
            <ClientTextArea
                title={"Location"}
                value={location}
                setValue={setLocation}
            />
            <ClientInput
                title={"Capacity"}
                type={"number"}
                value={capacity}
                setValue={setCapacity}
            />
        </>
    );
};

export default VenueService;

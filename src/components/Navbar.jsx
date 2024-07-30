import React from "react";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = ({ person }) => {
    return (
        <nav className="bg-primary flex justify-between items-center p-4 ">
            <h2 className="font-bold text-xl text-white">
                <span className="hidden md:inline"> Welcome to </span> {person}{" "}
                Dashboard
            </h2>
            <ModeToggle />
        </nav>
    );
};

export default Navbar;

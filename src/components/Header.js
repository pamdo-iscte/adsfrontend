import leftArrow from "../assets/leftarrow.svg";
import React from "react";
import iscte from '../assets/iscte.png';
const Header = () => {

    const enteriscte = () => {
        window.open("https://www.iscte-iul.pt/")
    }

    return (
        <header
            className="absolute font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[4rem] w-full bg-blue-100">
        </header>)
};




export default Header;
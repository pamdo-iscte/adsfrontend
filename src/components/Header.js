import leftArrow from "../assets/leftarrow.svg";
import React from "react";
import iscte from '../assets/iscte.png';
const Header = () => {

    const enteriscte = () => {
        window.open("https://www.iscte-iul.pt/")
    }

    return (
        <header
            className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
            <button className="ml-[10px] flex flex-row  flex justify-center items-center" onClick={enteriscte}>
                <img className="h-[100px]" src={iscte} alt={"Left Arrow"}/>

            </button>
        </header>)
};




export default Header;
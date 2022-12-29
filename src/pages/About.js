import '../../src/App.css';
import {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import StudentTeacherwithAccount from "./StudentTeacherwithAccount";
import HomePage from "./HomePage"
import ServiçosAcadémicos from "./ServiçosAcadémicos";
import MakeCalendar from "./MakeCalendar";
import SideBar from "../components/SideBar";

function About() {


    return (
        <div>
            <Header></Header>
            <div className="mx-auto pt-[4rem]">
                <SideBar></SideBar>
                <h1 className="pt-[5rem] text-center"> Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                    por:</h1>
                <h2 className="pt-[1rem] text-center">92339 Pedro d'Oliveira, </h2>
                <h2 className="pt-[1rem] text-center">93028 Diogo Cosme, </h2>
                <h2 className="pt-[1rem] text-center">93326 Inês Carmo, </h2>
                <h2 className="pt-[1rem] text-center">92908 Guilherme Carvalho </h2>
            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>
    );
}

export default About;

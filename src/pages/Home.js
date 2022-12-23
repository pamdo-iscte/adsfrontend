import '../../src/App.css';
import {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import StudentTeacherwithAccount from "./StudentTeacherwithAccount";
import HomePage from "./HomePage"
import ServiçosAcadémicos from "./ServiçosAcadémicos";
import MakeCalendar from "./MakeCalendar";
import SideBar from "../components/SideBar";

function Home() {
    const [alunoprofessor, setAlunoprofessor] = useState(false);
    const [servicos, setServiços] = useState(false);
    const navigate = useNavigate()

    const setAlunoProfessorTrue = () => {
        setAlunoprofessor(true)
        setServiços(false)
    }

    const setServiçosTrue = () => {
        setAlunoprofessor(false)
        setServiços(true)
    }



    return (
        <div>
            <Header></Header>
            <div className="mx-auto pt-[4rem]">
              <SideBar></SideBar>
                <h1 className="pt-[4rem] text-center font-bold text-[24px]">Bem vindo</h1>
                <h1 className="text-center font-medium text-[24px]" >Neste site poderá criar o seu horário.</h1>
            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>
);
}

export default Home;

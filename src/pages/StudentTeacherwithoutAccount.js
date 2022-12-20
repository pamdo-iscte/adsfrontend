import '../../src/App.css';
import {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Calendar from "./Calendar";
import leftArrow from "../assets/leftarrow.svg";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function StudentTeacherwithAccount() {
    const [hasAccount, setHasAccount] = useState(false);
    const [name, setName] = useState(false);
    const [username, setUsername] = useState('')
    const [createAccount, setCreateAccount] = useState(false);
    const navigate = useNavigate()


    const fhasAccount = () => {
        setHasAccount(true)
        setCreateAccount(false)
        setName(true)

    }
    const goTocalendar = () => {
        navigate('/makecalendar', {
            state: {
                num: username,
            }
        })
    }

    const teste = () => {
        //fetch("/lei")
        //  .then((res) => res.json())
        // .then((data) => console.log(data));
        navigate('/makecalendar')
    }

    const newAccount = () => {
        setHasAccount(false)
        setCreateAccount(true)
        setName(true)
    }
    console.log(username)
    const returnHome = () => {
        navigate('/')
    }

    return (
        <div>
           <Header></Header>
            <div className="pt-[4rem]">
                <SideBar></SideBar>
                <h1 className="pt-[4rem] text-center font-bold text-[24px]">Iniciar Sessão</h1>
                <form className="md:mt-[32px] lg:mt-[36px] flex flex-row  flex justify-center items-center">
                    <div className="group  lg:w-[350px]">
                        <label
                            className="text-center group-focus-within:text-blue-500 font-serif md:text-[15px] lg:text-[18px] font-normal leading-[22px] text-[dark] mt-3 pb-5">
                            Número de Utilizador
                        </label>
                        <input onChange={e => setUsername(e.target.value)} name="username"
                               className="bg-white mt-[8px] rounded-[8px] w-full text-gray-700 py-3 px-4 mb-[30px] leading-tight border-[1px] focus:outline-none focus:shadow-lg focus:shadow-shadowColor focus:border-b-blue-500"
                               id="grid-first-name" type="text">
                        </input>
                    </div>
                </form>
                <div className="flex flex-row  flex justify-center items-center">
                    <button onClick={goTocalendar} disabled={username !== '' ? false : true}
                            className={"ml-[30px] py-[12px] px-[50px] rounded-[6.25rem] ml-[1.875rem] "
                                + (username !== '' ? 'bg-blue-600' : 'bg-gray-400')}>
                        <p className={"font-Lato font-bold text-base leading-[1.2rem] "
                            + (username !== '' ? 'text-white' : 'text-gray-600')}>
                            Avançar
                        </p>
                    </button>
                </div>

            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>
    );
}

export default StudentTeacherwithAccount;

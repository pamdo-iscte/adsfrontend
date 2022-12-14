import '../../src/App.css';
import {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Calendar from "./Calendar";
import leftArrow from "../assets/leftarrow.svg";
import Header from "../components/Header";

function StudentTeacher() {
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
        if (hasAccount) {
            navigate('/mycalendar', {
                state: {
                    num: username,
                }

            })
        } else {
            navigate('/teste', {
                state: {
                    num: username,
                }
            })

        }
    }

    const teste = () => {
        //fetch("/lei")
        //  .then((res) => res.json())
        // .then((data) => console.log(data));
        navigate('/testes')
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
            <div className="mx-auto w-[1024px] pt-[8rem] px-5">
                <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                    <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                    <p className="ml-[8px] ">Voltar para o Ecrã Principal</p>
                </button>
                <h1 className="text-center font-bold text-[24px]">Iniciar Sessão</h1>
                <h1 className="text-center mt-[20px] font-medium">Sou:</h1>
                <div className="mt-[30px] flex flex-row  flex justify-center items-center ">
                    <button onClick={fhasAccount} className=
                        {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                            + (hasAccount ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>Tenho conta
                    </button>
                    <button onClick={newAccount} className=
                        {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                            + (createAccount ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>Criar conta
                    </button>
                </div>
                {name ? <div>
                    <form className="md:mt-[32px] lg:mt-[36px] flex flex-row  flex justify-center items-center">
                        <div className="group  lg:w-[350px]">
                            <label
                                className="text-center group-focus-within:text-blue-500 font-serif md:text-[15px] lg:text-[18px] font-normal leading-[22px] text-[dark] mt-3 pb-5">
                                Número
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

                </div> : ''}


            </div>
            <footer
                className="absolute font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho
            </footer>
        </div>
    );
}

export default StudentTeacher;

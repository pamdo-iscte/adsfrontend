import '../../src/App.css';
import {useState} from "react";

import {useNavigate} from 'react-router-dom';
import Calendar from "./Calendar";

function Home() {
    const [aluno, setAluno] = useState(false);
    const [professor, setProfessor] = useState(false);
    const navigate = useNavigate()


    const [sv, setSV] = useState(false);


    const setProfessorTrue = () => {
        navigate('/login')
    }

    const teste = () => {
        //fetch("/lei")
        //  .then((res) => res.json())
        // .then((data) => console.log(data));
        navigate('/testes')
    }

    const setSVTrue = () => {
        navigate('/academicservices')
        setAluno(false)
        setProfessor(false)
        setSV(true)

    }



    return (
        <div>
            <header
                className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <div className="mx-auto w-[1024px] pt-[8rem] px-5">
            <h1 className="text-center font-bold text-[24px]">Iniciar Sessão</h1>
            <h1 className="text-center mt-[20px] font-medium">Sou:</h1>
            <div className="mt-[30px] flex flex-row  flex justify-center items-center ">
                <button onClick={setProfessorTrue} className=
                    {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[300px] h-[50px] font-bold text-[20px] leading-[20px] "
                        + (professor ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>PROFESSOR/ESTUDANTE
                </button>
                <button onClick={setSVTrue} className=
                    {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                        + (sv ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>SERVIÇOS ACADÉMICOS
                </button>
            </div>



            </div>
            <footer
                className="absolute font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho
            </footer>
        </div>
    );
}

export default Home;

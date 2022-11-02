
import '../../src/App.css';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
function Home() {
    const [aluno, setAluno] = useState(false);
    const [professor, setProfessor] = useState(false);
    const navigate = useNavigate()
    const [licenciatura, setLicenciatura] = useState(false);
    const [mestrado, setMestrado] = useState(false);
    const [doutaremento, setDoutaremento] = useState(false);
    const [cursos, setCurso] = useState("")

    const [sv, setSV] = useState(false);

    const setAlunoTrue = () => {
        setAluno(true)
        setProfessor(false)
        setSV(false)
        setLicenciatura(false)
        setMestrado(false)
        setDoutaremento(false)
    }

    const setProfessorTrue = () => {
        setAluno(false)
        setProfessor(true)
        setSV(false)
        setLicenciatura(false)
        setMestrado(false)
        setDoutaremento(false)
    }
    const [posts, setPosts] = useState([]);

    const teste = () => {
        fetch("/cenas")
            .then((res) => res.json())
            .then((data) => console.log(data));

    }

    const setSVTrue = () => {
        navigate('/academicservices')
        setAluno(false)
        setProfessor(false)
        setSV(true)
        setLicenciatura(false)
        setMestrado(false)
        setDoutaremento(false)
    }

    const setLicenciaturaTrue = () => {
        setLicenciatura(true)
        setMestrado(false)
        setDoutaremento(false)
    }

    const setMestradoTrue = () => {
        setLicenciatura(false)
        setMestrado(true)
        setDoutaremento(false)
    }

    const setDoutoramentoTrue = () => {
        setLicenciatura(false)
        setMestrado(false)
        setDoutaremento(true)
    }

    return (
        <div>
            <header className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <body className="mx-auto w-[1024px] pt-[8rem]">
            <h1 className="text-center font-bold text-[24px]">Iniciar Sessão</h1>
            <h1 className="text-center mt-[20px] font-medium">Sou:</h1>
            <div className="mt-[30px] flex flex-row  flex justify-center items-center ">
                <button onClick={setProfessorTrue} className=
                    {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                        + (professor ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>PROFESSOR</button>
                <button onClick={setAlunoTrue} className=
                    {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                        + (aluno ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>ESTUDANTE</button>
                <button onClick={setSVTrue} className=
                    {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                        + (sv ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>SERVIÇOS ACADÉMICOS</button>
            </div>
            {aluno ?
                <div className="mt-[50px] flex flex-row  flex justify-center items-center ">
                    <button onClick={setLicenciaturaTrue} className=
                        {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                            + (licenciatura ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>LICENCIATURA</button>
                    <button onClick={setMestradoTrue} className=
                        {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                            + (mestrado ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>MESTRADO</button>
                    <button onClick={setDoutoramentoTrue} className=
                        {"ml-[20px] hover:bg-red-300 text-center rounded-[8px] w-[180px] h-[50px] font-bold text-[20px] leading-[20px] "
                            + (doutaremento ? 'bg-blue-800 text-white' : 'bg-blue-300 text-dark')}>DOUTORAMENTO</button>
                </div>
                : ""}
            <button onClick={teste}>TESTE</button>
            <h1>coco {posts}</h1>
            {licenciatura || mestrado ?  <div className="mt-[30px] text-center font-bold text-[24px] flex flex-col  flex justify-center items-center ">
                <label htmlFor="countries" className="block mb-2 text-[18px] font-medium text-dark">Indique o seu curso:</label>
                <select onChange={e => setCurso(e.target.value)} className="text-center ml-[20px] bg-gray-50 border border-gray-300 text-gray-900 text-[14px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[580px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option >Antropologia</option>
                    <option >Arquitetura</option>
                    <option >Ciência de Dados</option>
                    <option >Ciência Política</option>
                    <option >Economia</option>
                    <option >Engenharia de Telecomunicações e Informática</option>
                    <option >Engenharia Informática</option>
                    <option >Finanças e Contabilidade</option>
                    <option >Gestão</option>
                    <option >Gestão de Marketing</option>
                    <option >Gestão de Recursos Humanos</option>
                    <option >Gestão Industrial e Logística</option>
                    <option >História Moderna e Contemporânea</option>
                    <option >Informática e Gestão de Empresas</option>
                    <option >Psicologia</option>
                    <option >Serviço Social </option>
                    <option >Sociologia </option>
                </select>
            </div>:""}

            </body>
            <footer className="font-medium bg-blue-100 absolute mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho</footer>
        </div>
    );
}

export default Home;

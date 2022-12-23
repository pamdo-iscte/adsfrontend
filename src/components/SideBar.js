import {useState} from "react";
import {useNavigate} from "react-router-dom";
import about from '../assets/about.png';
import home from '../assets/home.png';
import iscte from '../assets/iscte.png';
import login from '../assets/login.png';
const Spinner = () => {
    const navigate = useNavigate()

    const setHomeTrue = () => {
        navigate("/")
    }
    const enteriscte = () => {
        window.open("https://www.iscte-iul.pt/")
    }

    const setServiçosTrue = () => {
        navigate('/academicservices')
    }
    const setAlunoProfessorTruewithoutAccount = () => {
        navigate('/login1')
    }
    const setAlunoProfessorTruewithAccount = () => {
        navigate('/login')
    }
    const setAboutTrue = () => {
        navigate('/about    ')
    }
    return (
        <div>
        <div className="w-full  shadow-md bg-white absolute" id="sidenavSecExample">
            <ul className="relative px-1 flex flex-row">
                <li className="relative">
                    <button onClick={setHomeTrue} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                       data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <img src={home} className="w-3 h-3 mr-3"/>
                        <span>Home</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setServiçosTrue} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <img src={home} className="w-3 h-3 mr-3"/>
                        <span>Serviços Académicos</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setAlunoProfessorTruewithoutAccount} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <img src={login} className="w-3 h-3 mr-3"/>
                        <span>Professor/Estudante Criar Conta</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setAlunoProfessorTruewithAccount} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <img src={login} className="w-3 h-3 mr-3"/>
                        <span>Professor/Estudante Já tenho conta</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setAboutTrue} className={'flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out'
                        + (true ? 'bg-red-700':'bg-blue-400')}
                       data-mdb-ripple="true" data-mdb-ripple-color="primary">
                       <img src={about} className="w-3 h-3 mr-3"/>
                        <span>About</span>
                    </button>
                </li>
                <li className="relative">
                    <img src={iscte} onClick={enteriscte} className="flex items-center text-sm py-4 px-6 h-12
                    overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300
                     ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">

                    </img>
                </li>
            </ul>
        </div>
        </div>)
};




export default Spinner;
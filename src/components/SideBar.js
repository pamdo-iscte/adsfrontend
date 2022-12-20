import {useState} from "react";
import {useNavigate} from "react-router-dom";
import about from '../assets/about.png';
import home from '../assets/home.png';
const Spinner = () => {
    const navigate = useNavigate()

    const setHomeTrue = () => {
        navigate("/")
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
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                        </svg>
                        <span>Serviços Académicos</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setAlunoProfessorTruewithoutAccount} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                        </svg>
                        <span>Professor/Estudante Criar Conta</span>
                    </button>
                </li>
                <li className="relative">
                    <button onClick={setAlunoProfessorTruewithAccount} className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-blue-600 hover:bg-blue-50 transition duration-300 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="primary">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3"
                             role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="currentColor"
                                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                        </svg>
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
            </ul>
        </div>
        </div>)
};




export default Spinner;
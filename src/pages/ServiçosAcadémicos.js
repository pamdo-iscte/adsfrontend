import {useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const animatedComponents = makeAnimated();
    const options = [

        { value: "chocolate", label: "Chocolate" },
        { value: "teste", label: "teste" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
        { value: "Apple", label: "apple" },
        { value: "Orange", label: "orange" }
    ];
    const [selectedOption, setSelectedOption] = useState();
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };


    const filterOptions = (candidate, input) => {
        if (input) {
            if (candidate.label.toLowerCase().includes(input.toLowerCase()))
                return true;
            if (
                selectedOption.some((opt) => {
                    if (opt.value === candidate.value) return true;
                    else return false;
                })
            )
                return true;
            return false;
        }
        return true;
    };

    const returnHome = () => {
        navigate('/')
    }

    return (
        <div>
            <header className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <body className="mx-auto w-[1024px] pt-[8rem]">
            <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                <p className="ml-[8px] ">Voltar para o Ecrâ Principal</p>
            </button>

            <h1 className="text-center font-bold text-[20px] mb-[50px]">Escolha os Metodos que pretende que seja aplicado:</h1>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                isSearchable
                filterOption={filterOptions}
            />
            <button className="mt-[20px] flex flex-row  flex justify-center items-center
            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
            ">Criar um horário com estes métodos</button>

            </body>
            <footer className="font-medium bg-blue-100 absolute mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho</footer>
        </div>)
}
export default ServiçosAcadémicos;
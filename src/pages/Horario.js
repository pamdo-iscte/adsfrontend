import {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import 'react-tabulator/lib/styles.css';
import {ReactTabulator} from 'react-tabulator'

function Horario() {

    useEffect(() => {
        fetch("/ze")
            .then((res) => res.json())
            .then((data) => setProfessor(data));
    }, []);
    const navigate = useNavigate()
    const animatedComponents = makeAnimated();
    const [professor, setProfessor] = useState();
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);
    const options = [
        {value: "teste", label: "teste"},
        {value: "chocolate", label: "Chocolate1"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"},
        {value: "Apple", label: "apple"},
        {value: "Orange", label: "orange"}
    ];
    const [selectedOption, setSelectedOption] = useState();
    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.log(selectedOption)
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
    const see = () => {
        console.log(selectedOption)
    }

    const columns = [
        {title: "Name", field: "name", width: 150},
        {title: "Age", field: "age", hozAlign: "left", formatter: "progress"},
        {title: "Favourite Color", field: "col"},
        {title: "Date Of Birth", field: "dob", hozAlign: "center"},
        {title: "Rating", field: "rating", hozAlign: "center", formatter: "star"},
        {title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross"}
    ];
    var data = [
        {id: 1, name: "Oli Bob", age: "12", col: "red", dob: ""},
        {id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982"},
        {id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982"},
        {id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980"},
        {id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999"},
    ];

    return (
        <div>
            <header
                className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <body className="mx-auto w-[1024px] pt-[8rem]">
            <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                <p className="ml-[8px] ">Voltar para o Ecrâ Principal</p>
            </button>

            <h1 className="text-center font-bold text-[20px] mb-[50px]">Escolha o seu Horário:</h1>
            <div>
                <h1>Escolha o curso</h1>
                <Select className="w-[200px]"
                        value={selectedOption}
                        onChange={handleChange}
                        options={professor}
                        closeMenuOnSelect={true}
                        isMulti
                        isSearchable
                        filterOption={filterOptions}
                />
            </div>


            <button onClick={see} className="mt-[20px] flex flex-row  flex justify-center items-center
            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
            ">Criar um horário com estes métodos
            </button>

            </body>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>)
}

export default Horario;
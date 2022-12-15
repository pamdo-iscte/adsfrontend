import {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import Header from "../components/Header";
import { CSVLink, CSVDownload } from "react-csv";
function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const animatedComponents = makeAnimated();
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];
    const options = [

        {value: "chocolate", label: "Chocolate"},
        {value: "strawberry", label: "Strawberry"},
        {value: "vanilla", label: "Vanilla"},
        {value: "Apple", label: "apple"},
        {value: "Orange", label: "orange"}
    ];
    const [methods, setMethodsAvaliation] = useState(null)
    const [methodsAulas, setMethodsAulas] = useState(null)
    const [selectedOptionAulas, setSelectedOptionAulas] = useState();
    const [selectedOptionAvaliacoes, setSelectedOptionAvaliacoes] = useState();
    const handleChangeAulas = (selectedOption) => {
        setSelectedOptionAulas(selectedOption);
    };
    const handleChangeAvaliacoes = (selectedOption) => {
        setSelectedOptionAvaliacoes(selectedOption);
    };
    const [pBar, setpBar] = useState(30)
    const fetchData = async () => {
        const response = await fetch('get_metodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            mode: 'cors',

        })
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }
    const ProgressBar = (props) => {
        const {bgcolor, completed} = props;

        const containerStyles = {
            height: 20,
            width: '100%',
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            margin: 50
        }

        const fillerStyles = {
            height: '100%',
            width: `${completed}%`,
            backgroundColor: bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right'
        }

        const labelStyles = {
            padding: 5,
            color: 'white',
            fontWeight: 'bold'
        }

        return (
            <div style={containerStyles}>
                <div style={fillerStyles}>
                    <span style={labelStyles}>{`${completed}%`}</span>
                </div>
            </div>
        );
    };

    useEffect(() => {
        fetchData()
            .then((res) => {
                let array = []
                let array1 = []
                res[0].map((results) =>
                    array.push({'value': results, 'label': results})
                )
                res[1].map((results1) =>
                    array1.push({'value': results1, 'label': results1})
                )
                setMethodsAvaliation(array1)
                setMethodsAulas(array)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    const filterOptions = (candidate, input) => {
        if (input) {
            if (candidate.label.toLowerCase().includes(input.toLowerCase()))
                return true;
            if (
                selectedOptionAulas.some((opt) => {
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
    const createHorario = () => {
        let aulas=[]
        methods.map((results) =>
            aulas.push(results.label)
        )
        let avaliacoes=[]
        methodsAulas.map((results) =>
            aulas.push(results.label)
        )
        console.log(aulas)
        const body=JSON.stringify({"aulas":aulas,"avaliacoes":avaliacoes})
        console.log(body)
        fetch('/null', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            return jsonRes
        }).catch((error) => {
            console.error(error);
        });
        let v = pBar
        setpBar(v + 10)
    }


    return (
        <div>
            <Header></Header>

            <div className="mx-auto w-[1024px] pt-[8rem]">
                <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                    <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                    <p className="ml-[8px] ">Voltar para o Ecrã Principal</p>
                </button>

                <h1 className="text-center font-bold text-[20px] mb-[50px]">Escolha os Metodos que pretende que seja
                    aplicado:</h1>
                <h1 className="mb-3">Métodos para as aulas:</h1>
                <Select
                    value={selectedOptionAulas}
                    onChange={handleChangeAulas}
                    options={methodsAulas}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    isSearchable
                    filterOption={filterOptions}
                />
                <h1 className="mb-3 mt-3">Métodos para as avaliações:</h1>
                <Select
                    value={selectedOptionAvaliacoes}
                    onChange={handleChangeAvaliacoes}
                    options={methods}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    isSearchable
                    filterOption={filterOptions}
                />
                <button onClick={createHorario} className="mt-[130px] flex flex-row  flex justify-center items-center
            bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
            ">Criar um horário com estes métodos
                </button>
                <ProgressBar key={1} bgcolor={"#00b3ff"} completed={pBar}/>
                <CSVLink data={csvData}>Download me</CSVLink>;
            </div>
            <footer
                className="font-medium bg-blue-100 absolute mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho
            </footer>
        </div>)
}

export default ServiçosAcadémicos;
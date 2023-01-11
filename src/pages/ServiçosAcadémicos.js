import React, {useEffect, useRef, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import Header from "../components/Header";
import {CSVLink, CSVDownload} from "react-csv";
import ICalendarLink from "react-icalendar-link";
import SideBar from "../components/SideBar";
import Excelexport from "../components/Excelexport";
import {ReactTabulator} from "react-tabulator";

function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const [classes, setClasses] = useState(null);
    const columns = [
        {title: "Curso", field: "curso", width: 150, headerFilter: "input"},
        {title: "Unidade de execução", field: "unidade_de_execucao", headerFilter: "input"},
        {title: "Turno", field: "turno", headerFilter: "input"},
        {title: "Turma", field: "turma", headerFilter: "input"},
        {title: "Dias da Semana", field: "dias", headerFilter: "input",},

    ];
    const handleRowClick = (e, row) => {

    };

    const addthings = (e, row) => {

    };

    const workloadsTableOptions = {
        pagination: "local",
        paginationSize: 25,
        paginationSizeSelector: [25, 50, 60],
        movableColumns: true,
        //paginationCounter:"rows",
        rowContextMenu: "rowMenu",
        paginationButtonCount: 30,
        groupBy: "unidade_de_execucao",
        selectable: true,

    };
    let workloadsTableRef = useRef();

    const animatedComponents = makeAnimated();
    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const [dataAulas, setDataAulas] = useState([])
    const [dataAvaliacoes, setDataAvaliacoes] = useState([])

    const [methods, setMethodsAvaliation] = useState(null)
    const [methodsAulas, setMethodsAulas] = useState(null)
    const [selectedOptionAulas, setSelectedOptionAulas] = useState([]);
    const [selectedOptionAvaliacoes, setSelectedOptionAvaliacoes] = useState([]);
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
            throw new Error('Data could not be fetched!')
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

    const start_main = async () => {
        const response = await fetch('start_main')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            console.log(response)
        }
    }

    const seeIfcaracterizacaoexists = async () => {
        const response = await fetch('check_se_existe_caracterizacao_das_salas')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            console.log(res)
        }
    }

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
        start_main()
        seeIfcaracterizacaoexists()
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
        let array = []
        let array1 = []
        selectedOptionAulas.map((results) =>
            array.push(results.label)
        )
        selectedOptionAvaliacoes.map((results1) =>
            array1.push(results1.label)
        )
        const body = JSON.stringify({"aulas": array, "avaliacoes": array1,'checkbox':checked})
        console.log(body)
        fetch('/obter_metodos_selecionados', {
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
    const fileData = () => {

        if (selectedAulas) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedAulas.name}</p>

                    <p>File Type: {selectedAulas.type}</p>

                    <p>
                        Last Modified:{" "}
                        {selectedAulas.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    const [selectedAulas, setSelectedAulas] = useState(null)
    const [selectedAvaliacoes, setSelectedAvaliacoes] = useState(null)
    const [selectedCaracterizacao, setSelectedCaracterizacao] = useState(null)
    const onFileChangeAulas = event => {
        console.log(event.target.files[0])
        setSelectedAulas(event.target.files[0]);


    };
    const onFileChangeAvaliacoes = event => {
        setSelectedAvaliacoes(event.target.files[0]);


    };
    const onFileChangeCaracterizacao = event => {
        setSelectedCaracterizacao(event.target.files[0]);


    };

    const carrega = async () => {
        //let body=JSON.stringify({"filename": "ola"})
        fetch('/csv', {
            method: 'POST',
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            setDataAulas(jsonRes)
            if (jsonRes.ok) {
                console.log("FIXE")
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const uploadAulas = async (body) => {
        fetch('/upload', {
            method: 'POST',
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            if (jsonRes.ok) {
                console.log("FIXE")
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const uploadAvaliacoes = async (body) => {
        fetch('/upload_avaliacoes', {
            method: 'POST',
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            if (jsonRes.ok) {
                console.log("FIXE")
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    const uploadCaracterizacao = async (body) => {
        fetch('/upload_caracterizacao_salas', {
            method: 'POST',
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            if (jsonRes.ok) {
                console.log("FIXE")
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // On file upload (click the upload button)
    const onFileUploadAulas = () => {
        const data = new FormData()
        data.append('file', selectedAulas)
        console.log(data)
        uploadAulas(data)
    };

    // On file upload (click the upload button)
    const onFileUploadAvaliacoes = () => {
        const data = new FormData()
        data.append('file', selectedAvaliacoes)
        console.log(data)
        uploadAvaliacoes(data)
    };

    // On file upload (click the upload button)
    const onFileUploadcaracterizacao = () => {
        const data = new FormData()
        data.append('file', selectedCaracterizacao)
        console.log(data)
        uploadCaracterizacao(data)
    };
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked);
    };
    const Checkbox = ({label, value, onChange}) => {
        return (
            <label>
                <input type="checkbox" checked={value} onChange={onChange}/>
                {label}
            </label>
        );
    };


    return (
        <div>
            <Header></Header>
            <div className="pt-[4rem]">
                <SideBar></SideBar>
                <div className="mx-auto px-5">
                    <h1 className="pt-[4rem] text-center font-bold text-[20px] mb-[50px]">Escolha os Métodos que
                        pretende que seja
                        aplicado:</h1>
                    <div className="flex flex-row flex flex-row  flex justify-center items-center">
                        <div>
                            <div className="flex  flex-col">
                                <h1>Aulas</h1>
                                <input type="file" onChange={onFileChangeAulas}/>
                                {selectedAulas !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                  onClick={onFileUploadAulas}>
                                    Upload!
                                </button> : ''}
                            </div>
                        </div>
                        <div className="ml-[40px]">
                            <div className="flex  flex-col">
                                <h1>Avaliacões</h1>
                                <input type="file" onChange={onFileChangeAvaliacoes}/>
                                {selectedAvaliacoes !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                       onClick={onFileUploadAulas}>
                                    Upload!
                                </button> : ''}
                            </div>
                        </div>
                        <div className="ml-[40px]">
                            <div className="flex  flex-col">
                                <h1>Caracterização</h1>
                                <input type="file" onChange={onFileChangeCaracterizacao}/>
                                {selectedCaracterizacao !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                           onClick={onFileUploadAulas}>
                                    Upload!
                                </button> : ''}
                            </div>
                        </div>
                    </div>
                    {selectedAulas !== null && selectedAvaliacoes !== null && selectedCaracterizacao !== null ?
                        <>
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
                        </>
                        : ''}
                    {/*<ProgressBar key={1} bgcolor={"#00b3ff"} completed={pBar}/>*/}
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
                    <Checkbox
                        label="Menor Distância entre Salas"
                        value={checked}
                        onChange={handleChange}
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

                    <button onClick={carrega}>CARREGA ME</button>
                    {dataAulas.length !== 0 && dataAvaliacoes.length !== 0 ?
                        <>
                            <div className="flex justify-center items-center">
                                <div>
                                    <CSVLink data={dataAulas} filename="Aulas">Download Aulas</CSVLink>
                                </div>
                                <div className="ml-[50px]">
                                    <CSVLink data={dataAvaliacoes} filename="Avaliacoes">Download Avaliacoes</CSVLink>
                                </div>

                            </div>
                        </> : ''}
                    <CSVLink data={dataAulas} filename="Aulas">Download Aulas</CSVLink>
                    <Excelexport excelData={dataAulas} filename={"OLA"}></Excelexport>
                    <ReactTabulator
                        data={classes}
                        columns={columns}
                        onRef={(r) => (workloadsTableRef = r)}
                        options={workloadsTableOptions}
                        events={{
                            rowClick: handleRowClick,
                            tableBuilt: addthings

                        }}

                    />

                </div>
            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>)
}

export default ServiçosAcadémicos;
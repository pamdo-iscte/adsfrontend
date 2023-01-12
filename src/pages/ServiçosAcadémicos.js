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
import Spinner from "../components/Spinner";

function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const [classes, setClasses] = useState(null);
    const [exms, setExms] = useState(null);
    const [dirHorarios, setDirHorarios] = useState("")
    const [dirAvaliacao, setDirAvaliacao] = useState("")
    const [dirCaracterizacao, setDirCaracterizacao] = useState("")
    const [allFilesExist, setAllFilesExist] = useState(false)
    const columns = [
        {title: "Nome", field: "nome", width: 150, headerFilter: "input"},
        {title: "Aulas não alocadas", field: "aulas_nao_alocadas", headerFilter: "input"},
        {title: "Aulas sobrelotadas", field: "aulas_sobrelotadas", headerFilter: "input"},
        {title: "Estudantes em sobrelotação", field: "estudantes_em_sobrelotadas", headerFilter: "input"},
        {title: "Sobrelotação média", field: "sobrelotação_media", headerFilter: "input",},
        {title: "Lugares desperdiçados ", field: "lugares_desperdicado", headerFilter: "input",},
        {title: "Aulas mal atribuídas", field: "aulas_mal_atribuidas", headerFilter: "input",},
        {title: "Mudanças de Sala", field: "mudanca_sala", headerFilter: "input",},
        {title: "Mudanças de Edifício", field: "mudanca_edificio", headerFilter: "input",},

    ];
    const exams = [
        {title: "Nome", field: "nome", width: 150, headerFilter: "input"},
        {title: "Exames Sobrelotados", field: "quantidade_lugares_desperdicados_por_avaliacoes", headerFilter: "input"},
        {title: "Lugares desperdiçados ", field: "quantidade_lugares_desperdicados_por_avaliacoes", headerFilter: "input"},

    ];
    const handleRowClickAulas = (e, row) => {
        console.log("AQUI")
        setDataAulas(row.getData().file_aulas)


    };

    const handleRowClickAvaliacao = (e, row) => {
        console.log("AQUI")
        setDataAvaliacoes(row.getData().file_avaliacoes)


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
        selectable: 1,


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
        }
    }

    const seeIfcaracterizacaoexists = async () => {
        const response = await fetch('check_se_existe_caracterizacao_das_salas')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }
    const seeIfhorarioexists = async () => {
        const response = await fetch('check_se_existe_horario')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }
    const seeIfavaliacaooexists = async () => {
        const response = await fetch('check_se_existe_avaliacao')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }

    const checkIfAllFilesExist = async () => {
        const response = await fetch('check_if_all_files_exist')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
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
        seeIfcaracterizacaoexists().then((res) => {
            setDirCaracterizacao(res)
        })
        seeIfavaliacaooexists().then((res) => {
            setDirAvaliacao(res)
        })
        seeIfhorarioexists().then((res) => {
            setDirHorarios(res)
        })
        checkIfAllFilesExist().then((res) => {
            setAllFilesExist(res)
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
        setafterPress(true)
        setClasses(null)
        let array = []
        let array1 = []
        selectedOptionAulas.map((results) =>
            array.push(results.label)
        )
        selectedOptionAvaliacoes.map((results1) =>
            array1.push(results1.label)
        )
        const body = JSON.stringify({"aulas": array, "avaliacoes": array1, 'checkbox': checked, "num": num})
        fetch('/obter_metodos_selecionados', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            setClasses(jsonRes[0])
            setExms(jsonRes[1])
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
    const [afterPress, setafterPress] = useState(false)
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
    const [num, setNum] = useState('')
    const handleChangeNum = event => {
        const result = event.target.value.replace(/\D/g, '');
        setNum(result)
    };


    return (
        <div>
            <Header></Header>
            <div className="pt-[4rem]">
                <SideBar></SideBar>
                <div className="mx-auto px-5">
                    <h1 className="pt-[4rem] text-center font-bold text-[20px] mb-[10px]">Escolha os Métodos que
                        pretende que seja
                        aplicado:</h1>
                    <h1 className="text-center font-normal text-[20px] mb-[20px]">Coloque ficheiros .xlsx</h1>
                    <div className="flex flex-row flex flex-row  flex justify-center items-center">
                        <div>
                            <div className="flex  flex-col">
                                <h1>Aulas</h1>
                                <input type="file" onChange={onFileChangeAulas}/>
                                {selectedAulas !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                  onClick={onFileUploadAulas}>
                                        Upload!
                                    </button>
                                    : ''}
                                {dirHorarios !== "" ? <h1>Já existe o ficheiro: <br/> {dirHorarios}</h1> : ''}
                            </div>
                        </div>
                        <div className="ml-[40px]">
                            <div className="flex  flex-col">
                                <h1>Avaliações</h1>
                                <input type="file" onChange={onFileChangeAvaliacoes}/>
                                {selectedAvaliacoes !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                       onClick={onFileUploadAvaliacoes}>
                                    Upload!
                                </button> : ''}
                                {dirAvaliacao !== "" ? <h1>Já existe o ficheiro:<br/> {dirAvaliacao}</h1> : ''}
                            </div>
                        </div>
                        <div className="ml-[40px]">
                            <div className="flex  flex-col">
                                <h1>Caracterização</h1>
                                <input type="file" onChange={onFileChangeCaracterizacao}/>
                                {selectedCaracterizacao !== null ? <button className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                                           onClick={onFileChangeCaracterizacao}>
                                    Upload!
                                </button> : ''}
                                {dirCaracterizacao !== "" ?
                                    <h1>Já existe o ficheiro: <br/> {dirCaracterizacao} </h1> : ''}
                            </div>
                        </div>
                    </div>
                    {allFilesExist ?
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
                            <h1 className="mt-3 mb-3"></h1>
                            <Checkbox
                                label="Menor Distância entre Salas"
                                value={checked}
                                onChange={handleChange}
                            />
                            <h1 className="mt-3 mb-1">Percentagem de Alunos na Sobrelotação</h1>
                            <input value={num} onChange={handleChangeNum} name="username"
                                   className="bg-blue-100 mt-[8px] rounded-[8px] w-[100px] text-gray-700 py-3 px-4 mb-[30px] leading-tight border-[1px] focus:outline-none focus:shadow-lg focus:shadow-shadowColor focus:border-b-blue-500"
                                   id="grid-first-name" type="text">
                            </input>
                            <h1 className="mb-3 mt-1">Métodos para as avaliações:</h1>
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
                            <h1 className="mt-3"></h1>
                            <button
                                disabled={(selectedOptionAulas.length === 0 || num === '' || selectedOptionAvaliacoes.length === 0) ? true : false}
                                onClick={createHorario} className={"bg-white text-blue-700 " +
                                "font-semibold py-2 px-4 border border-blue-500 rounded mt-[25px]"
                                + (num !== '' ? 'hover:border-transparent hover:text-white hover:bg-blue-500' : '')}>
                                Criar um horário com estes métodos
                            </button>
                        </>
                        : ''}

                    {/*<button onClick={carrega}>CARREGA ME</button>*/}
                    {/*<h1 className="mt-3 mb-3"></h1>*/}
                    {/*<CSVLink className="bg-transparent hover:bg-blue-500 text-blue-700*/}
                    {/*             font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"*/}
                    {/*         data={dataAulas} filename="Aulas">Download Aulas</CSVLink>*/}
                    <h1 className="mt-3 mb-3"></h1>
                    {afterPress === true ?
                        <>
                            {classes === null ? <Spinner></Spinner> :
                                <>
                                    <ReactTabulator
                                        data={classes}
                                        columns={columns}
                                        onRef={(r) => (workloadsTableRef = r)}
                                        options={workloadsTableOptions}
                                        events={{
                                            rowClick: handleRowClickAulas,
                                            tableBuilt: addthings

                                        }}
                                    />
                                    <ReactTabulator
                                        data={exms}
                                        columns={exams}
                                        onRef={(r) => (workloadsTableRef = r)}
                                        options={workloadsTableOptions}
                                        events={{
                                            rowClick: handleRowClickAvaliacao,
                                            tableBuilt: addthings

                                        }}
                                    />


                                    {dataAulas.length !== 0  ?
                                        <>
                                            <h1 className="mt-6"></h1>
                                            <div className="flex justify-center items-center">
                                                <div>
                                                    <CSVLink className="bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                                             data={dataAulas} filename="Aulas">Download Aulas</CSVLink>
                                                </div>

                                            </div>
                                        </> : ''}
                                    { dataAvaliacoes.length !== 0 ?
                                        <>
                                            <h1 className="mt-6"></h1>
                                            <div className="flex justify-center items-center">
                                                <div className="ml-[50px] bg-transparent hover:bg-blue-500 text-blue-700
                                 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                    <CSVLink data={dataAvaliacoes} filename="Avaliacoes">Download
                                                        Avaliacoes</CSVLink>
                                                </div>

                                            </div>
                                        </> : ''}
                                </>

                            }
                        </>
                        : ''}
                </div>
            </div>


        </div>)
}

export default ServiçosAcadémicos;
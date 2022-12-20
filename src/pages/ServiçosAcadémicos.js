import {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import Header from "../components/Header";
import {CSVLink, CSVDownload} from "react-csv";
import ICalendarLink from "react-icalendar-link";
import SideBar from "../components/SideBar";
import axios from 'axios';

function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const event = {
        title: "My Title",
        description: "My Description",
        startTime: "2018-10-07T10:30:00+10:00",
        endTime: "2018-10-07T12:00:00+10:00",
        location: "10 Carlotta St, Artarmon NSW 2064, Australia",
        attendees: [
            "Hello World <hello@world.com>",
            "Hey <hey@test.com>",
        ]
    }
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
        let array = []
        let array1 = []
        selectedOptionAulas.map((results) =>
            array.push(results.label)
        )
        selectedOptionAvaliacoes.map((results1) =>
            array1.push(results1.label)
        )
        const body = JSON.stringify({"aulas": array, "avaliacoes": array1})
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

        if (selected) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selected.name}</p>

                    <p>File Type: {selected.type}</p>

                    <p>
                        Last Modified:{" "}
                        {selected.toDateString()}
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
    const [selected, setSelected] = useState(null)
    const onFileChange = event => {

        // Update the state
        setSelected(event.target.files[0]);
        console.log(selected)

    };
    const ze = async (body) => {
        fetch('/upload', {
            method: 'POST',
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes)
            if(jsonRes.ok){
                console.log("FIXE")
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // On file upload (click the upload button)
    const onFileUpload = () => {
        const data = new FormData()
        data.append('file', selected)
        console.log(data)
        ze(data)

        //const formData = new FormData();

        // Update the formData object


        // Details of the uploaded file
        // console.log(file.selectedFile);

        // Request made to the backend api
        // Send formData object
    };


    return (
        <div>
            <Header></Header>
            <div className="pt-[4rem]">
                <SideBar></SideBar>
                <div className="mx-auto px-5">
                    <h1 className="pt-[4rem] text-center font-bold text-[20px] mb-[50px]">Escolha os Metodos que
                        pretende que seja
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
                    <CSVLink data={csvData} filename="Horario">Download me</CSVLink>;
                    <ICalendarLink event={event}>
                        Add to Calendar
                    </ICalendarLink>;
                    <h3>
                        File Upload using React!
                    </h3>
                    <div>
                        <input type="file" onChange={onFileChange}/>
                        <button onClick={onFileUpload}>
                            Upload!
                        </button>
                    </div>
                </div>
            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>)
}

export default ServiçosAcadémicos;
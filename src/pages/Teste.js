import {useEffect, useRef, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import 'react-tabulator/lib/styles.css'; // required styles
//import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import { ReactTabulator } from 'react-tabulator';

import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import '../../src/App.css';
const styles = {
    wrap: {
        display: "flex"
    },
    left: {
        marginRight: "10px"
    },
    main: {
        flexGrow: "1"
    }
};
//https://code.daypilot.org/75128/how-to-use-css-themes-with-the-react-scheduler-component

class Calendar extends Component {
    getDate = () => {
        let a=this.calendarRef.current.control.startDate.dayOfWeek()
        let b=this.calendarRef.current.control.startDate.getDay()
        console.log(a)
        console.log(b)
    }
    constructor(props) {
        super(props);
        this.calendarRef = React.createRef();
        this.state = {
            viewType: "Week",
            durationBarVisible: true,
            theme:"calendar_weekly",
            locale:"PT-PT",
        };
    }

    get calendar() {
        return this.calendarRef.current.control;
    }

    componentDidMount() {

        const events = [
            {
                id: 1,
                text: "Event 1",
                start: "2023-03-07T10:30:00",
                end: "2023-03-07T13:00:00"
            },
            {
                id: 2,
                text: "Event 2",
                start: "2023-03-08T09:30:00",
                end: "2023-03-08T11:30:00",
                backColor: "#6aa84f"
            },
            {
                id: 3,
                text: "Event 3",
                start: "2022-11-22T08:30:00",
                end: "2022-11-22T13:00:00",
                backColor: "#f1c232"
            },
            {
                id: 4,
                text: "Event 4 Semanas 1,2,3,4,5",
                start: "2022-11-22T11:30:00",
                end: "2022-11-22T13:00:00",
                backColor: "#cc4125"
            },
        ];

        const startDate = DayPilot.Date.today();
        this.calendar.update({startDate, events});
    }

    render() {
        return (

            <div style={styles.wrap}>
                <h1 onClick={this.getDate}>ola</h1>
                <div style={styles.left}>
                    <DayPilotNavigator
                        selectMode={"week"}
                        showMonths={2}
                        skipMonths={2}
                        locale="PT-PT"
                        startDate={DayPilot.Date.today()}
                        selectionDay={DayPilot.Date.today()}
                        onTimeRangeSelected={ args => {
                            this.calendar.update({
                                startDate: args.day
                            });
                        }}
                    />
                </div>
                <div style={styles.main}>
                    <DayPilotCalendar
                        {...this.state}
                        headerDateFormat={"dddd"}
                        timeFormat={"Clock24Hours"}
                        eventMoveHandling ={"Disabled"}
                        eventResizeHandling ={"Disabled"}
                        timeRangeSelectedHandling ={"Disabled"}
                        ref={this.calendarRef}

                    />
                </div>
            </div>
        );
    }
}

function Horario() {
    const [professor, setProfessor] = useState();
    const  [loading,setLoading]=useState(false)

    const fetchData = async () => {
        const response = await fetch('get_aluno_professor')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res=await response.json()
            return res
        }
    }
    useEffect(() => {
        fetchData()
            .then((res) => {
                setProfessor(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    const handleChange = () => {
        console.log(workloadsTableRef.current.getSelectedData())
    };

    const columns = [
        { title: "Curso", field: "curso", width: 150, headerFilter: "input" },
        { title: "Unidade de execução", field: "unidade_de_execucao", headerFilter: "input" },
        { title: "Turno", field: "turno", headerFilter: "input" },
        { title: "Turma", field: "turma",  headerFilter: "input" },
        { title: "Hora Inicial", field: "hora_inicio",  headerFilter: "input" },
        { title: "Hora Final", field: "hora_fim",  headerFilter: "input" },
        { title: "Dia", field: "data",  headerFilter: "input", },
        { title: "Sala", field: "sala",   headerFilter: "input" },
    ];
    var data = [
        {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
        {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
        {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
        {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
        {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    ];

    const workloadsTableOptions = {
        pagination:"local",
        paginationSize:25,
        paginationSizeSelector:[25,50,60],
        movableColumns:true,
        paginationCounter:"rows",
        rowContextMenu:"rowMenu",
        paginationButtonCount:30,
        groupBy:"unidade_de_execucao",
        selectable:true,

    };
    let workloadsTableRef = useRef();

    return (
        <div>
            <header className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <body className="mx-auto w-[1440px] pt-[8rem]">
            <h1 onClick={handleChange}>carrega me</h1>
            <ReactTabulator
                data={professor}
                columns={columns}
                onRef={(r) => (workloadsTableRef = r)}
                options={workloadsTableOptions}

            />
            <Calendar></Calendar>
            </body>
            <footer className="font-medium bg-blue-100  mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho</footer>
        </div>)
}
export default Horario;
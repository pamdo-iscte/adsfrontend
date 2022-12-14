import {useEffect, useRef, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import 'react-tabulator/lib/styles.css'; // required styles
//import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import {ReactTabulator} from 'react-tabulator';

import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import '../../src/App.css';
import Modal from 'react-modal';
//https://code.daypilot.org/75128/how-to-use-css-themes-with-the-react-scheduler-component

import Calendar from './CalendarWithoutNavigator'
import Spinner from "../components/Spinner";

const refCalendar = React.createRef();


function Horario() {
    const [professor, setProfessor] = useState(null);
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const response = await fetch('get_aluno_professor')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }

    const makeSureResetCalendar = async () => {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false);
    }

    function resetCalendar() {
        refCalendar.current.calendarRef.current.control.events.list=[]
        refCalendar.current.calendarRef.current.control.update()
        window.location.reload(false);
        closeModal()
    }



    const [modalIsOpen, setIsOpen] = useState(false);

    const PopUp = () => {
        return (
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    shouldCloseOnOverlayClick={false}
                    ariaHideApp={false}
                    onRequestClose={closeModal}
                    style={{
                        overlay: {
                            background: 'rgba(0, 0, 0, 0.4)',
                        },
                    }}
                    contentLabel="Example Modal"
                    className={"w-[380px] h-[217px] bg-white rounded-[16px] md:mt-[45%] lg:mt-[15%] m-auto shadow-lg shadow-blue-300 drop-shadow-lg drop-shadow-blue-800"}
                >
                    <div className='ml-[36px] mr-[36px] pt-[30px]'>
                        <div className='text-center text-dark font-bold text-[20px] leading-[22px]'>Tem a certeza que
                            quer dar reset ao seu calendário?
                        </div>
                        <div className="mt-16 flex flex-row flex justify-center items-center">
                            <button onClick={resetCalendar} className="hover:bg-blue-400 bg-amber-400 w-[60px] rounded-full text-[18px] font-medium">SIM</button>
                            <button onClick={closeModal} className="hover:bg-blue-400 ml-6 bg-amber-400 w-[60px] rounded-full text-[18px] font-medium">NÃO</button>
                        </div>
                    </div>
                </Modal>
            </div>)
    }


    const fetchDataAboutClass = async (body) => {
        fetch('/obter_aulas_da_UC_escolhida', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                //console.log(response.status)
                throw new Error(response.statusText);
            }
            const jsonRes = await response.json()
            console.log(jsonRes[0])
            return jsonRes[0]
        }).catch((error) => {
            console.error(error);
        });

    };


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
        console.log(refCalendar.current.calendarRef.current.control.events)
        //refCalendar.current.calendarRef.current.control.events.add({
        //      id: 1,
        //    text: "Event 1",
        //  start: "2022-12-03T10:30:00",
        // end: "2022-12-03T13:00:00"
        //})
        // refCalendar.current.control.add({
        //      id: 1,
        //      text: "Event 1",
        //      start: "2022-12-03T10:30:00",
        //      end: "2022-12-03T13:00:00"
        //  })
        // console.log(workloadsTableRef.current.getSelectedData())
    };

    const columns = [
        {title: "Curso", field: "curso", width: 150, headerFilter: "input"},
        {title: "Unidade de execução", field: "unidade_de_execucao", headerFilter: "input"},
        {title: "Turno", field: "turno", headerFilter: "input"},
        {title: "Turma", field: "turma", headerFilter: "input"},
        {title: "Dias da Semana", field: "dias", headerFilter: "input",},

    ];

    const handleRowClick = (e, row) => {
        try {
                        //console.log(refCalendar.current.calendarRef.current.control.startDate.dayOfWeek())
            let data = row.getData()
            let day = refCalendar.current.calendarRef.current.control.startDate.getDay()
            let month = refCalendar.current.calendarRef.current.control.startDate.getMonth() + 1
            let year = refCalendar.current.calendarRef.current.control.startDate.getYear()
            let today = year + "/" + month + "/" + day
            console.log(today)

            let dayOfWeek = refCalendar.current.calendarRef.current.control.startDate.dayOfWeek()
            //console.log(dayOfWeek)
            let body = JSON.stringify({
                'horas': row.getData().horas,
                'dias': row.getData().dias,
                'datas': row.getData().datas,
                'horas_repetidas': row.getData().horas_repetidas,
                'turno': row.getData().turno,
                'unidade_de_execucao': row.getData().unidade_de_execucao,
                'data_de_hoje': today,
                'dia_da_sem_de_hoje': dayOfWeek
            })
            // console.log(body)
            fetch('/obter_aulas_da_UC_escolhida', {
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=UTF-8',},
                body: body
            }).then(async response => {
                if (response.status !== 200) {
                    //console.log(response.status)
                    throw new Error(response.statusText);
                }
                const jsonRes = await response.json()
                let e = refCalendar.current.calendarRef.current.control.events.find(jsonRes[0].id);
                if (e === null) {
                    jsonRes.map((results) =>
                        refCalendar.current.calendarRef.current.control.events.add(results)

                    )
                } else {
                    refCalendar.current.calendarRef.current.control.events.remove(e);
                }

            }).catch((error) => {
                console.error(error);
            });

        } catch (e) {

        }
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
    const returnHome = () => {
        navigate('/')
    }
    const navigate = useNavigate()

    return (
        <div>
            <header
                className="absolute font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <div className="mx-auto py-[8rem] px-2">
                <PopUp></PopUp>
                <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                    <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                    <p className="ml-[8px] ">Voltar para o Ecrã Principal</p>
                </button>
                <button onClick={makeSureResetCalendar}
                        className="absolute top-[100px] hover:bg-red-700 right-0 bg-amber-500 w-[150px] rounded-full">Reset
                    Horário
                </button>
                <div className="flex flex-row">
                    <div className="w-3/5">
                        {professor === null ? <Spinner></Spinner> : <ReactTabulator
                            data={professor}
                            columns={columns}
                            onRef={(r) => (workloadsTableRef = r)}
                            options={workloadsTableOptions}
                            events={{
                                rowClick: handleRowClick,
                            }}
                        />}

                    </div>
                    <div className="w-2/5">
                        <Calendar ref={refCalendar}></Calendar>
                    </div>

                </div>

            </div>
            <footer
                className="font-medium bg-blue-100  mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho
            </footer>
        </div>)
}

export default Horario;
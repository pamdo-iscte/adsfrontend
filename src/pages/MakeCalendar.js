import {useEffect, useRef, useState} from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import 'react-tabulator/lib/styles.css'; // required styles
//import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import {ReactTabulator} from 'react-tabulator';

import React, {Component} from 'react';
//import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import '../../src/App.css';
import Modal from 'react-modal';
//https://code.daypilot.org/75128/how-to-use-css-themes-with-the-react-scheduler-component

import Calendar from './CalendarWithoutNavigator'
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const refCalendar = React.createRef();


function Horario() {
    const [classes, setClasses] = useState(null);
    const [selectedclasses, setselectedclasses] = useState(null);
    const location = useLocation()
    const fetchData = async () => {
        const response = await fetch('get_aluno_professor')
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }

    const getClassesChosenPreviously = async () => {
        const body = JSON.stringify({"num": location.state.num})
        const response = await fetch('/reformular_horario', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        })
        if (!response.ok) {
            throw new Error('Data coud not be fetched!')
        } else {
            let res = await response.json()
            return res
        }
    }

    const makeSureResetCalendar = async () => {
        //   workloadsTableRef.current.selectRow(workloadsTableRef.current.getRows().filter(row => row.getData().turno === "L5205PL05"))
        setIsOpen(true)
        //console.log(workloadsTableRef.current.getSelectedData())
    }


    function closeModal() {
        setIsOpen(false);
    }

    function saveHorario() {
        const body = JSON.stringify({
            "slots": refCalendar.current.calendarRef.current.control.events.list,
            "aulas": workloadsTableRef.current.getSelectedData(), "num": location.state.num
        })
        console.log(body)
        fetch('/guardar_horario', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                //console.log(response.status)
                throw new Error(response.statusText);
            }
            navigate("/mycalendar", {
                state: {
                    num: location.state.num,
                }
            })

        }).catch((error) => {
            console.error(error);
        });
    }

    function resetCalendar() {
        const body = JSON.stringify({"num": location.state.num})
        fetch('/deleteschedule', {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=UTF-8',},
            body: body
        }).then(async response => {
            if (response.status !== 200) {
                //console.log(response.status)
                throw new Error(response.statusText);
            }
        }).catch((error) => {
            console.error(error);
        });
        refCalendar.current.calendarRef.current.control.events.list = []
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
                            <button onClick={resetCalendar}
                                    className="hover:bg-blue-400 bg-amber-400 w-[60px] rounded-full text-[18px] font-medium">SIM
                            </button>
                            <button onClick={closeModal}
                                    className="hover:bg-blue-400 ml-6 bg-amber-400 w-[60px] rounded-full text-[18px] font-medium">NÃO
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>)
    }


    useEffect(() => {
        fetchData()
            .then((res) => {
                setClasses(res)
            })
            .catch((e) => {
                console.log(e.message)
            })
        getClassesChosenPreviously()
            .then((res) => {
                refCalendar.current.calendarRef.current.control.events.list = []
                refCalendar.current.calendarRef.current.control.update()
                if(res.length!==0){
                    res[0].map((results) =>
                        refCalendar.current.calendarRef.current.control.events.add(results)
                    )
                    setselectedclasses(res[1])
                }
            }).catch((e) => {
            console.log(e.message)
        })
    }, [])


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
         //   console.log(workloadsTableRef.current.getSelectedData())
            let data = row.getData()
            //console.log(dayOfWeek)
            let body = JSON.stringify({
                'curso': row.getData().curso,
                'horas': row.getData().horas,
                'dias': row.getData().dias,
                'datas': row.getData().datas,
                'horas_repetidas': row.getData().horas_repetidas,
                'turno': row.getData().turno,
                'unidade_de_execucao': row.getData().unidade_de_execucao,
                'selecionados':workloadsTableRef.current.getSelectedData(),
            })
            console.log(body)
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
                console.log(jsonRes[0])
                let e = refCalendar.current.calendarRef.current.control.events.find(jsonRes[0].id);
                if (e === null) {
                    jsonRes.map((results) =>
                        refCalendar.current.calendarRef.current.control.events.add(results)
                    )
                } else {
                    jsonRes.map((results) =>
                        refCalendar.current.calendarRef.current.control.events.remove(results.id)
                    )

                }

            }).catch((error) => {
                console.error(error);
            });

        } catch (e) {

        }
    };

    const addthings = (e, row) => {
        if (selectedclasses !== null) {
            console.log(selectedclasses)
            selectedclasses.map((results) =>
                workloadsTableRef.current.selectRow(workloadsTableRef.current.getRows().filter(row => row.getData().turno === results))
            )
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

    const navigate = useNavigate()

    return (
        <div>
            <Header></Header>

            <div className="mx-auto py-[4rem] px-2">
                <SideBar></SideBar>
                <PopUp></PopUp>
                <button onClick={makeSureResetCalendar}
                        className="absolute top-[120px] hover:bg-red-700 right-[8px] bg-amber-500 w-[150px] rounded-full">Reset
                    Horário
                </button>
                <button onClick={saveHorario}
                        className="absolute top-[120px] hover:bg-red-700 right-[170px] bg-amber-500 w-[150px] rounded-full">Guardar
                </button>
                <div className="flex flex-row py-16">
                    <div className="w-3/5 pt-6">
                        {classes === null ? <Spinner></Spinner> : <ReactTabulator
                            data={classes}
                            columns={columns}
                            onRef={(r) => (workloadsTableRef = r)}
                            options={workloadsTableOptions}
                            events={{
                                rowClick: handleRowClick,
                                tableBuilt: addthings

                            }}

                        />}

                    </div>
                    <div className="w-2/5 pt-6">
                        <Calendar ref={refCalendar}></Calendar>
                    </div>

                </div>

            </div>
            <footer
                className="flex flex-row   flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>)
}

export default Horario;
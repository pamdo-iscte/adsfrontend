import React, {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate,useLocation} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import CalendarWithNavigator from "./CalendarWithNavigator";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const location=useLocation()
    const animatedComponents = makeAnimated();

    const refCalendar = React.createRef();
    const returnHome = () => {
        navigate('/')
    }

    const changeCalendar = () => {
        navigate('/makecalendar', {
            state: {
                num: location.state.num,
            }

        })
    }
    const fetchData = async (body) => {
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
    }
    useEffect(() => {
        console.log(location.state.num)
        const body = JSON.stringify({"numero": location.state.num});
        fetchData(body)
            .then((res) => {
                res.map((results) =>
                    refCalendar.current.calendarRef.current.control.events.add(results)
                )
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    return (
        <div>
            <Header></Header>

            <div className="mx-auto pt-[4rem] px-2">
                <SideBar></SideBar>
                <div className="pb-[1rem] pt-[4rem] flex flex-row ...">

                    <div>
                        <button className="ml-[230px] flex flex-row  flex justify-center items-center hover:bg-red-700 right-[8px] bg-amber-500 w-[200px] rounded-full" onClick={changeCalendar}>
                            <p className="">Reformular o Calendário</p>
                        </button>
                    </div>

                </div>

                <CalendarWithNavigator ref={refCalendar}></CalendarWithNavigator>

            </div>
            <footer
                className="flex flex-row absolute  flex justify-center items-center font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
            </footer>
        </div>)
}

export default ServiçosAcadémicos;
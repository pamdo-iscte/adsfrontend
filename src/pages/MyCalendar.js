import React, {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {useNavigate} from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import CalendarWithNavigator from "./CalendarWithNavigator";

function ServiçosAcadémicos() {
    const navigate = useNavigate()
    const animatedComponents = makeAnimated();

    const refCalendar = React.createRef();
    const returnHome = () => {
        navigate('/')
    }

    const changeCalendar = () => {
        navigate('/teste')
    }

    return (
        <div>
            <header
                className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <div className="mx-auto py-[8rem] px-2">
                <div className="flex flex-row ...">
                    <div>
                        <button className="lex flex-row  flex justify-center items-center" onClick={returnHome}>
                            <img className="h-[20px]" src={leftArrow} alt={"Left Arrow"}/>
                            <p className="ml-[8px] ">Voltar para o Ecrâ Principal</p>
                        </button>
                    </div>
                    <div>
                        <button className="lex flex-row  flex justify-center items-center" onClick={changeCalendar}>
                            <p className="ml-[8px] ">Reformular o Calendário</p>
                        </button>
                    </div>

                </div>

                <CalendarWithNavigator ref={refCalendar}></CalendarWithNavigator>

            </div>
            <footer
                className="font-medium bg-blue-100 mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho
            </footer>
        </div>)
}

export default ServiçosAcadémicos;
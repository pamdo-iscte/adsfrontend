import {useEffect, useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import leftArrow from '../assets/leftarrow.svg';
import 'react-tabulator/lib/styles.css'; // required styles
//import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import { ReactTabulator } from 'react-tabulator';
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
                setProfessor(res.slice(0,100))
                console.log(res[0])
                handleChange()
            })
            .catch((e) => {
                console.log(e.message)
            })
    }, [])

    const handleChange = () => {
        for(var i=0; i<100;i++){
            if(professor[i].curso==="ME"){
                console.log("AQUI")
            }
        }
    };

    const columns = [
        { title: "Curso", field: "curso", width: 150, headerFilter: "input" },
        { title: "Unidade de execução", field: "unidade_de_execucao", headerFilter: "input" },
        { title: "Turno", field: "turno", headerFilter: "input" },
        { title: "Turma", field: "turma",  headerFilter: "input" },
        { title: "Hora Inicial", field: "hora_inicio",   headerFilter: "input" },
        { title: "Hora Final", field: "hora_fim",  headerFilter: "input" },
        { title: "Dia", field: "data",  headerFilter: "input" , },
        { title: "Sala", field: "sala",   headerFilter: "input" },
    ];
    var data = [
        {id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
        {id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
        {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
        {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
        {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
    ];

    return (
        <div>
            <header className="font-medium p-6 flex flex-row items-center fixed top-0 border-b border-blue-600 h-[5.375rem] w-full bg-blue-100">
                Novo Fenix
            </header>

            <body className="mx-auto w-[1024px] pt-[8rem]">
            <ReactTabulator
                data={professor}
                columns={columns}

            />
            </body>
            <footer className="font-medium bg-blue-100  mx-auto border-t border-blue-600 p-6 flex flex-row items-center bottom-0 right-0 left-0">
                Trabalho realizado no ambito da Disciplina de ADS no Mestrado de Engenharia Informática
                por Pedro d'Oliveira, Diogo Cosme, Inês Carmo e Guilherme Carvalho</footer>
        </div>)
}
export default Horario;
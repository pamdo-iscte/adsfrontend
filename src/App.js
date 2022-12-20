import React from 'react';
// 👇️ import Routes instead of Switch 👇️
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeScreen from './pages/Home'
import ServicosAcademicos from './pages/ServiçosAcadémicos'
import Horario from './pages/Horario'
import MakeCalendar from './pages/MakeCalendar'
import Raios from './pages/Raios'
import StudentTeacherwithAccount from "./pages/StudentTeacherwithAccount";
import StudentTeacherwithoutAccount from "./pages/StudentTeacherwithoutAccount";
import MyCalendar from "./pages/MyCalendar";
import About from "./pages/About";
export default function App() {
    return (
        <Router>
            {/* 👇️ Wrap your Route components in a Routes component */}
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/academicservices" element={<ServicosAcademicos/>}/>
                <Route path="/schedule" element={<Horario/>}/>
                <Route path="/makecalendar" element={<MakeCalendar/>}/>
                <Route path="/raios" element={<Raios/>}/>
                <Route path="/login" element={<StudentTeacherwithAccount/>}/>
                <Route path="/login1" element={<StudentTeacherwithoutAccount/>}/>
                <Route path="/mycalendar" element={<MyCalendar/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/*" element={<div>NOT FOUND</div>}/>

            </Routes>
        </Router>
    );
}

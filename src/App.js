import React from 'react';
// 👇️ import Routes instead of Switch 👇️
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomeScreen from './pages/Home'
import ServicosAcademicos from './pages/ServiçosAcadémicos'
export default function App() {
  return (
      <Router>
        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
            <Route path="/academicservices" element={<ServicosAcademicos />} />

        </Routes>
      </Router>
  );
}

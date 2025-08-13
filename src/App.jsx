import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import DoctorPage from './pages/Doctor';
import Appointments from './pages/Appointments';
import About from './pages/About';

export default function App(){
    return (
        <div className="min-h-screen" dir="rtl">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctor/:id" element={<DoctorPage />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
}

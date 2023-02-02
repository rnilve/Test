import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from '../components/auth/Login';
import  Home from '../components/pages/Home';

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;

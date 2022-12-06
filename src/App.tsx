import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import Prueba from './pages/Prueba';
import Reclamo from './pages/Reclamo';
import Confirmacion from './pages/Confirmacion';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
   
    <BrowserRouter>
    
    {/* <Navbar/> */}
    <Routes>
    <Route path='/react/Reclamo' element={<Reclamo/>}/>
    <Route path='/Prueba' element={<Prueba/>}/>
    <Route path='/react/Confirmacion' element={<Confirmacion/>} />
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App

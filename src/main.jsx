import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import App from './App'
// import Registro from './paginas/Registro'
import ViajeMov from './paginas/ViajeMov'
import ViajeReg from './paginas/ViajeReg'
import RegistroChofer from './paginas/RegistroChofer'
import PerfilChofer from './paginas/PerfilChofer'
import RegistroMovil from './paginas/RegistroMovil'
import CargarHora from './paginas/CargarHora'
import Historial from './paginas/Historial'
import EncuestaEstrellas from './paginas/EncuestaEstrellas'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}>
                <Route  index element={<PerfilChofer />} />
                <Route  path='viajeMov' element={<ViajeMov/>} />
                <Route  path='viajeReg' element={<ViajeReg/>} />
                <Route  path='perfil' element={<PerfilChofer/>} />
                <Route  path='encuesta' element={<EncuestaEstrellas/>} />
                <Route  path='regChofer' element={<RegistroChofer/>} />
                <Route  path='regMovil' element={<RegistroMovil/>} />
                <Route  path='cargarHora' element={<CargarHora/>} />
            </Route>
        </Routes>
    </BrowserRouter>,
)

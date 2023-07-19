import { useState } from 'react'
import reactLogo from './assets/react.svg'
import 'bootstrap/dist/css/bootstrap.css';
import viteLogo from '/vite.svg'
import './App.css'
import ViajeReg from './paginas/ViajeReg.jsx'
import MultipleRegistro from './paginas/MultipleRegistro.jsx'
import CargarHora from './paginas/CargarHora.jsx'
import MenuInferior from './components/menuInf'
import CabeceraLogo from './components/cabeceraLogo'
import {Container,Navbar} from 'react-bootstrap';
import { Outlet } from "react-router-dom";

function App() {


    return (
        <>
            <Navbar fixed="top" style={{position:'fixed',top:"0px",width:"100%",padding:"0px"}}>
                <CabeceraLogo></CabeceraLogo>
                {/*<MenuInferiorMultiple></MenuInferiorMultiple>*/}
            </Navbar>
            <br/>
            <Outlet></Outlet>
            <Navbar fixed="bottom" style={{position:'fixed',bottom:"0px",width:"100%",padding:"0px"}}>
                <MenuInferior></MenuInferior>
            </Navbar>
        </>

    )
    /*
    <div className="App">
        <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
            <p>
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
        </div>
        <p className="read-the-docs">
            Click on the Vite and React logos to learn more
        </p>
    </div>
     */
}

export default App

import React, { useState, useEffect } from 'react';
import {Container,Row,Col,Button,ToggleButton,Form,Pagination} from 'react-bootstrap';
import Peticiones from '../helpers/peticiones.js'


const OpcionesEncuesta = ({ numero, onBotonSeleccionado , opSel }) => {
    const [botones, setBotones] = useState([]);
    const [opSeleccionado, setOpSeleccionado] = useState("0")
    const {obtenerDatos} = Peticiones();
    const [titulo,setTitulo] = useState("");

    useEffect(() => {
        // Función para obtener datos desde el servidor
        const obtenerDatosDesdeServidor = async () => {
            try {
                console.log(opSel)
                seleccionar(opSel)
                // Realizar la solicitud al servidor con el número
                // const respuesta = await fetch(`http://localhost/rastreo/opciones_encuesta/Parametros/consultaValores.php?tipo=app`);
                const datos = await obtenerDatos("/opciones_encuesta/Parametros/consultaValores.php?tipo=app")
                if(numero !=0){
                    setTitulo(numero < 4 ? "Lo sentimos, cuéntanos que salió mal." : "¡Perfecto!, cuéntanos qué te gusto")
                }
                const tipo = (numero <4 ? "MALO":"BUENO")
                let dataCond = datos.datos.filter((elemento)=>elemento.tipo == tipo)
                // Actualizar el estado con los botones obtenidos del servidor
                dataCond = dataCond.sort((a,b)=> a.id-b.id )
                if(numero!=0){
                    setBotones(dataCond);
                }
            } catch (error) {
                console.error('Error al obtener datos desde el servidor:', error);
            }
        };

        // Llamar a la función cuando el número cambie
        obtenerDatosDesdeServidor();
    }, [numero]);

    const seleccionar = (num)=>{
        setOpSeleccionado(num)
        onBotonSeleccionado(num)
    }
    return (
        <Container style={{gridGap:"1em",display:"grid"}}>
            <Row>
                <Col>{titulo}</Col>
            </Row>
        {botones.map((boton, index) => (
            <Row key={"R-"+index}>
                <Col xs={1}></Col>
                <Col >
                    <ToggleButton key={index} type="checkbox" variant="outline-primary" onClick={() => seleccionar(boton.id)} checked={boton.id == opSeleccionado} style={{width:"100%"}} >
                        {boton.descripcion}
                    </ToggleButton>
                </Col>
                <Col xs={1}></Col>
            </Row>
        ))}
        </Container>
    );
};

export default OpcionesEncuesta;

import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LogoPararViaje from '../assets/senal-de-stop.png'
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const RegistroMovil = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const [datoForm,setDatoForm] = useState({"chapa":"","marca":"","modelo":"","capacidad":""});
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial,guardarNuevoJson} = Peticiones();
    useEffect(() => {

    }, []);

    const handleCampos = (event)=>{
        setDatoForm({
            ...datoForm,
            [event.target.name]: event.target.value,
        });
        // console.log(datoForm);
    }

    const guardarInfo = async (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        console.log(cedula)
    }

    const logoEstado= ()=>{
        return (estadoViaje)?<img src={LogoIniciarViaje} className="logoViaje" /> : <img src={LogoPararViaje} className="logoViaje" /> ;
    }

    const enviarDatos = async () => {
        console.log(datoForm)
        let respuesta = await guardarNuevoJson('/mov/Parametros/ABMForm.php',datoForm);
        if(respuesta.cod == "00"){
            setMsg("Registrado correctamente")
        }else{
            setMsg("Error a la hora de registrar movil")
        }
        // REGISTRAR EN LA BD LOCAL EL USUARIO

    }

    return (
        <>
            <Form>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Chapa" className="mb-3">
                                <Form.Control type="text" name="chapa" placeholder="Chapa" onChange={handleCampos} value={datoForm.chapa}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Marca" className="mb-3">
                                <Form.Control type="text" name="marca" placeholder="Marca" onChange={handleCampos} value={datoForm.marca}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Modelo" className="mb-3">
                                <Form.Control type="text" name="modelo" placeholder="Modelo" onChange={handleCampos} value={datoForm.modelo}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Capacidad" className="mb-3">
                                <Form.Control type="text" name="capacidad" placeholder="Capacidad" onChange={handleCampos} value={datoForm.capacidad}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <Button variant="success" style={{width:"100%"}} onClick={enviarDatos}>
                                Registrar
                            </Button>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h3>{msg}</h3>
                        </Col>
                    </Row>
                </Container>
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%",justifyContent:"center"}}>

                </Navbar>
            </Form>

        </>
    )
}

export default RegistroMovil

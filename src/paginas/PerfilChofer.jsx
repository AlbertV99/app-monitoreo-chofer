import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LogoPararViaje from '../assets/senal-de-stop.png'
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const PerfilChofer = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const [datoForm,setDatoForm] = useState({"cedula":"","nombre":"","apellido":""});
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial} = Peticiones();
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


    const enviarDatos = () => {
        console.log(datoForm)

        // Envía la foto y los datos al servidor utilizando fetch
        // guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+"E",data);

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
                            <FloatingLabel controlId="floatingInput" label="Cédula de Identidad" className="mb-3">
                                <Form.Control type="text" name="cedula" placeholder="Ingrese cédula" onChange={handleCampos} value={datoForm.cedula} disabled/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Nombre" className="mb-3">
                                <Form.Control type="text" name="nombre" placeholder="Nombre" onChange={handleCampos} value={datoForm.nombre} disabled/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Apellido" className="mb-3">
                                <Form.Control type="text" name="apellido" placeholder="Apellido" onChange={handleCampos} value={datoForm.apellido} disabled/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <NavLink to={`/regChofer`}>
                                <Button variant="success" style={{width:"100%"}}>
                                    Registrarse
                                </Button>
                            </NavLink>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <NavLink to={`/regMovil`}>
                                <Button variant="success" style={{width:"100%"}}>
                                    Registrar Movil
                                </Button>
                            </NavLink>
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

export default PerfilChofer

import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LocalBD from '../helpers/localBd.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LogoPararViaje from '../assets/senal-de-stop.png'
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const RegistroChofer = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const [datoForm,setDatoForm] = useState({"nro_cedula":"","nombre":"","apellido":""});
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    const {registrarChofer} = LocalBD();
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

    const logoEstado= ()=>{
        return (estadoViaje)?<img src={LogoIniciarViaje} className="logoViaje" /> : <img src={LogoPararViaje} className="logoViaje" /> ;
    }


    const enviarDatos = async () => {
        // datoForm.nro_cedula="5031168"
        // datoForm.nombre="Alberto"
        // datoForm.apellido="Valdez";
        datoForm.obs="";
        console.log(datoForm)
        let respuesta =await guardarNuevoJson('/chofer/Parametros/ABMForm.php',datoForm);
        // let respuesta = {cod:"00",msg:"correcto",id:"1"}
        console.log(respuesta,respuesta.cod,"Test")
        // console.log("Pre Registro")
        if(respuesta['cod'] == "00" || respuesta['cod'] =="10" ){
            datoForm.id = respuesta.id
            // console.log(datoForm,"primer If")
            let temp = registrarChofer(datoForm);
            // console.log("despues de registro local")

            if (temp !="00"){
                setMsg(`Error a la hora de registrar chofer (${respuesta['cod']})`)

            }else{
                setMsg("Registrado correctamente")

            }
        }else{
            console.log("error codigo")
            setMsg("Error a la hora de registrar chofer")
        }
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
                                <Form.Control type="text" name="nro_cedula" placeholder="Ingrese cédula" onChange={handleCampos} value={datoForm.nro_cedula}/>
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
                                <Form.Control type="text" name="nombre" placeholder="Nombre" onChange={handleCampos} value={datoForm.nombre}/>
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
                                <Form.Control type="text" name="apellido" placeholder="Apellido" onChange={handleCampos} value={datoForm.apellido}/>
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
                                Registrarse
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

export default RegistroChofer

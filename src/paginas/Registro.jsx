import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LogoPararViaje from '../assets/senal-de-stop.png'
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const RegistroApp = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();
    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial} = Peticiones();
    useEffect(() => {
      const items = JSON.parse(localStorage.getItem('persona'));
      if (items) {
       setDatos(items);
      }
    }, []);
    const guardarInfo = async (evento)=>{
        evento.preventDefault();
        const cedula = evento.target.cedula.value;
        console.log(cedula)
        try {
            if(cedula =="123456"){
                localStorage.setItem('persona',JSON.stringify({'cedula':cedula,"nombre":"Invitado","apellido":"Prueba","dsc_cargo":"QA"}));
                setMsg("Registrado correctamente")
            }else{
                let temp = await obtenerPersona(cedula);
                if(temp.length > 0){
                    console.log(temp)
                    temp = temp [0];
                    setMsg("Registrado correctamente")
                    localStorage.setItem('persona',JSON.stringify({'cedula':cedula,"nombre":temp.nombres,"apellido":temp.apellidos,"dsc_cargo":temp.dsc_cargo}));
                }else{
                    localStorage.setItem('persona',JSON.stringify({}));
                    setMsg("Usuario no existe en el registro");
                }

            }

        } catch (e) {
            console.error(e);
            setMsg("Ha ocurrido un error, comuniquese con el administrador")
        } finally {

        }

    }

    const logoEstado= ()=>{
        return (estadoViaje)?<img src={LogoIniciarViaje} className="logoViaje" /> : <img src={LogoPararViaje} className="logoViaje" /> ;
    }
    return (
        <>
            <Form onSubmit={guardarInfo}>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Cédula de Identidad" className="mb-3">
                                <Form.Control type="email" placeholder="Ingrese cédula" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Chapa de Vehículo" className="mb-3">
                                <Form.Control type="email" placeholder="Ingrese chapa" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className={`botonViaje ${estadoViaje?'Iniciar':'Parar'}`} onClick={()=>setEstadoViaje(!estadoViaje)}> {logoEstado()}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{(estadoViaje)?'Iniciar':'Parar'} Viaje</h3>
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

export default RegistroApp

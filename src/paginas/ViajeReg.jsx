import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LogoPararViaje from '../assets/senal-de-stop.png'
import {useNavigate,NavLink} from "react-router-dom"
import Select from 'react-select';
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const ViajeReg = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const [datoForm,setDatoForm] = useState({"cedula":"","chapa":""});
    const [movilSelec,setMovilSelec] = useState("");
    const [listaMovil,setListaMovil] = useState([{ 'label': "ALB 753 - SCANIA", 'value': '1' }]);
    const [clienteSelec,setClienteSelec] = useState("");
    const [listaCliente,setListaCliente] = useState([{ 'label': "A S D SRL", 'value': '1' }]);
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

    const pulsarEnvios = ()=>{
        /*if(!pulsar){//comenzar pulsaciones
            // setIntervalo(setInterval(pulsaciones,60000)) // milisegundos
        }else{//parar pulsaciones
            clearInterval(intervalo);
            setIntervalo(null)
        }
        setPulso(!pulsar);
        */
       console.log(datoForm);
       setEstadoViaje(!estadoViaje)

    }

    const pulsaciones = ()=>{
        geolocalizar();
        enviarDatos();

    }

    const geolocalizar = async ()=>{
          navigator.geolocation.getCurrentPosition(
              (a) => {
                  console.log(a);

                  setUbicacion({"latitud":a.coords.latitude,"longitud":a.coords.longitude});
                  setEstadoUbicacion(true);
              },
              (error)=>{
                console.log("No activo la geolocalizacion",error);
                setEstadoUbicacion(false);

              }
          )
    }

    const enviarDatos = (foto="") => {
        const data = {
            personal_id: persona.id,
            documento: persona.cedula,
            tipo_marcacion :  "E",
            latitud:ubicacion.latitud,
            longitud:ubicacion.longitud,
            photo: foto,
        };
        console.log(data)
        // Envía la foto y los datos al servidor utilizando fetch
        // guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+"E",data);

    }

    return (
        <>
            <Form>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                    <Row></Row>
                    <Row></Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <h5>Alberto Valdez </h5>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <Form.Group className='mb-2'>
                                <Form.Label>Movil<b className="fw-bold text-danger">*</b></Form.Label>
                                <Select
                                    name="movil"
                                    id="movil"
                                    onChange={setMovilSelec}
                                    options={listaMovil}
                                    isClearable={true}
                                    placeholder="Buscar Movil"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <Form.Group className='mb-2'>
                                <Form.Label>Cliente<b className="fw-bold text-danger">*</b></Form.Label>
                                <Select
                                    name="cliente"
                                    id="cliente"
                                    onChange={setClienteSelec}
                                    options={listaCliente}
                                    isClearable={true}
                                    placeholder="Buscar Cliente"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Destino" className="mb-3">
                                <Form.Control type="text" name="cedula" placeholder="Ingrese destino" onChange={handleCampos} value={datoForm.destino}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="D.T." className="mb-3">
                                <Form.Control type="text" name="cedula" placeholder="Ingrese D.T." onChange={handleCampos} value={datoForm.dt}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <NavLink to={`/viajeMov`}>
                                <Button variant="success" style={{width:"100%"}}>
                                    Guardar e Iniciar
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

export default ViajeReg

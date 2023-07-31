import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LocalBD from '../helpers/localBd.js'
import LogoPararViaje from '../assets/senal-de-stop.png'
import {useNavigate,NavLink} from "react-router-dom"
import Select from 'react-select';
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const ViajeReg = (props) => {
    const navg = useNavigate()
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const {obtenerChofer,registrarViaje} = LocalBD();
    const [datoChofer,setDatoChofer] = useState({"nro_cedula":"","nombre":"","apellido":"","id":"0"})
    const [movilSelec,setMovilSelec] = useState("");
    const [listaMovil,setListaMovil] = useState([{ 'label': "ALB 753 - SCANIA", 'value': '1' }]);
    const [clienteSelec,setClienteSelec] = useState("");
    const [listaCliente,setListaCliente] = useState([{ 'label': "A S D SRL", 'value': '1' }]);
    const [destinoSelec,setDestinoSelec] = useState("");
    const [listaDestino,setListaDestino] = useState([{ 'label': "Jouser", 'value': 'Jouser' },{ 'label': "Planta", 'value': 'Planta' },{ 'label': "Central", 'value': 'Central' }]);
    const [estadoEnvio,setEstadoEnvio] = useState(true)
    const [datoForm,setDatoForm] = useState({"id_chofer":1,"id_movil":"","id_cliente":"","destino":"","dt":"","fecha_fin":"","hora_fin":""});
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial,guardarNuevoJson} = Peticiones();
    useEffect(() => {
        verificarChofer();
        cargarLista();
    }, []);

    const verificarChofer = ()=>{
        let chofer = obtenerChofer()
        console.log(chofer)
        if(chofer=="99"){
            //cambiar a registro
        }else{
            let temp = JSON.parse(chofer)
            setDatoChofer(temp);
            datoForm.id_chofer = temp.id
        }
    }

    const cargarLista = async ()=>{
        let temp = await endpointLibre("/mov/Parametros/consultaValores.php?tipo=lista")
        console.log(temp.datos)
        let arrTemp = temp.datos.map((elemento)=>{ return {'value':elemento.id,'label':elemento.opcion} })
        setListaMovil(arrTemp)
        arrTemp=[]
        temp = await endpointLibre("/cliente/Parametros/consultaValores.php?tipo=lista")
        console.log(temp)
        arrTemp = temp.datos.map((elemento)=>{return {'value':elemento.id,'label':elemento.opcion}})
        console.log(arrTemp)
        setListaCliente(arrTemp)
    }

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
        setEstadoEnvio(false)
        if(datoChofer.id =="0" || clienteSelec == "" || movilSelec == "" || destinoSelec == ""){
            alert("Debe completar todos los campos")
            return
        }
        datoForm.id_cliente=clienteSelec.value
        datoForm.id_movil = movilSelec.value
        datoForm.destino = destinoSelec.value
        datoForm.estado = 'ACTIVO'
        console.log(datoForm);
        let respuesta = await guardarNuevoJson('/viaje/Parametros/ABMForm2.php?opcion=N',datoForm);
        console.log({"respuesta":respuesta});

        if(respuesta.cod == "00" || respuesta.cod =="10"){
            let temp = registrarViaje({"id":respuesta.idViaje,"chofer":datoChofer.nombre+" "+datoChofer.apellido,"movil":movilSelec.label,"destino":datoForm.destino});
            if (temp !="00"){
                setMsg("Error a la hora de registrar viaje")
                estadoEnvio(true)
            }else{
                navg("/viajeMov")
                setMsg("Registrado correctamente")
            }
        }else{
            setMsg("Error a la hora de registrar el viaje")

        }
        // Envía la foto y los datos al servidor utilizando fetch
        // guardarNuevoJson("/marcador/Parametros/ABMForm.php?opcion="+"E",data);

    }

    return (
        <>
            <Form>
                <Container fluid style={{alignItems:"center",gridGap:"1em",display:"grid",marginTop:"3em"}}>
                    <Row></Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <h5>{datoChofer.nombre + " "+ datoChofer.apellido} </h5>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <Form.Group className='mb-2'>
                                <Form.Label>Móvil<b className="fw-bold text-danger">*</b></Form.Label>
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
                        <Form.Group className='mb-2'>
                            <Form.Label>Destino<b className="fw-bold text-danger">*</b></Form.Label>
                            <Select
                                name="cliente"
                                id="cliente"
                                onChange={setDestinoSelec}
                                options={listaDestino}
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
                            <FloatingLabel controlId="floatingInput" label="D.T." className="mb-3">
                                <Form.Control type="text" name="dt" placeholder="Ingrese D.T." onChange={handleCampos} value={datoForm.dt}/>
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    {/*
                        <Row>
                            <Col xs={1}>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Fecha llegada" className="mb-3">
                                    <Form.Control type="text" name="fecha_fin" placeholder="Ingrese fecha de llegada" onChange={handleCampos} value={datoForm.fecha_fin}/>
                                </FloatingLabel>
                            </Col>
                            <Col xs={1}>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="floatingInput" label="Hora llegada" className="mb-3">
                                    <Form.Control type="text" name="hora_fin" placeholder="Ingrese hora de llegada" onChange={handleCampos} value={datoForm.hora_fin}/>
                                </FloatingLabel>
                            </Col>
                            <Col xs={1}>
                            </Col>
                        </Row>
                    */}
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <Button variant="success" style={{width:"100%"}} onClick={enviarDatos} disabled={!estadoEnvio}>
                                    Guardar e Iniciar
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

export default ViajeReg

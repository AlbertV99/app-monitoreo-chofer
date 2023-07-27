import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Container,Navbar,Row,Col,Button,Form,FloatingLabel} from 'react-bootstrap';
import MenuInferior from '../components/menuInf'
import Peticiones from '../helpers/peticiones.js'
import LogoIniciarViaje from '../assets/enviado.png'
import LocalBD from '../helpers/localBd.js'
import LogoPararViaje from '../assets/senal-de-stop.png'
import '../assets/css/BotonViaje.css'
import { BiUserCircle } from "react-icons/bi";


const ViajeMov = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const {obtenerChofer,registrarViaje,obtenerViaje} = LocalBD();
    const [pulsar,setPulso] = useState(false);
    const [estadoUbicacion,setEstadoUbicacion] = useState(false);
    const [intervalo,setIntervalo] = useState(null)
    const [datoViaje,setDatoViaje] = useState({"id":"","chofer":"","movil":""});
    const [ubicacion,setUbicacion] = useState({"latitud":"","longitud":"","c":0});
    const [datoForm,setDatoForm] = useState({"lat":"", "lon":"", "id_viaje": ""})
    const [intervaloW,setIntervaloW] = useState(null);
    let datoViajeBK = {"lat":"", "lon":"", "id_viaje": ""};
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    const {endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial,guardarNuevoJson} = Peticiones();
    useEffect(() => {
        let viaje = obtenerViaje()
        geolocalizar()
        console.log(viaje)
        if(viaje=="99"){
            //cambiar a registro
        }else{
            let temp = JSON.parse(viaje);

            setDatoViaje(temp);
        }
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

    const pulsarEnvios = ()=>{
        if(!pulsar){//comenzar pulsaciones
            let interv = setInterval(pulsaciones,20000)
            setIntervalo(interv) // milisegundos
        }else{//parar pulsaciones
            clearInterval(intervalo);
            setIntervalo(null);

        }
        setPulso(!pulsar);

       console.log(datoForm,estadoViaje);
       setEstadoViaje(!estadoViaje)


    }

    const pulsaciones = ()=>{
        // geolocalizar();
        enviarDatos();

    }

    const geolocalizar = async ()=>{
        const configuracion = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        };
        console.log("localizacion",configuracion)
        // navigator.geolocation.getCurrentPosition(
        setIntervaloW(navigator.geolocation.watchPosition(
              (a) => {
                  console.log(a, a.coords.latitude,a.coords.longitude);
                  setUbicacion({"latitud":a.coords.latitude,"longitud":a.coords.longitude,"c":ubicacion.c++});
                  datoViajeBK = {"lat":a.coords.latitude, "lon":a.coords.longitude, "id_viaje":datoViaje.id }

                  setEstadoUbicacion(true);
              },
              (error)=>{
                console.log("No activo la geolocalizacion",error);
                setEstadoUbicacion(false);

            },
            configuracion
          )
      )
    }

    const enviarDatos = () => {
        console.log(ubicacion)
        console.log(datoViaje)
        setDatoForm({"lat":ubicacion.latitud,"lon":ubicacion.longitud,"id_viaje": datoViaje.id});
        console.log(datoForm)
        guardarNuevoJson("/posicion/Parametros/ABMForm.php",datoForm);
        guardarNuevoJson("/posicion/Parametros/ABMForm.php",datoViajeBK);
        // Envía la foto y los datos al servidor utilizando fetch

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
                            <h3>{datoViaje.destino}</h3>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <p>{datoViaje.chofer}</p>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1}>
                        </Col>
                        <Col>
                            <p>{datoViaje.movil}</p>
                        </Col>
                        <Col xs={1}>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className={`botonViaje ${estadoViaje?'Iniciar':'Parar'}`} onClick={()=>pulsarEnvios()}> {logoEstado()}</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{(estadoViaje)?'Iniciar':'Parar'} Viaje</h3>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <h3>{" ["+datoForm.lat+":"+datoForm.lon+"]"}</h3>
                        </Col>
                    </Row>
                </Container>
                <Navbar fixed='bottom' style={{position:'fixed',bottom:"100px",width:"100%",justifyContent:"center"}}>

                </Navbar>
            </Form>

        </>
    )
}

export default ViajeMov

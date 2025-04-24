import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
    Container,
    Navbar,
    Row,
    Col,
    Button,
    Form,
    FloatingLabel,
} from "react-bootstrap";
import MenuInferior from "../components/menuInf";
import Peticiones from "../helpers/peticiones.js";
import LogoIniciarViaje from "../assets/enviado.png";
import LocalBD from "../helpers/localBd.js";
import LogoPararViaje from "../assets/senal-de-stop.png";
import "../assets/css/BotonViaje.css";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate, NavLink } from "react-router-dom";

const ViajeMov = (props) => {
    const [datos, setDatos] = useState([]);
    const [msg, setMsg] = useState("");
    const [estadoViaje, setEstadoViaje] = useState(true);
    const { obtenerChofer, registrarViaje, obtenerViaje } = LocalBD();
    const [pulsar, setPulso] = useState(false);
    const [estadoUbicacion, setEstadoUbicacion] = useState(false);
    const [intervalo, setIntervalo] = useState(null);
    const [datoViaje, setDatoViaje] = useState({
        id: "",
        chofer: "",
        movil: "",
    });
    const [ubicacion, setUbicacion] = useState({
        latitud: "",
        longitud: "",
        c: 0,
    });
    const [datoForm, setDatoForm] = useState({
        lat: "",
        lon: "",
        id_viaje: "",
    });
    const [intervaloW, setIntervaloW] = useState(null);
    const [estadoEncuesta, setEstadoEncuesta] = useState(true);
    let datoViajeBK = { lat: "", lon: "", id_viaje: "" };
    const navg = useNavigate();
    const TIEMPO_INTERVALOS = 1200000;
    // const [,,,,,,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial] = Peticiones();

    const {
        endpointLibre,
        obtenerPersona,
        registrarMarcacion,
        obtenerHistorial,
        guardarNuevoJson,
    } = Peticiones();
    useEffect(() => {
        let viaje = obtenerViaje();
        // geolocalizar()
        console.log(viaje);
        if (viaje == "99") {
            //cambiar a registro
        } else {
            let temp = JSON.parse(viaje);

            setDatoViaje(temp);
            alert(
                "Recomendaciones para iniciar un viaje:\n" +
                    "- Mantenga sus datos prendidos en todo momento\n" +
                    "- Tenga el GPS encendido durante el viaje\n" +
                    "- No bloquee el Celular \n" +
                    "- Maneje con cuidado",
            );
        }
    }, []);

    const encuesta = () => {};

    const verificarChofer = () => {
        let chofer = obtenerChofer();
        console.log(chofer);
        if (chofer == "99") {
            //cambiar a registro
        } else {
            let temp = JSON.parse(chofer);
            setDatoChofer(temp);
            datoForm.id_chofer = temp.id;
        }
    };

    const handleCampos = (event) => {
        setDatoForm({
            ...datoForm,
            [event.target.name]: event.target.value,
        });
        // console.log(datoForm);
    };

    const logoEstado = () => {
        return estadoViaje ? (
            <img src={LogoIniciarViaje} className="logoViaje" />
        ) : (
            <img src={LogoPararViaje} className="logoViaje" />
        );
    };

    const pulsarEnvios = () => {
        if (!pulsar) {
            //comenzar pulsaciones
            let interv = setInterval(pulsaciones, TIEMPO_INTERVALOS);
            setIntervalo(interv); // milisegundos
            geolocalizar();
        } else {
            //parar pulsaciones
            navigator.geolocation.clearWatch(intervaloW);
            clearInterval(intervalo);
            setIntervalo(null);
        }
        setPulso(!pulsar);
        setEstadoViaje(!estadoViaje);
        if (!estadoViaje) {
            pararViaje();
        }
    };

    const pulsaciones = () => {
        // geolocalizar();
        // enviarDatos2(ubicacion);
    };

    const geolocalizar = async () => {
        const configuracion = {
            enableHighAccuracy: true,
            maximumAge: 0,
        };
        console.log("localizacion", configuracion);
        // navigator.geolocation.getCurrentPosition(
        setIntervaloW(
            navigator.geolocation.watchPosition(
                (a) => {
                    console.log(a, a.coords.latitude, a.coords.longitude);
                    setUbicacion({
                        latitud: a.coords.latitude + "",
                        longitud: a.coords.longitude + "",
                        c: ubicacion.c++,
                    });
                    datoViajeBK = {
                        lat: a.coords.latitude,
                        lon: a.coords.longitude,
                        id_viaje: datoViaje.id,
                    };
                    // setUbicacion({"lat":a.coords.latitude+"", "lon":a.coords.longitude+"", "id_viaje":datoViaje.id +""});
                    setEstadoUbicacion(true);
                },
                (error) => {
                    console.log("No activo la geolocalizacion", error);
                    setEstadoUbicacion(false);
                },
                configuracion,
            ),
        );
    };

    const enviarDatos2 = (datos) => {
        console.log(datoViajeBK);
        setDatoForm({
            lat: datoViajeBK.lat,
            lon: datoViajeBK.lon,
            id_viaje: datoViaje.id,
        });
        guardarNuevoJson("/posicion/Parametros/ABMForm.php", {
            lat: datoViajeBK.lat,
            lon: datoViajeBK.lon,
            id_viaje: datoViaje.id,
        });
    };
    const pararViaje = () => {
        setDatoForm({ id_viaje: datoViaje.id, estado: "TERMINADO" });
        // guardarNuevoJson("/posicion/Parametros/ABMForm.php",datoForm);
        guardarNuevoJson("/viaje/Parametros/ABMForm2.php?opcion=N", datoForm);
        // Envía la foto y los datos al servidor utilizando fetch
        navg("/encuesta");
    };

    return (
        <>
            <Form>
                <Container
                    fluid
                    style={{
                        alignItems: "center",
                        gridGap: "1em",
                        display: "grid",
                        marginTop: "3em",
                    }}
                >
                    <Row></Row>
                    <Row></Row>
                    <Row></Row>
                    <Row>
                        <Col xs={1}></Col>
                        <Col>
                            <h3>{datoViaje.destino}</h3>
                            <p>{datoViaje.chofer}</p>
                            <p>{datoViaje.movil}</p>
                        </Col>
                        <Col xs={1}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                className={`botonViaje ${estadoViaje ? "Iniciar" : "Parar"}`}
                                onClick={pulsarEnvios}
                            >
                                {" "}
                                {logoEstado()}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>{estadoViaje ? "Iniciar" : "Parar"} Viaje</h3>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p
                                style={{
                                    fontSize: "8pt",
                                    color: "#a2a4a6",
                                    margin: "3px 0px",
                                }}
                            >
                                >
                                {" [" + datoForm.lat + ":" + datoForm.lon + "]"}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p
                                style={{
                                    fontSize: "8pt",
                                    color: "#a2a4a6",
                                    margin: "3px 0px",
                                }}
                            >
                                >
                                {" [" +
                                    ubicacion.latitud +
                                    ":" +
                                    ubicacion.longitud +
                                    "]"}
                            </p>
                        </Col>
                    </Row>
                </Container>
                <Navbar
                    fixed="bottom"
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        width: "100%",
                        justifyContent: "center",
                    }}
                ></Navbar>
            </Form>
        </>
    );
};

export default ViajeMov;

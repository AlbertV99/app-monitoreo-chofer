import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,ButtonGroup,ToggleButton,Form,Pagination,FloatingLabel} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import OpcionesEncuesta from '../components/OpcionesEncuesta'
import Peticiones from '../helpers/peticiones.js'
import LocalBD from '../helpers/localBd.js'
import Estrella from '../assets/estrella.png'
import EstrellaColor from '../assets/estrellaColor.png'
import '../assets/css/Encuesta.css'

const EncuestaEstrellas = ({idViaje,setEncuesta}) => {
    const {obtenerViaje} = LocalBD();

    const navg = useNavigate()

    const {guardarNuevoJson} = Peticiones();
    const [opciones,setOpciones] = useState(0);
    const [opEncuesta,setOpEncuesta] = useState(0);
    const [observ,setObserv] = useState("");
    const [vista,setVista] = useState(1);

    const enviarEncuesta = async ()=>{
        let viaje = obtenerViaje()
        viaje = JSON.parse(viaje);
        const encuesta = {
            "id_viaje":viaje.id,
            "puntuacion":opciones,
            "opcion_seleccionada":opEncuesta,
            "observacion":observ
        }
        let temp = await guardarNuevoJson(`/rpta_encuesta/Parametros/ABMForm.php?opcion=N`,encuesta)
        navg("/viajeReg")
        console.log(temp)
    }

    const condicionVista = ()=>{
        if(vista == 1){
            return (
                <>
                <Row>
                        <OpcionesEncuesta numero={opciones} onBotonSeleccionado={setOpEncuesta} opSel={opEncuesta}></OpcionesEncuesta>
                </Row>
                <Row>
                    <Col>
                        <br/>
                    </Col>
                </Row>
                <Row>
                    <Col xs="8"></Col>
                    <Col>
                          {(!opciones==0 && !opEncuesta ==0 ) && <Button onClick={()=>setVista(2)} >Siguiente</Button> }
                    </Col>
                </Row>
                </>
            )
        }else if (vista == 2){
            return (
                <>
                    <Row>
                        <Col xs={1}></Col>
                        <Col>
                            <FloatingLabel controlId="floatingTextarea" label="Deje su comentario" className="mb-3">
                                <Form.Control as="textarea" placeholder="Deje un comentario" value={observ} onChange={(event)=>setObserv(event.target.value)} />
                            </FloatingLabel>
                        </Col>
                        <Col xs={1}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="3">
                            <Button onClick={()=>setVista(1)} >Volver</Button>
                        </Col>
                        <Col xs="5"></Col>
                        <Col xs="3">
                            {(opciones!=0 && opEncuesta !=0 )?  <Button onClick={enviarEncuesta} variant="success">Guardar</Button> : ""}
                        </Col>
                    </Row>
                </>
            )
        }
    }
    return (
        <Container fluid style={{marginTop:"3em",justifyContent: "center",backgroundColor:'white'}}>
            <Row style={{justifyContent:"center"}}>
                <Col>¿Cómo te fue con el retiro? Ayudanos a mejorar el servicio o deja tus comentarios positivos</Col>
            </Row>
            <Row style={{justifyContent:"center"}}>
                <Col></Col>
                <Col style={{justifyContent:"center"}}>
                    <ButtonGroup style={{justifyContent:"center"}}>
                        <ToggleButton className="opcionEstrellaIzq" type="checkbox" variant="outline-primary" key="1" onClick={()=>setOpciones(1)} ><img src={(opciones>=1)?EstrellaColor:Estrella} className="Estrella"  /></ToggleButton>
                        <ToggleButton className="opcionEstrella" type="checkbox" variant="outline-primary" key="2" onClick={()=>setOpciones(2)} ><img src={(opciones>=2)?EstrellaColor:Estrella} className="Estrella"  /></ToggleButton>
                        <ToggleButton className="opcionEstrella" type="checkbox" variant="outline-primary" key="3" onClick={()=>setOpciones(3)} ><img src={(opciones>=3)?EstrellaColor:Estrella} className="Estrella"  /></ToggleButton>
                        <ToggleButton className="opcionEstrella" type="checkbox" variant="outline-primary" key="4" onClick={()=>setOpciones(4)} ><img src={(opciones>=4)?EstrellaColor:Estrella} className="Estrella"  /></ToggleButton>
                        <ToggleButton className="opcionEstrellaDer" type="checkbox" variant="outline-primary" key="5" onClick={()=>setOpciones(5)} ><img src={(opciones>=5)?EstrellaColor:Estrella} className="Estrella"  /></ToggleButton>
                    </ButtonGroup>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <br/>
                </Col>
            </Row>
            {/*<Row> {opciones + " - " + opEncuesta}</Row>*/}
            {condicionVista()}

            <Row>
                <Col>
                    <br/>
                </Col>
            </Row>




        </Container>
    )

}



export default EncuestaEstrellas

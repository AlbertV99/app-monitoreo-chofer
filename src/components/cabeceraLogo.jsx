import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import { BiHistory,BiCalendarCheck,BiCog } from "react-icons/bi";
import LogoValurq from '../assets/logoSF.png'


const CabeceraLogo = (props) => {
    const base = {"historial":"","hora":"","config":""};
    const [dir,setDir] = useState({"historial":"","hora":"","config":""});
    const cambiar = (direccion)=>{
        let temp = base;
        temp[direccion]="activo"
        setDir(temp);
    }
    /*
    historial  BiHistory
    marcar BiCalendarCheck | BiUserCheck
    ajustes BiCog
    // registro BiUserCircle
    */
    return (
        <Container fluid style={{padding:"0px",justifyContent: "center",backgroundColor:'white'}} >
            <Row style={{width:"100%",justifyContent:"center",backgroundColor:"#005285",padding:"8px"}} id="opciones">
                <Col xs={1} >
                    <img src={LogoValurq} style={{height:'2em'}} />
                </Col>
                <Col xs={11} >
                    <h3 style={{color:"white"}}>Monitoreo Logistica</h3>
                </Col>
            </Row>

        </Container>
    )
}

export default CabeceraLogo;

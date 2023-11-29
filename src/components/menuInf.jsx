import React,{useState} from 'react'
import PropTypes from 'prop-types'
import {Container,Row,Col,Button,Form} from 'react-bootstrap';
import {useNavigate,NavLink} from "react-router-dom"
import { BiBusSchool,BiUser } from "react-icons/bi";

const MenuInferior = (props) => {
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
            <Row style={{width:"100%",justifyContent:"center"}} id="opciones">
            <Row>
                <Col xs={4}>
                </Col>
                <Col xs={8} style={{padding:'0px',textAlign:'right'}}>
                    <p style={{fontSize:'8pt',color:'#a2a4a6',margin:'3px 0px'}}>
                        Desarrollado por Valurq S.R.L.<span style={{fontWeight:"bold",color:'black'}}> (V.1-BetaDesa)</span>
                    </p>
                </Col>
            </Row>
                <Col xs={6}>
                    <NavLink to={`/viajeReg`}>
                            <h2><BiBusSchool/></h2>
                            Viaje
                    </NavLink>
                </Col>
                <Col xs={6}>
                    <NavLink to={`/perfil`}>

                        <h2><BiUser/></h2>
                        Perfil
                    </NavLink>

                </Col>
            </Row>

        </Container>
    )
}

export default MenuInferior;

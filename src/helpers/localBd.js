const LocalBD =()=>{
    const registrarChofer = (chofer)=>{
        console.log(chofer,"funcion registrar");
        localStorage.setItem('chofer',JSON.stringify(chofer));
        return "00";
    }
    const obtenerChofer = ()=>{
        let temp = localStorage.getItem('chofer');
        if(temp){
            return temp;
        }else{
            return "99"
        }
    }

    const registrarViaje = (viaje)=>{
        localStorage.setItem('viajeId',JSON.stringify(viaje));
        return "00";
    }

    const obtenerViaje = ()=>{
        let temp = localStorage.getItem('viajeId');
        if(temp){
            return temp;
        }else{
            return "99"
        }
    }



    return {
        "registrarChofer":registrarChofer,
        "obtenerChofer":obtenerChofer,
        "registrarViaje":registrarViaje,
        "obtenerViaje":obtenerViaje
    }


}
export default LocalBD

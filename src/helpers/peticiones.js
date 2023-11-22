// import useState from 'react'
// import env from "react-dotenv";
import Constantes from "./constantes"

const Peticiones = () => {
  //DATOS A UTILIZAR EN EL OBJETO CARDS
    const {host} = Constantes();
    const BASE = host // SERVIDOR AL CUAL SE REALIZARAN LAS PETICIONES
    const EMPRESA = "01"
    const CODIGO = "01"
    const CLAVE = "pollo931"
    const SFTP_USER = "yo"
    const SFTP_PASS = "pollo931"
    //FUNCIONES A UTILIZAR
    const obtenerPanel = async (modulo,setState,pagina=0,buscar="",filtros=[]) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = BASE + modulo + "/"+pagina+"/"+((buscar!=="")?buscar : "")
        const temp = await fetch(url)
        const data = await temp.json();
        console.log(url,"testting");
        console.log(data,"testting");
        console.log("testting");
        setState(data)
        // setCarga(false)
    }

    const obtenerDatos = async (modulo) => {
        const url = BASE + modulo ;
        console.log(url)
        const temp = await fetch(url)
        const data = await temp.json()
        console.log(data,"<-datos")
        return data
    }

    const obtenerUnicoRegistro = async (modulo,id) =>{
        // setCarga(true)
        // IDEA: Cambiar por constante de ambiente
        const url = BASE + modulo +"/"+id
        const temp = await fetch(url)
        const data = await temp.json();
        return data
    }

    const guardarNuevoJson = async (modulo,datos)=>{
        const url = BASE + modulo ;
        console.log(url)
        console.log(datos)
        const temp = await fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify(datos)
        });
        console.log(temp);
        // const res = await fetch(url)
        const data = await temp.json();
        console.log(data);
        return data;
    }

    const guardarNuevoArchivo = async (modulo,datos)=>{

        const form = new FormData();

        for (var indice in datos) {
            if (datos.hasOwnProperty(indice)) {
                form.append(indice, datos[indice]);
            }
        }
        const url = BASE + modulo ;
        const temp = await fetch(url, {
          "method": "POST",
          "headers": {
            "Content-Type": "multipart/form-data",
            "body": form
            }
        });
        const data = await temp.json();
        console.log(data);
        return data;

    }

    const modificarRegistroJson = async (modulo,id,datos)=>{
        const url = BASE + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "PUT",
          "headers": {
            "Content-Type": "application/json",
           },
            "body": JSON.stringify(datos)
        });
        const res = await fetch(url)
        const data = await res.json();

    }

    const eliminarRegistro = async (modulo,id)=>{
        const url = BASE + modulo + "/" + id ;
        const temp = await fetch(url, {
          "method": "DELETE",
        });
        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    const endpointLibre = async (modulo,metodo)=>{
        const url = BASE + modulo ;
        const temp = await fetch(url, {
          "method": metodo,
        });

        const res = await fetch(url)
        const data = await res.json();
        return data;
    }

    const obtenerPersona = async (ci)=>{
        const query= `SELECT * FROM personal WHERE nro_docum ='${ci}';`
        const url = BASE;
        // + "/personal/Parametros/consultaValores.php"
        const temp = await fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'text/plain'},
              body: query
        });
        // console.log(temp)
        try{
            const data = JSON.parse(await temp.text());

            return data
        }catch (e){
            console.error("error:",e)
            return []
        }

    }

    const obtenerPersonales = async ()=>{
        const query = "SELECT id,nombres,apellidos,nro_docum,dsc_cargo FROM personal ;";
        const url = BASE + "/personal/Parametros/consultaValores.php";
        const temp = await fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'text/plain'},
              body: query
        });
        try{
            const data = JSON.parse(await temp.text());
            console.log(data)
            localStorage.setItem('personales',JSON.stringify(data.datos));
            // return data
        }catch (e){
            console.error("error:",e)
            return []
        }
    }

    const registrarMarcacion = async (datos)=>{
        return ""
    }

    const obtenerHistorial = async (ci)=>{
        const query = `SELECT pa.id,pa.fecha, pa.personal, pa.hs_entrada,pa.hs_entrada,pa.hs_salida FROM panel_asistencia  pa join personal p on  pa.personal = CONCAT(p.nombres,' ',p.apellidos) WHERE p.nro_docum = '${ci}'  LIMIT 20`;
        const url = BASE;
        const temp = await fetch(url, {
              method: 'POST',
              headers: {'Content-Type': 'text/plain'},
              body: query
        });
        // console.log(temp)
        try{
            const data = JSON.parse(await temp.text());
            return data
        }catch (e){
            console.error("error:",e)
            return []
        }
        return ""
    }
    // return [obtenerPanel,obtenerUnicoRegistro,guardarNuevoJson,guardarNuevoArchivo,modificarRegistroJson,eliminarRegistro,endpointLibre,obtenerPersona,registrarMarcacion,obtenerHistorial]
    return {
        "obtenerPanel":obtenerPanel,
        "obtenerUnicoRegistro":obtenerUnicoRegistro,
        "guardarNuevoJson":guardarNuevoJson,
        "guardarNuevoArchivo":guardarNuevoArchivo,
        "modificarRegistroJson":modificarRegistroJson,
        "eliminarRegistro":eliminarRegistro,
        "endpointLibre":endpointLibre,
        "obtenerPersona":obtenerPersona,
        "registrarMarcacion":registrarMarcacion,
        "obtenerHistorial":obtenerHistorial,
        "obtenerPersonales":obtenerPersonales,
        "obtenerDatos":obtenerDatos
    }
}

export default Peticiones

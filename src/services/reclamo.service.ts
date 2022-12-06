// import { Motivo, Reclamo, Reclamoinput, ReclamoInputMotivo, RegistroReclamo, Titulo } from '@/models';

import axios from 'axios'

import { and, Archivo, Cliente, Documento, KiuResponse, Motivo, Reclamo, ReclamoMotivo, ReservaBillete, Root, Titulo } from '../models'


import.meta.env.VITE_API_AGENT_ID


  const url = 'https://reclamos.premierplus.club'
 //const url ='https://localhost:5001'




export const getReclamos = () =>{
    // const reclamos = 
    return{ call: axios.get<Reclamo[]>(`${url}/api/reclamo`)}
}

export const saveReclamosRegistro = (reclamoRegistro: any) =>{
    return{ call: axios.post<any>(`${url}/api/reclamo`,reclamoRegistro)}
}

 export const getMotivos = (idReclamo: number)=>{
     return{ call: axios.get<Motivo[]>(`${url}/api/reclamo/${idReclamo}`)}
}

// export const getTitulos = (idReclamoMotivo: number ) =>{
//     return{ call: axios.get<Titulo[]>(`https://localhost:5001/api/titulo/${idReclamoMotivo}`)}
// }

export const getTitulosInputs = (idReclamo: number, idMotivo: number =0) =>{
    return{ call: axios.get<Titulo[]>(`${url}/api/titulo?idReclamo=${idReclamo}&idMotivo=${idMotivo}`)}
}

export const getReclamoMotivo = (idReclamo: number, idMotivo: number =0) =>{
    return{ call: axios.get<ReclamoMotivo>(`${url}/api/reclamo/ruta2?idReclamo=${idReclamo}&idMotivo=${idMotivo}`)}
}

export const getDocumentos = () =>{
    return{ call: axios.get<Documento[]>(`${url}/api/documento`)}
}

// export const getApiRemota =(objAnd: Root )=>{
//     console.log(objAnd)
//     return{ call:axios.post<any>(`${apiRemota}`,objAnd,{headers:{
//         'Content-Type': 'application/json',
//         //'Access-Control-Allow-Origin': "http://localhost:3000",
//         'Accept':'*/*'
    
//     }}).catch(function(error) {
//         console.log('What happened? ' + error);
//       }) }
// }

export const saveArchivo =(archivo: FormData )=>{
    console.log(archivo)
return{call: axios.post<any>(`${url}/api/archivo`, archivo,{headers:{'Content-Type': 'multipart/form-data',}})}
}

export const remoteValidarBoleto=(reserbaBillete: ReservaBillete)=>{
   
    return{call: axios.post<KiuResponse>(`${url}/api/reclamo/kiu`,reserbaBillete)}
}

export const getPaises=()=>{
    return{call: axios.get<any>(`${url}/api/pais`)}
}

export const getInfoToken=(token :string)=>{
    return{call: axios.get<Cliente>(`${url}/api/ProcesoReclamo/confirmacion?token=${token}`)}
}
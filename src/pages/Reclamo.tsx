import { Formik, Form,useFormikContext } from 'formik';
import { useState,useEffect,ChangeEvent, FormEvent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { number } from 'yup/lib/locale';
import { MyCheckbox, MyTextInput, MySelect } from '../components'
import { and, Coupon_information, KiuResponse, Motivo, Reclamo as Reclamos, ReclamoMotivo, ReservaBillete, Root } from '../models';
import {  getMotivos, getReclamoMotivo, getReclamos, remoteValidarBoleto } from '../services/reclamo.service';
import Registro from './Registro';

const initialValues ={
    idReclamo:'',
	codigoReserva:'',
	numeroBillete:'',
	idMotivo:'',
    pir:'',
    pirFecha:'',
} 
export interface datosR{
    codigoReserva:string
    numeroBillete:string
    idReclamo:number
}


export type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
const Reclamo = () => {

    const [reclamos, setReclamos] = useState<Reclamos[]>()
    const [motivos,setMotivos] = useState<Motivo[]>()
    const [masOpsiones, setMasOpsiones] = useState(false)
    const [registro, setRegistro] = useState(true)
    const [datosRegistro,setDatosRegistros] = useState<any>({}) 
    const [equipajeHide,setEquipajeHide] = useState(false)  
    const [kiuResponse, setKiuResponse] = useState<KiuResponse>(null)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })


    const listaReclamos = async () =>{
        await getReclamos().call.then(response => setReclamos(response.data)) 
    }
    // { target:{name,value}}:HandleInputChange
    const handleChanges  =async(e: any)=>{
    if(e.target.name==='idReclamo'){
    if( e.target.value==='2' || e.target.value==='12'){
        
        await getMotivos(e.target.value).call.
                                            then(response => setMotivos(response.data))
                                           
        setMasOpsiones(true)
        setEquipajeHide(false)
    }
    else{
        initialValues['idMotivo']=''
        setMasOpsiones(false)
        setEquipajeHide(false)
    }

    if(e.target.value ==='6'){
        setEquipajeHide(true)
    }
}
      



    }
const ontenerReclamoMotivo = async(idReclamo: number,idMotivo: number=0)=>{
    return await getReclamoMotivo(idReclamo,idMotivo)
                    .call
                    .then(res=>res.data)
}

const validarBoleto = async(boleto: string,reserva: string)=>{

  
    try {
        const reservaBillete: ReservaBillete=  {
        boleto:boleto+"",
        reserva:reserva
        }
        
    
        const rpta = await remoteValidarBoleto(reservaBillete).call;
        return rpta.data;
    } catch (error) {
        
        //console.log(error.response.status)
        return error.response.status
    }
    
}
    useEffect(()=>{
        listaReclamos()      
        
    },[])

       
       


  return (
    <div className='row' style={{marginTop:'-1pc'}}>
    <h1>Reclamaciones</h1>

   { registro?<Formik 
        initialValues={initialValues}
 
    
        onSubmit={ async( values ) => {

        
            if(values.idReclamo!=='2'){
                values['idMotivo']=''
            }

    const rpta = await validarBoleto(values.numeroBillete,values.codigoReserva)
    
    if(typeof(rpta)==='number'){
        Toast.fire({
            icon: 'error',
            title: "numero de documento o reserva incorrecto"
          })
        return
    }
    console.log(rpta)
    //const cuponInfo: Array<Coupon_information> = Object.values(rpta.coupon_information)

    //console.log(cuponInfo)
    try {
        let cont: number=0;
        const rptaObtener =   await ontenerReclamoMotivo(  parseInt(values.idReclamo),values.idMotivo===''? 0: parseInt(values.idMotivo))
        console.log(rptaObtener)
        setDatosRegistros({
           idReclamoMotivo:rptaObtener.reclamoMotivo.idReclamoMotivo,
           idReclamo:values.idReclamo,
           codigoReserva:values.codigoReserva,
           numeroBillete:values.numeroBillete,
           idMotivo:rptaObtener.reclamoMotivo.idMotivo,
           reclamo:rptaObtener.reclamo.nombre,
           motivo:rptaObtener.motivo.nombre
        })
        
        setKiuResponse(rpta)
        const cuponInfo:  Array<Coupon_information> =  Object.values(
            rpta.coupon_information
          );
          cuponInfo.map((cupun=>{
            if(Date.parse(cupun.flight_departure_date)< Date.now()){
               
               cont=+1
            }
         }))
         if(cont>0){
            setRegistro(false)
            Toast.fire({
                icon: 'success',
                title: 'Ok'
              })
            
        }
        else{
            Toast.fire({
                icon: 'error',
                title: 'No tiene vuelos registrados'
              })
        }

        // setRegistro(false)
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error'
          })
    }        
        }}

        
        
        validationSchema={Yup.object({
                idReclamo: Yup.string()
                                .required('Requerido'),
                codigoReserva: Yup.string()
                            .required('Requerido')
                            .min(6,'Son 6 caracteres')
                            .max(6,'Son 6 caracteres'),
                numeroBillete: Yup.number()
                            .required('Requerido')
                            .test('len', 'Tiene que haber 13 caracteres', val => val?.toString().length === 13)
                            .integer(),
                idMotivo:Yup.string().when([],{
                    is:()=> masOpsiones,
                    then: Yup.string().required('El motivo es requerido'),
                    otherwise:Yup.string().notRequired(),
                }),
                pir:Yup.string().when([],{
                    is:()=> equipajeHide,
                    then: Yup.string().required('El PIR es requerido'),
                    otherwise:Yup.string().notRequired(),
                }),
                pirFecha:Yup.string().when([],{
                    is:()=> equipajeHide,
                    then: Yup.string().required('La fecha de el PIR es requerido'),
                    otherwise:Yup.string().notRequired(),
                }),
            })
        }>

            {(formik) => (
                    <Form className='d-flex flex-column'>
                        <div className='col-md-12 d-flex justify-content-around mt-4'>
                        <div className='col-md-4 d-flex flex-column mb-4'>
                            <label className='form-label' >Seleccione el tipo de reclamo <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>{"Reclamo"}.</Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </OverlayTrigger></label>
                            


                         <MySelect  label="Reclamo" name="idReclamo" handleChanges={handleChanges} >
                         <option  value="">Seleccione</option>
                            {
                                
                                reclamos?.map(({idReclamo,descripcion,nombre})=>(
                                    <option value={idReclamo}>{nombre}</option>
                                ))
                            }
                           
                        </MySelect>
                        </div>
                        {
                            masOpsiones?<div className='col-md-4 d-flex flex-column mb-4'>
                                <label className='form-label' >Motivo</label>
                                <MySelect label="Motivo" name="idMotivo" handleChanges={handleChanges} >
                            <option  value="">Seleccione</option>
                               {
                                   
                                   motivos?.map(({idReclamo,idMotivo,idReclamoMotivo,nombre})=>(
                                       <option value={idMotivo}>{nombre}</option>
                                   ))
                               }
                              
                           </MySelect></div>:<div className='col-md-4 d-flex flex-column mb-4'></div>

                        }
                       
                    </div>
{
                    equipajeHide? <div  className='col-md-12 d-flex justify-content-around mt-4'>
    

                            <div className='col-md-4 d-flex flex-column mb-4'>
                            <MyTextInput
                              label="PIR"
                              name="pir" 
                              placeholder="PIR"
                            />
    </div>
                     
                    
                                 <div className='col-md-4 d-flex flex-column mb-4'>
                            <MyTextInput
                              label="PIR fecha"
                              name="pirFecha" 
                              placeholder="PIR fecha"
                              type='date'
                            />
    </div>
                        
</div>:''}





    <label className='form-label f-left' >Datos de la reserva </label>   

                        <div className='col-md-12 d-flex justify-content-around mt-4'>  
        <div className='col-md-4 d-flex flex-column mb-4'>
       
                        <MyTextInput
                          label="Codigo de Reserva"
                          name="codigoReserva" 
                          placeholder="Codigo de Reserva"
                          maxlength='6'
                        />
                      
                        <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>{"Reclamo"}.</Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </OverlayTrigger>
</div>
<div className='col-md-4 d-flex flex-column mb-4'>
                        <MyTextInput
                          label="Numero de billete"
                          name="numeroBillete" 
                          placeholder="Numero de billete"
                          type='number'
                          maxlength='13'
                        />
                         <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>{"Reclamo"}.</Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </OverlayTrigger>
                        </div>      
                        </div>
                                                

                       

                      <div className='col-md-12 d-flex justify-content-between'>
                      <button className='w-25' type="button">Cancelar</button>
                      <button className='w-25' type="submit">Continuar</button>
                      </div>

                        

                    </Form>
                )
            }
        

    </Formik>: <Registro datos={datosRegistro} setRegistro={setRegistro} kiuResponse={kiuResponse} pir={''}/>}


    

</div>
)
        }

export default Reclamo
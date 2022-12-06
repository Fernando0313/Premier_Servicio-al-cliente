import React, { useEffect, useState } from 'react'
import { Field,ErrorMessage,useField } from 'formik'
import { Coupon_information } from '../models';

interface Props {
    label: string;
    name: string;
    cupon:Coupon_information[];
    placeholder?: string;
    //[x: string]: any;
    //options:string
}
const MyRadioButton = ({label,name,cupon,...props}:Props) => {
    const [arrFecha, setArrFecha]= useState<Coupon_information[]>()
    const fechas =()=>{
        const arr:Coupon_information[] =[]
        cupon.map(cuponInf =>{
            
            if( new Date(cuponInf.flight_departure_date)<= new Date(Date.now()) ){
                const arrFech = cuponInf.flight_departure_date.split("-")
            cuponInf['dateOrigen']= cuponInf.flight_departure_date
            cuponInf.flight_departure_date= arrFech[2]+"-"+arrFech[1]+"-"+arrFech[0]
            arr.push(cuponInf)
          
            }
           
            
              
        })
        if(arr.length!=0){
            setArrFecha(arr)
            console.log(arrFecha)
        }
        
    }
    useEffect(()=>{
        fechas()
    },[])
    
  return (
    <div className='form-control'>
        <label className='col-md-12'>{label}</label>
        <Field name={name} {...props} >
{
    ({field})=>{
        return arrFecha && arrFecha.map(cuponInf =>{
               
                return(
                    <React.Fragment >
                        <div className='col-md-12 d-flex justify-content-between'>
                        <input type='radio'
                        {...field}
                        {...props}
                        value={cuponInf.origin_airport_reference_id.substring(0,3)+"_"+cuponInf.destination_airport_reference_id.substring(0,3)+"_"+cuponInf.flight_departure_date+"_"+cuponInf.flight_number}
                        cheked={field.value===cuponInf.origin_airport_reference_id+"-"+cuponInf.destination_airport_reference_id}
                        />
                         <label htmlFor={cuponInf.origin_airport_reference_id+"-"+cuponInf.destination_airport_reference_id}>{cuponInf.origin_airport_reference_id.substring(0,3) +"-"+cuponInf.destination_airport_reference_id.substring(0,3)}</label>
                         
                         <div> {cuponInf.flight_departure_date} </div>
                         <div >{cuponInf.flight_number}</div>
                         </div>
                    </React.Fragment>
                )
           

           
        })
    }
}

        </Field>
        <ErrorMessage className='text-danger' name={ name } component="span" />
        </div>
  )
}

export default MyRadioButton
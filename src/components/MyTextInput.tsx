import { ErrorMessage, FormikProps, useField, useFormikContext } from 'formik';
import { useEffect } from 'react';

interface Props {
    maxlength?:string;
    label: string;
    name: string;
    type?: 'text' | 'email' | 'password'|'number'|'date';
    placeholder?: string;
    [x: string]: any;
    value?:string
    disabled?:boolean
}


export const MyTextInput = ( { label,formik, ...props }: Props ) => {
    const { setFieldValue } = useFormikContext()
    const [ field ] = useField(props)
    useEffect(()=>{
    if(props.value)
        setFieldValue(props.name,props.value)
    },[])
    // console.log(props.name)
    // if(props.value)
    //     setFieldValue(props.name,props.value)
    return (
        <>
        

            {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
            <input className="text-input form-control" { ...field } { ...props }  onChange={e=>{
                     if(props.maxlength==='13' ){
                            if(e.target.value.length<=13) field.onChange(e)
                     }
                     else if(props.name==='paxNumeroPremier'){
                        if(e.target.value.length<=10) field.onChange(e)
                     }
                     else if(props.name==='paxTelefono'|| props.name==='contTelefono'){
                        if(e.target.value.length<=14) field.onChange(e)
                     }
                     else if(props.name==='paxNumeroDocumento'){
                        if(e.target.value.length<=15) field.onChange(e)
                     }
                     else{
                        field.onChange(e);   
                     }
                    if(props.name==='codigoReserva'){
                        e.target.value=e.target.value.toUpperCase()
                        field.onChange(e)
                    }
                      

                
                     
            }} />
            <ErrorMessage className='text-danger' name={ props.name } component="span" />
        </>
    )
}

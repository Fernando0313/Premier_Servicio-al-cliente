import { ErrorMessage, Field } from 'formik';
import React from 'react'

interface Props {
    label: string;
    name: string;
 
    placeholder?: string;
    //[x: string]: any;
    //options:string
}
const RadioButton = ({label,name,...props}:Props) => {
    return (
        <div className='col-md-4 p-2' style={{border:'1px solid #ced4da'}}>
            <label className='col-md-12'>{label}</label>
            <Field name={name} {...props} >
    {
        ({field})=>{
            
                    return(
                        <React.Fragment >
                            <div className='col-md-12 d-flex justify-content-between'>
                            <input type='radio'
                            {...field}
                            {...props}
                            value={1}
                            cheked={1}
                            />
                             <label htmlFor="">Si</label>
                             
                           
                             </div>

                             
                             <div className='col-md-12 d-flex justify-content-between'>
                            <input type='radio'
                            {...field}
                            {...props}
                            value={0}
                            cheked={2}
                            />
                             <label htmlFor="">No</label>
                             
                           
                             </div>
                        </React.Fragment>
                        
                    )
               
    
               
            
        }
    }
    
            </Field>
            <ErrorMessage className='text-danger' name={ name } component="span" />
            </div>
      )
}

export default RadioButton
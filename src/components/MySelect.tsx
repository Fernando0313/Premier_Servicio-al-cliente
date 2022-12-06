import { ErrorMessage, useField } from 'formik';
import React, { ChangeEvent } from 'react';

// type HandleInputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
interface Props {
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
    handleChanges: any;
}


export const MySelect = ( {  handleChanges,label, ...props}: Props ) => {

    const [ field ] = useField(props)
    
    return (
        <>
            {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
            <select className='form-select' { ...field } { ...props}  onChange={e=>{
                        handleChanges(e)
                        
                      field.onChange(e);
             }}/>
            <ErrorMessage  className='text-danger' name={ props.name } component="span" />
        </>
    )
}

import { ErrorMessage, FormikProps, useField, useFormikContext } from 'formik';

interface Props {
    maxlength?:string;
    label: string;
    name: string;
    type: 'file';
    placeholder?: string;
    [x: string]: any;
    setArchivo:any
    handleChange:any;
}


export const MyTextInputFile = ( { label,setArchivo,handleChange, ...props }: Props ) => {
    
    const [ field ] = useField(props)
    // console.log(props.name)
    return (
        <>
        

            {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
            <input className="text-input form-control" { ...field } { ...props }  onChange={(event)=> { 
               
                handleChange(event);
               field.onChange(event)} 
                }/>
            <ErrorMessage className='text-danger' name={ props.name } component="span" />
        </>
    )
}

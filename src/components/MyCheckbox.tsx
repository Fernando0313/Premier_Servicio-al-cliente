import { ErrorMessage, useField } from 'formik';

interface Props {
    label: string;
    name: string;
    [x: string]: any;
    value:string
}


export const MyCheckbox = ({ label, ...props }: Props ) => {

    const [ field ] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <label>
                <input type="radio" { ...field } { ...props } />
                { label }            
            </label>
            <ErrorMessage className='text-danger' name={ props.name } component="span" />
        </>
    )
}

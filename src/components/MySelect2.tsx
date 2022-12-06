import { ErrorMessage, useField } from 'formik';

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}


export const MySelect2 = ( { label, ...props }: Props ) => {

    const [ field ] = useField(props)

    return (
        <>
            {/* <label htmlFor={ props.id || props.name }>{ label }</label> */}
            <select className='form-select' { ...field } { ...props } />
            <ErrorMessage className='text-danger' name={ props.name } component="span" />
        </>
    )
}

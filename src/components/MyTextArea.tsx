import { ErrorMessage, useField } from 'formik';
interface Props {
    label: string;
    name: string;
    //type?: 'text' | 'email' | 'password'|'number';
    placeholder?: string;
    [x: string]: any;
}

const MyTextArea = ({ label, ...props }: Props) => {
    const [ field ] = useField(props)
  return (
    <>
    <textarea className='form-control' style={{height:'100px'}}  { ...field } { ...props } />
    <ErrorMessage className='text-danger' name={ props.name } component="span" />
    </>
  )
}

export default MyTextArea
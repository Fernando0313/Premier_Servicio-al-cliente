import { Form, Formik } from 'formik';
import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { MyTextInput } from '../components';
import MyTextArea from '../components/MyTextArea';
import RadioButton from '../components/RadioButton';
import { Cliente } from '../models';
import { getInfoToken } from '../services/reclamo.service';




const initialValues = {
confirmacion:'',
descripcion:'',
}

const Confirmacion = () => {

    const [cliente, setCliente] = React.useState<Cliente>({
        codReferencia:'',
        nombreApellido:''
    })

    const [searchParams] = useSearchParams();
    const token =searchParams.get('token');

    const getCliente = async ()=>{
    const data = await  getInfoToken(token).call;

    setCliente(data.data)
    }
    React.useEffect(()=>{
        getCliente();
    },[])

  return (
    <div className='row' style={{marginTop:'-1pc'}}>
    <h1>Confirmacion</h1>
    <h4>Cliente: {cliente.nombreApellido}</h4>
    <h4>Codigo de reclamo: {cliente.codReferencia}</h4>
    <Formik 
    initialValues={initialValues}
    onSubmit={(values)=>{
console.log(values)
    }}
    >
       {(formik)=>(
<Form>

<div className='col-md-12 d-flex justify-content-around mt-4'>   
<RadioButton name={'confirmacion'} label={'Vuelos'}/>
</div>    
<div className='col-md-12 d-flex justify-content-around mt-4'>     
        
<div className='col-md-4 d-flex flex-column mb-4'>
                        <MyTextArea
                          label="Descripcion"
                          name="descripcion" 
                          placeholder="Comentario"
                          type='string'
                          //maxlength='13'
                        />
</div>      


                        </div>
                        <button className="w-25" type="submit">
              Submit
            </button>

</Form>
        
       )

       } 

    </Formik>


    </div>
  )
}

export default Confirmacion
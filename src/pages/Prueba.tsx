import React, { useEffect, useState } from 'react'
// import dotenv from 'dotenv'
import {loadEnv} from 'vite'
// dotenv.config()
const Prueba = () => {
  
    const [file, setFile] = useState<any>();

    const handleChange =(e:any)=>{
        setFile(e.target.files[0])
    console.log(file)
    }

  return (
    <div>
<input name='file' type="file" onChange={(e)=> {handleChange(e)}}/>

    </div>
  )
}

export default Prueba
import { Form, Formik, Field } from "formik";
import { Form as formR } from "react-bootstrap";
import {
  MyCheckbox,
  MyTextInput,
  MySelect,
  MyTextInputFile,
} from "../components";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Coupon_information, Documento, KiuResponse, Pais, Titulo } from "../models";
import {
  getDocumentos,
  getPaises,
  getTitulosInputs,
  saveArchivo,
  saveReclamosRegistro,
} from "../services/reclamo.service";
import MyTextArea from "../components/MyTextArea";
import info from "../../src/assets/icons/info-circle.svg";
import { MySelect2 } from "../components/MySelect2";
import MyRadioButton from "../components/MyRadioButton";
import Swal from "sweetalert2";
interface Props {
  datos: any;
  pir?: string;
  pirFecha?: Date;
  kiuResponse: KiuResponse;
  setRegistro:any

}

const initialValues: Titulo[] = [
  {
    idReclamoMotivo: 0,
    idTitulo: 0,
    tooltip:
      "Recuerda completar el motivo de tu reclamacion para poder continuar",
    nombre: "Motivo de la Reclamación",
    orden: 0,
    tituloInput: [
      {
        alto: "",
        ancho: "",
        placeholder: "Tipo de reclamacion",
        grid: "",
        idTituloInput: 0,
        name: "reclamacionId",
        type: "input",
        value: "",
        orden: 0,
        validacion: [
        ],
      },
    ],
  },

  {
    idReclamoMotivo: 0,
    idTitulo: 0,
    tooltip:
      "Recuerda completar el motivo de tu reclamacion para poder continuar",
    nombre: "Datos de la reserva",
    orden: 0,
    tituloInput: [
      {
        alto: "",
        ancho: "",
        placeholder: "Nombres",
        grid: "",
        idTituloInput: 0,
        name: "paxNombres",
        type: "input",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Apellidos",
        grid: "",
        idTituloInput: 0,
        name: "paxApellidos",
        type: "input",
        value: "",
        orden: 1,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Telefono",
        grid: "",
        idTituloInput: 0,
        name: "paxTelefono",
        type: "number",
        value: "",
        orden: 2,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Correo",
        grid: "",
        idTituloInput: 0,
        name: "paxCorreo",
        type: "email",
        value: "",
        orden: 3,
        validacion: [
          {
            idValidacion: 1,
            type: "email",
            value: 1,
          },
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Numero Premier Plus",
        grid: "",
        idTituloInput: 0,
        name: "paxNumeroPremier",
        type: "number",
        value: "",
        orden: 4,
        validacion: [
          
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Pais de Residencia",
        grid: "",
        idTituloInput: 0,
        name: "idPais",
        type: "select",
        value: "",
        orden: 5,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Tipo de documento",
        grid: "",
        idTituloInput: 0,
        name: "idDocumento",
        type: "select",
        value: "",
        orden: 6,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Número de documento",
        grid: "",
        idTituloInput: 0,
        name: "paxNumeroDocumento",
        type: "input",
        value: "",
        orden: 7,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
    ],
  },
  {
    idReclamoMotivo: 0,
    idTitulo: 0,
    tooltip: "Recuerda solo se permite seleccionar un vuelo",
    nombre: "Datos del vuelo",
    orden: 0,
    tituloInput: [
      {
        alto: "",
        ancho: "",
        placeholder: "vuelo 1",
        grid: "",
        idTituloInput: 0,
        name: "vuelo1",
        type: "checkbox",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
    ],
  },

  {
    idReclamoMotivo: 0,
    idTitulo: 0,
    tooltip:
      "Indícanos los datos de la persona de contacto a la que le proporcionaremos la resolucion de la reclamación",
    nombre: "Datos de contacto",
    orden: 0,
    tituloInput: [
      {
        alto: "",
        ancho: "",
        placeholder: "Nombre",
        grid: "",
        idTituloInput: 0,
        name: "contNombres",
        type: "input",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Apellidos",
        grid: "",
        idTituloInput: 0,
        name: "contApellidos",
        type: "input",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Telefono",
        grid: "",
        idTituloInput: 0,
        name: "contTelefono",
        type: "number",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
      {
        alto: "",
        ancho: "",
        placeholder: "Correo",
        grid: "",
        idTituloInput: 0,
        name: "contCorreo",
        type: "email",
        value: "",
        orden: 0,
        validacion: [
          {
            idValidacion: 1,
            type: "email",
            value: 1,
          },
          {
            idValidacion: 0,
            type: "required",
            value: 1,
          },
        ],
      },
    ],
  },
];

const Registro = ({ datos, kiuResponse,setRegistro }: Props) => {
  

  const [titulosInputs, setTitulosInputs] = useState<Titulo[]>();
  const _initialValues: { [key: string]: any } = {};
  const requiredFields: { [key: string]: any } = {};
  const [validationSchema, setvalidationSchema] = useState<{
    [x: string]: any;
  }>();
  const [documentos, setDocumentos] = useState<Documento[]>();
  const [paises,setPaises]= useState<Pais[]>();
  const [archivo, setArchivo] = useState<File>();
  const [file, setFile] = useState<any>();
  const [cupon, setCupon] = useState<Coupon_information[]>();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  function handleChange(e: any) {
    setFile(e.target.files[0]);
    console.log(file);
  }

  const Cupones = () => {
    const cuponInfo: Array<Coupon_information> = Object.values(
      kiuResponse.coupon_information
    );
    setCupon(cuponInfo);
  };
  const getTitulos = async () => {
    const data = await getTitulosInputs(
      datos?.idReclamo,
      datos?.idMotivo
    ).call.then((response) => {
      const resInitialValues = initialValues.concat(response.data);
      return resInitialValues;
    });
     validaciones(data);
     setTitulosInputs(data);
  };
  const getDocumentoAndPais = async () => {
    await getDocumentos().call.then((res) => setDocumentos(res.data));
    await getPaises().call.then((res) => setPaises(res.data));
  };

  const validaciones = (data: Titulo[]) => {
    for (const titulo of data) {
      for (const input of titulo.tituloInput) {
        _initialValues[input.name] = input.value;
        if (input.validacion.length < 0) continue;
        let schema = Yup.string();
        let schemaBool = Yup.object();
        for (const rule of input.validacion) {
          if (rule.type === "required") {
            schema = schema.required("Este campo es requerido");
          }

          if (rule.type === "minLength") {
            schema = schema.min(
              (rule as any).value || 2,
              `Mínimo de ${(rule as any).value || 2} caracteres`
            );
          }
          if (rule.type === "email") {
            schema = schema.email(`Revise el formato del email`);
          }
          if (input.type === "checkbox" && rule.type === "required") {
            //schema = schema.oneOf(["true"], "Debe de aceptar las condiciones");
            schema=schema.required('Required')
            //schemaBool = Yup.boolean().required().oneOf([0 , 1])
            // requiredFields[input.name] = schemaBool;
          }

          // ... otras reglas
        }
        requiredFields[input.name] = schema;

        // console.log(requiredFields);
      }

      // validationSchema = Yup.object({ ...requiredFields });
      setvalidationSchema(Yup.object({ ...requiredFields }));

      // console.log(validationSchema);
    }

    // setLoad(true)
  };

  useEffect(() => {
    getTitulos();
    getDocumentoAndPais();
    Cupones();
  }, []);

  return (
    <Formik
      initialValues={_initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
       
        values["idReclamoMotivo"] = datos.idReclamoMotivo;
        values["codigoReserva"] = datos.codigoReserva;
        values["numeroBillete"] = "" + datos.numeroBillete;
        values["idReclamoMotivo"] = datos.idReclamoMotivo;
        const arrVuelo = values.vuelo1.split('_')

        values["origen"]= arrVuelo[0]
        values["destino"]= arrVuelo[1]
        values["fechaVuelo"]=arrVuelo[2]
        values["numeroVuelo"]= arrVuelo[3]
       
        Object.entries(values).map(([key, value]) =>values[key]= value.toString());
        
        if (values["rutaArchivo"]) {
          let data = new FormData();
          data.append("archivoFile", file);

          saveArchivo(data).call.then((res) => {
            values["idArchivo"] = res.data.idArchivo;
            saveReclamosRegistro(values).call.then(res=> { 
              
              Toast.fire({
                icon: 'success',
                title: "Reclamo registrado, codigo:"+res.data
              })
              setRegistro(true)
          })
          });
        } else {
          saveReclamosRegistro(values).call.then(res=> { 
            Toast.fire({
              icon: 'success',
              title: "Reclamo registrado, codigo:"+res.data
            })
            setRegistro(true)
        });
          
        }

       
      }}
    >
      {(formik) => (
        <Form noValidate className="d-flex flex-column">
          <div className="row">
            {titulosInputs?.map(({ nombre, tooltip, tituloInput }) => (
              <div className="row">
                <div className="col-md-12 d-flex align-items-center">
                  <h2 className="text-start me-2">{nombre} </h2>
                  <OverlayTrigger
                    key="bottom"
                    placement="bottom"
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>{tooltip}.</Tooltip>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-info-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </OverlayTrigger>
                </div>
                <div className="row">
                  {tituloInput.map(({ name, value, type, placeholder }) => {
                    if(name==="reclamacionId"){
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextInput
                            label="Codigo de Reserva"
                            name={name}
                            value={datos.reclamo}
                            placeholder={placeholder}
                            type={type as any}
                            disabled={true}
                          />
                        </div>
                      );
                    }
                    else if(name==='paxNombres'){
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextInput
                            label="Codigo de Reserva"
                            name={name}
                            value={kiuResponse.passenger_information.name}
                            placeholder={placeholder}
                            type={type as any}
                            disabled={true}
                          />
                        </div>
                      );
                    }
                    else if(name==='paxApellidos'){
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextInput
                            label="Codigo de Reserva"
                            name={name}
                            value={kiuResponse.passenger_information.surname}
                            placeholder={placeholder}
                            type={type as any}
                            disabled={true}
                          />
                        </div>
                      );
                    }

                    else if (
                      type === "input" ||
                      type === "password" ||
                      type === "email" ||
                      type === "number"
                    ) {
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextInput
                            label="Codigo de Reserva"
                            name={name}
                            placeholder={placeholder}
                            type={type as any}
                          />
                        </div>
                      );
                    } else if (type === "select"&& name==='idDocumento') {
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MySelect2 label="" name={name}>
                            <option value="">Documento</option>
                            {documentos?.map(({ idDocumento, nombre }) => (
                              <option value={idDocumento}>{nombre}</option>
                            ))}
                          </MySelect2>
                        </div>
                      );
                    }else if (type === "select"&&name==='idPais') {
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MySelect2 label="" name={name}>
                            <option value="">Pais de Residencia</option>
                            {paises?.map(({ idPais, descripcion }) => (
                              <option value={idPais}>{descripcion}</option>
                            ))}
                          </MySelect2>
                        </div>
                      );
                    }
                     else if (type === "textArea") {
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextArea
                            label="Codigo de Reserva"
                            name={name}
                            placeholder={placeholder}
                            type={type as any}
                          />
                        </div>
                      );
                     } else if (type === "file") {
                      return (
                        <div className="col-md-6 mb-3 text-start">
                          <MyTextInputFile
                            label="Codigo de Reserva"
                            name={name}
                            placeholder={placeholder}
                            type={type as any}
                            setArchivo={setArchivo}
                            handleChange={handleChange}
                          />
                        </div>
                      );
                       } else if (type === "checkbox") {
                        return( <MyRadioButton cupon={cupon} name={name} label={'Vuelos'} />
                        )
                      
                      }
                    // throw new Error(`El type: ${type}, no es soportado`);
                  })} 
                </div>
              </div>
            ))}

<button className="w-25" type="submit" >
              Cancelar
            </button>

            <button className="w-25" type="submit">
              Enviar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Registro;

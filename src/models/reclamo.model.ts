export interface Reclamo {
    idReclamo: number;
    nombre: string;
    descripcion: string;
  }
  
  export interface Motivo{
       idReclamoMotivo: number,
       nombre:string,
       idReclamo: number,
       idMotivo: number
  }

  export interface Titulo{
    idTitulo:number
    idReclamoMotivo:number
    nombre:string
    tooltip:string
    orden:number
    tituloInput: TituloInput[]

  }
  
  export interface TituloInput{

    idTituloInput:number
    value: string
    name: string
    placeholder: string
    type: string
    alto: string
    ancho: string
    grid: string
    orden:number
    validacion: Validacion[]
  }

  export interface Validacion{
    idValidacion: number
    type:string
    value:number
  }

  export interface ReclamoMotivo{
    reclamoMotivo: _ReclamoMotivo
    reclamo: _Reclamo
    motivo: _Motivo

  }
  interface _ReclamoMotivo{
    idReclamoMotivo:number,
    idReclamo:number,
    idMotivo :number,


  }

interface _Reclamo{
  idReclamo:number
  nombre:string
  descripcion:string
}
interface _Motivo{
  idMotivo:number
  nombre: string
}


  export interface Documento{
    idDocumento: number
    nombre: string
    descripcion: string
  }

  export interface ReservaBillete{
    reserva:string
    boleto:string
  }
//Kiu--
  interface Booking_reference_id{
    entity_type:string
    id:string,
    system_code:string
  }
  interface Form_of_identification{
    id:string
    type: string
  }

  interface Passenger_information{
    date_of_birt:string
    name:string
    passenger_type:string
    passenger_type_code:string
    surname:string
  }

  
  export interface KiuResponse{
    booking_reference_id:Booking_reference_id
    form_of_identification:Form_of_identification
    passenger_information:Passenger_information
    coupon_information: any
  }

  //cupon-information

  export interface Coupon_information{
    origin_airport_reference_id:string
    destination_airport_reference_id:string
    flight_departure_date:string
    flight_number:string
    flight_coupon:string

  }
  export interface Pais{
    idPais: string
    descripcion: string
    codigoAlpha: string
    estado: string 
    codTelInt: string
    prescencia: boolean
  }
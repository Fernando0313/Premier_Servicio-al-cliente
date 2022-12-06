export interface and{
    'PNR.tickets.ticket.ticket_number':string
    'PNR.record_locator':string
}

export interface Root {
    $and: And[]
  }
  
  export interface And {
    "PNR.tickets.ticket.ticket_number": string
    "PNR.record_locator": string
  }
  
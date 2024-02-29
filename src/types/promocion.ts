import { ejemplar } from './ejemplar'

export type promocion = {
    fechaFin: string
    fechaInicio: string
    idPromocionDescuento: string
    ejemplares: ejemplar[]
    nombrePromocion: string
    porcentaje: number
}

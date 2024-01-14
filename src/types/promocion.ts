import { libro } from './libro'

export type promocion = {
    fechaFin: string
    fechaInicio: string
    idPromocionDescuento: string
    libros: libro[]
    nombrePromocion: string
    porcentaje: number
}

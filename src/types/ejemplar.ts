import { libro } from './libro'

export type ejemplar = {
    isbn: number
    precio: number
    stock: number
    paginas: number
    dimensiones: string
    promociones: {
        promocionDescuento: {
            porcentaje: number
            fechaFin: Date
            fechaInicio: Date
        }
    }[]
    editorial: {
        nombreEditorial: string
    }
    encuadernado: {
        tipo: string
    }
    libro: libro
}

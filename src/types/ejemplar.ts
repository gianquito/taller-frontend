import { libro } from './libro'

export type ejemplar = {
    isbn: string
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
        idEditorial: number
        nombreEditorial: string
    }
    encuadernado: {
        idEncuadernado: number
        tipo: string
    }
    libro: libro
}

export type pedido = {
    idPedido: number
    total: number
    totalConDescuento: number
    fecha: string
    usuario: {
        email: string
    }
    direccion?: {
        calle: string
        numero: number
        ciudad: {
            cp: number
            nombreCiudad: string
        }
    }
    lineasPedido: {
        precio: number
        cantidad: number
        ejemplar: {
            isbn: number
            libro: {
                titulo: string
            }
        }
    }[]
}

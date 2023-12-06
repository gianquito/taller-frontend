export type libro = {
    isbn: number
    titulo: string
    precio: number
    imagen: string
    stock: number
    descripcion: string
    dimensiones: string
    paginas: number
    usuariosFavoritos: {
        idUsuario: string
    }[]
    editoriales: {
        editorial: {
            nombreEditorial: string
        }
    }[]
    encuadernados: {
        encuadernado: {
            tipo: string
        }
    }[]
    generos: {
        genero: {
            nombreGenero: string
        }
    }[]
    promociones: {
        promocionDescuento: {
            porcentaje: number
            fechaFin: string
            fechaInicio: string
        }
    }[]
    usuariosDeseados: {
        idUsuario: string
    }[]
    autores: {
        autor: {
            nombreAutor: string
        }
    }[]
}

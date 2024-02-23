import { ejemplar } from './ejemplar'

export type libro = {
    idLibro: number
    titulo: string
    imagen: string
    descripcion: string
    ejemplares: ejemplar[]
    usuariosFavoritos: {
        idUsuario: string
    }[]
    generos: {
        genero: {
            nombreGenero: string
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
    resenias: {
        valoracion: number
    }[]
}

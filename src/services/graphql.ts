import { userType } from '@/types/user'
import { getCookie } from '@/utils'

export const getUser = async (id_session: string): Promise<userType | undefined> => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{ sesiones(idSesion:"${id_session}"){ usuario{ idUsuario, nombre, apellido, email, imagen, rol, idCarrito} }}`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await request.json()
    if (!data.data.sesiones[0]) return undefined
    return data.data.sesiones[0].usuario
}

export const getProducts = async () => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{
                libros {
                  isbn,
                  titulo,
                  precio,
                  imagen,
                  stock,
                  autores{
                    autor{
                      nombreAutor
                    }
                  }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const products = await request.json()
    if (products.errors) throw 'Error in request'
    return products.data.libros
}

export const getProduct = async (isbn: number) => {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{
                libros(isbn: ${isbn}) {
                  isbn,
                  titulo,
                  precio,
                  imagen,
                  stock,
                  descripcion,
                  dimensiones,
                  paginas,
                  usuariosFavoritos{
                    idUsuario
                  },
                  editoriales{
                    editorial{
                      nombreEditorial
                    }
                  },
                  encuadernados{
                    encuadernado{
                      tipo
                    }
                  },
                  generos{
                    genero{
                      nombreGenero
                    }
                  },
                  promociones{
                    promocionDescuento{
                      porcentaje
                    }
                  },
                  usuariosDeseados{
                    idUsuario
                  },
                  autores{
                    autor{
                      nombreAutor
                    }
                  }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const products = await request.json()
    if (products.errors) throw 'Error in request'
    return products.data.libros[0]
}

export const deleteFavorite = async (isbn: number, id_usuario: string) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
                deleteFavoritoLibro(idLibro: ${isbn}, idUsuario: "${id_usuario}"){
                      favoritoLibro{
                      idLibro
                    }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const data = await response.json()
    if (data.errors) throw 'Error in request'
    return data.data
}

export const addFavorite = async (isbn: number, id_usuario: string) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
                createFavoritoLibro(idLibro: ${isbn}, idUsuario:"${id_usuario}"){
                  favoritoLibro{
                    idLibro
                  }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const data = await response.json()
    if (data.errors) throw 'Error in request'
    return data.data
}

export const deleteWishlisted = async (isbn: number, id_usuario: string) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
                deleteDeseoLibro(idLibro: ${isbn}, idUsuario: "${id_usuario}"){
                      deseoLibro{
                        idLibro
                      }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const data = await response.json()
    if (data.errors) throw 'Error in request'
    return data.data
}

export const addWishlisted = async (isbn: number, id_usuario: string) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
                createDeseoLibro(idLibro: ${isbn}, idUsuario:"${id_usuario}"){
                  deseoLibro{
                    idLibro
                  }
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const data = await response.json()
    if (data.errors) throw 'Error in request'
    return data.data
}

export const getProductsInCart = async (id_carrito: number) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              librosEnCarrito(idCarrito: ${id_carrito}){
                cantidad,
                libro{
                  isbn,
                  titulo,
                  precio,
                  stock,
                  imagen,
                  autores{
                    autor{
                      nombreAutor
                    }
                  },
                }
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const products = await response.json()
    if (products.errors) throw 'Error in request'
    return products.data.librosEnCarrito
}

export const addProductToCart = async (id_producto: number, id_carrito: number, amount = 1, exact = false) => {
    const libros = await getProductsInCart(id_carrito)
    const productInCart = libros.find((prod: any) => prod.libro.isbn == id_producto)
    if (productInCart) {
        const res = await fetch('http://127.0.0.1:5000/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{updateLineaCarrito(idCarrito: ${id_carrito}, idLibro: ${id_producto}, cantidad: ${
                    exact ? amount : productInCart.cantidad + amount
                }){ lineaCarrito{ cantidad } }}`,
            }),
            headers: {
                'Content-Type': 'application/json',
                sesionId: getCookie('sesionId') ?? '',
            },
        })

        const data = await res.json()
        if (data.errors) throw 'Error in request'
        return data.data
    } else {
        const res = await fetch('http://127.0.0.1:5000/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{createLineaCarrito(idLibro: ${id_producto}, idCarrito: ${id_carrito}, cantidad: ${amount}){ lineaCarrito{ cantidad } }}`,
            }),
            headers: {
                'Content-Type': 'application/json',
                sesionId: getCookie('sesionId') ?? '',
            },
        })
        const data = await res.json()
        if (data.errors) throw 'Error in request'
        return data.data
    }
}

export const deleteProductFromCart = async (id_carrito: number, id_producto: number) => {
    const response = await fetch('http://127.0.0.1:5000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteLineaCarrito(idLibro: ${id_producto}, idCarrito: ${id_carrito}){
              lineaCarrito{
                cantidad
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const products = await response.json()
    if (products.errors) throw 'Error in request'
    return products.data
}

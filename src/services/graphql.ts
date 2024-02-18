import { libro } from '@/types/libro'
import { userType } from '@/types/user'
import { SERVER_URL, getCookie } from '@/utils'

export const getUserBySesion = async (id_session: string): Promise<userType | undefined> => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
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

export const getUserById = async (id_usuario: string) => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              usuarios(idUsuario: "${id_usuario}"){
                nombre
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await request.json()
    if (!data.data.usuarios[0]) return undefined
    return data.data.usuarios[0]
}

export const getUsers = async () => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            usuarios{
              idUsuario
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await request.json()
    if (data.errors) throw 'Error in request'
    return data.data.usuarios
}

export const updateUser = async (
    id_usuario: string,
    nombre: string,
    apellido: string,
    email: string
): Promise<userType | undefined> => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            updateUsuario(idUsuario: "${id_usuario}",nombre:"${nombre}",apellido: "${apellido}",email:"${email}"){
              usuario{
                idUsuario
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await request.json()
    if (data.errors) throw 'Error in request'
    return data.data
}

export const getProducts = async (): Promise<libro[]> => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
                libros {
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
                      porcentaje,
                      fechaFin,
                      fechaInicio
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
    return products.data.libros
}

export const getProduct = async (isbn: number): Promise<libro> => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
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
                      porcentaje,
                      fechaFin,
                      fechaInicio
                    }
                  },
                  usuariosDeseados{
                    idUsuario
                  },
                  autores{
                    autor{
                      nombreAutor
                    }
                  },
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio
                    }
                  },
                  resenias{
                    valoracion
                  },
                }
              }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const products = await request.json()
    if (products.errors) throw 'Error in request ' + JSON.stringify(products.errors)
    return products.data.libros[0]
}

export const getProductsByName = async (nombre: string): Promise<libro[]> => {
    if (!nombre) {
        nombre = ''
    }
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              libros(titulo: "${nombre}") {
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
                      porcentaje,
                      fechaFin,
                      fechaInicio
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
    return products.data.libros
}

export const deleteFavorite = async (isbn: number, id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
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
    const response = await fetch(`${SERVER_URL}/graphql`, {
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
    const response = await fetch(`${SERVER_URL}/graphql`, {
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
    const response = await fetch(`${SERVER_URL}/graphql`, {
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
    const response = await fetch(`${SERVER_URL}/graphql`, {
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
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio
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
        const res = await fetch(`${SERVER_URL}/graphql`, {
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
        const res = await fetch(`${SERVER_URL}/graphql`, {
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
    const response = await fetch(`${SERVER_URL}/graphql`, {
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

export const getDirecciones = async (id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            direcciones(idUsuario:"${id_usuario}"){
              idDireccion,
              calle,
              numero,
              cpCiudad,
              ciudad{
                nombreCiudad
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const direcciones = await response.json()
    if (direcciones.errors) throw 'Error in request'
    return direcciones.data.direcciones
}

export const addDireccion = async (id_usuario: string, calle: string, numero: number, cp: number, ciudad: string) => {
    const dbCiudades: any[] = await getCiudad('')
    if (!dbCiudades.find(dbCiudad => dbCiudad.nombreCiudad === ciudad)) {
        await addCiudad(ciudad, cp)
    }
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createDireccion(calle:"${calle}", numero: ${numero}, cpCiudad: ${cp}, idUsuario: "${id_usuario}"){
              direccion{
                idDireccion
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const direcciones = await response.json()
    if (direcciones.errors) throw 'Error in request'
    return direcciones.data.direcciones
}

export const getDireccion = async (id_usuario: string, id_direccion: number) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
          direcciones(idUsuario:"${id_usuario}", idDireccion: ${id_direccion}){
            idDireccion,
            calle,
            numero,
            cpCiudad,
            ciudad{
              nombreCiudad
            }
          }
        }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const direcciones = await response.json()
    if (direcciones.errors) throw 'Error in request'
    return direcciones.data.direcciones[0]
}

export const updateDireccion = async (
    id_usuario: string,
    id_direccion: number,
    calle: string,
    numero: number,
    cp: number,
    ciudad: string
) => {
    const dbCiudades: any[] = await getCiudad('')
    if (!dbCiudades.find(dbCiudad => dbCiudad.nombreCiudad === ciudad)) {
        await addCiudad(ciudad, cp)
    }

    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            updateDireccion(idDireccion: ${id_direccion},calle: "${calle}", numero: ${numero}, cpCiudad: ${cp},idUsuario: "${id_usuario}"){
              direccion{
                idDireccion
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const direccion = await response.json()
    if (direccion.errors) throw 'Error in request'
    return direccion.data
}

export const deleteDireccion = async (id_direccion: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteDireccion(idDireccion: ${id_direccion}){
              direccion{
                idDireccion
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const direccion = await response.json()
    if (direccion.errors) throw 'Error in request'
    return direccion.data
}

export const getCiudad = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            ciudades(nombreCiudad: "${nombre}"){
              nombreCiudad
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const ciudades = await response.json()
    if (ciudades.errors) throw 'Error in request'
    return ciudades.data.ciudades
}

export const addCiudad = async (nombre: string, cp: number) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createCiudad(cp: ${cp}, nombreCiudad: "${nombre}"){
              ciudad{
                cp
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const ciudad = await response.json()
    if (ciudad.errors) throw 'Error in request'
    return ciudad.data
}

export const getPedidos = async () => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            pedidos{
              total
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const pedidos = await response.json()
    if (pedidos.errors) throw 'Error in request'
    return pedidos.data.pedidos
}

export const getProductsSales = async () => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            lineasPedidos{
              idLibro
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const pedidos = await response.json()
    if (pedidos.errors) throw 'Error in request'
    return pedidos.data.lineasPedidos
}

export const getPromociones = async () => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            promocionesDescuento{
              idPromocionDescuento,
              nombrePromocion,
              porcentaje,
              fechaInicio,
              fechaFin,
              libros{
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
    const promocion = await response.json()
    if (promocion.errors) throw 'Error in request'
    return promocion.data.promocionesDescuento
}

export const getPromocionImagen = async () => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            promocionesDescuento{
              imagen
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const promocion = await response.json()
    if (promocion.errors) throw 'Error in request'
    if (!promocion.data.promocionesDescuento.length) return null
    return promocion.data.promocionesDescuento[0].imagen
}

export const getEditoriales = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            editoriales(nombreEditorial: "${nombre}"){
              nombreEditorial,
              idEditorial
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const editoriales = await response.json()
    if (editoriales.errors) throw 'Error in request'
    return editoriales.data.editoriales
}

export const getAutores = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              autores(nombreAutor: "${nombre}"){
                nombreAutor,
                idAutor
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const autores = await response.json()
    if (autores.errors) throw 'Error in request'
    return autores.data.autores
}

export const getGeneros = async (nombre = '') => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            generos(nombreGenero: "${nombre}"){
              nombreGenero,
              idGenero
            }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const generos = await response.json()
    if (generos.errors) throw 'Error in request'
    return generos.data.generos
}

export const getEncuadernados = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            encuadernados(tipo: "${nombre}"){
              tipo,
              idEncuadernado
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const encuadernados = await response.json()
    if (encuadernados.errors) throw 'Error in request'
    return encuadernados.data.encuadernados
}

export const addAutor = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createAutor(nombreAutor: "${nombre}"){
              autor{
                idAutor
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const autor = await response.json()
    if (autor.errors) throw 'Error in request'
    return autor.data
}

export const addEditorial = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              createEditorial(nombreEditorial: "${nombre}"){
                editorial{
                  idEditorial
                }
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const editorial = await response.json()
    if (editorial.errors) throw 'Error in request'
    return editorial.data
}

export const addGenero = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createGenero(nombreGenero:"${nombre}"){
              genero{
                idGenero
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const genero = await response.json()
    if (genero.errors) throw 'Error in request'
    return genero.data
}

export const addEncuadernado = async (nombre: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createEncuadernado(tipo: "${nombre}"){
              encuadernado{
                idEncuadernado
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const encuadernado = await response.json()
    if (encuadernado.errors) throw 'Error in request'
    return encuadernado.data
}

export const addLibroAutor = async (id_autor: number, id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createLibroAutor(idAutor: ${id_autor}, idLibro: ${id_libro}){
              libroAutor{
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
}

export const addLibroGenero = async (id_genero: number, id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createLibroGenero(idGenero: ${id_genero}, idLibro: ${id_libro}){
              libroGenero{
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
}

export const addLibroEditorial = async (id_editorial: number, id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createLibroEditorial(idEditorial: ${id_editorial}, idLibro: ${id_libro}){
              libroEditorial{
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
}

export const addLibroEncuadernado = async (id_encuadernado: number, id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createLibroEncuadernado(idEncuadernado: ${id_encuadernado}, idLibro: ${id_libro}){
              libroEncuadernado{
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
}

export const deleteLibroAutores = async (id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteLibroAutor(idLibro: ${id_libro}){
              libroAutor{
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
}

export const deleteLibroGeneros = async (id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
          deleteLibroGenero(idLibro: ${id_libro}){
            libroGenero{
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
}

export const deleteLibroEditoriales = async (id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
          deleteLibroEditorial(idLibro: ${id_libro}){
            libroEditorial{
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
}

export const deleteLibroEncuadernados = async (id_libro: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
          deleteLibroEncuadernado(idLibro: ${id_libro}){
            libroEncuadernado{
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
}

export const deleteLibroPromociones = async (id_promocion: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteLibroPromocion(idPromocionDescuento: ${id_promocion}){
              libroPromocion{
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
}

export const addProduct = async (
    autores: string[],
    editoriales: string[],
    generos: string[],
    encuadernados: string[],
    descripcion: string,
    dimensiones: string,
    imagen: string,
    isbn: number,
    paginas: number,
    precio: number,
    stock: number,
    titulo: string
) => {
    const dbAutores = await getAutores('')
    const dbEditoriales = await getEditoriales('')
    const dbGeneros = await getGeneros('')
    const dbEncuadernados = await getEncuadernados('')

    const newAutores = autores.filter(a => !dbAutores.find((dbA: any) => dbA.nombreAutor === a))
    const newEditoriales = editoriales.filter(e => !dbEditoriales.find((dbE: any) => dbE.nombreEditorial === e))
    const newGeneros = generos.filter(g => !dbGeneros.find((dbG: any) => dbG.nombreGenero === g))
    const newEncuadernados = encuadernados.filter(e => !dbEncuadernados.find((dbE: any) => dbE.tipo === e))

    //Crear nuevos autores, editoriales, generos, encuadernados
    newAutores.forEach(a =>
        addAutor(a.trim()).then(created =>
            dbAutores.push({ nombreAutor: a.trim(), idAutor: created.createAutor.autor.idAutor })
        )
    )
    newEditoriales.forEach(e =>
        addEditorial(e.trim()).then(created =>
            dbEditoriales.push({
                nombreEditorial: e.trim(),
                idEditorial: created.createEditorial.editorial.idEditorial,
            })
        )
    )
    newGeneros.forEach(g =>
        addGenero(g.trim()).then(created =>
            dbGeneros.push({ nombreGenero: g.trim(), idGenero: created.createGenero.genero.idGenero })
        )
    )
    newEncuadernados.forEach(e =>
        addEncuadernado(e.trim()).then(created =>
            dbEncuadernados.push({
                tipo: e.trim(),
                idEncuadernado: created.createEncuadernado.encuadernado.idEncuadernado,
            })
        )
    )

    //Crear libro
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              createLibro(descripcion: "${descripcion}", dimensiones: "${dimensiones}", imagen: "${imagen}", isbn: ${isbn}, paginas: ${paginas}, precio: ${precio}, stock: ${stock}, titulo: "${titulo}"){
                libro{
                  isbn
                }
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })

    //Crear lineas
    dbAutores
        .filter((dbA: any) => autores.find(a => a.trim() === dbA.nombreAutor))
        .forEach((autor: any) => addLibroAutor(autor.idAutor, isbn))
    dbEditoriales
        .filter((dbE: any) => editoriales.find(e => e.trim() === dbE.nombreEditorial))
        .forEach((editorial: any) => addLibroEditorial(editorial.idEditorial, isbn))
    dbGeneros
        .filter((dbG: any) => generos.find(g => g.trim() === dbG.nombreGenero))
        .forEach((genero: any) => addLibroGenero(genero.idGenero, isbn))
    dbEncuadernados
        .filter((dbE: any) => encuadernados.find(e => e.trim() === dbE.tipo))
        .forEach((encuadernado: any) => addLibroEncuadernado(encuadernado.idEncuadernado, isbn))

    const libro = await response.json()
    if (libro.errors) throw 'Error en request'
    return libro.data
}

export const updateProduct = async (
    autores: string[],
    editoriales: string[],
    generos: string[],
    encuadernados: string[],
    descripcion: string,
    dimensiones: string,
    imagen: string,
    isbn: number,
    paginas: number,
    precio: number,
    stock: number,
    titulo: string
) => {
    const dbAutores = await getAutores('')
    const dbEditoriales = await getEditoriales('')
    const dbGeneros = await getGeneros('')
    const dbEncuadernados = await getEncuadernados('')

    const newAutores = autores.filter(a => !dbAutores.find((dbA: any) => dbA.nombreAutor === a.trim()))
    const newEditoriales = editoriales.filter(e => !dbEditoriales.find((dbE: any) => dbE.nombreEditorial === e.trim()))
    const newGeneros = generos.filter(g => !dbGeneros.find((dbG: any) => dbG.nombreGenero === g.trim()))
    const newEncuadernados = encuadernados.filter(e => !dbEncuadernados.find((dbE: any) => dbE.tipo === e.trim()))

    //Crear nuevos autores, editoriales, generos, encuadernados
    newAutores.forEach(a =>
        addAutor(a.trim()).then(created =>
            dbAutores.push({ nombreAutor: a.trim(), idAutor: created.createAutor.autor.idAutor })
        )
    )
    newEditoriales.forEach(e =>
        addEditorial(e.trim()).then(created =>
            dbEditoriales.push({
                nombreEditorial: e.trim(),
                idEditorial: created.createEditorial.editorial.idEditorial,
            })
        )
    )
    newGeneros.forEach(g =>
        addGenero(g.trim()).then(created =>
            dbGeneros.push({ nombreGenero: g.trim(), idGenero: created.createGenero.genero.idGenero })
        )
    )
    newEncuadernados.forEach(e =>
        addEncuadernado(e.trim()).then(created =>
            dbEncuadernados.push({
                tipo: e.trim(),
                idEncuadernado: created.createEncuadernado.encuadernado.idEncuadernado,
            })
        )
    )

    //Crear libro
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            updateLibro(descripcion: "${descripcion}", dimensiones: "${dimensiones}", imagen: "${imagen}", isbn: ${isbn}, paginas: ${paginas}, precio: ${precio}, stock: ${stock}, titulo: "${titulo}"){
              libro{
                isbn
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })

    //borrar todas las lineas??

    await deleteLibroAutores(isbn)
    await deleteLibroGeneros(isbn)
    await deleteLibroEditoriales(isbn)
    await deleteLibroEncuadernados(isbn)

    dbAutores
        .filter((dbA: any) => autores.find(a => a.trim() === dbA.nombreAutor))
        .forEach((autor: any) => addLibroAutor(autor.idAutor, isbn))
    dbEditoriales
        .filter((dbE: any) => editoriales.find(e => e.trim() === dbE.nombreEditorial))
        .forEach((editorial: any) => addLibroEditorial(editorial.idEditorial, isbn))
    dbGeneros
        .filter((dbG: any) => generos.find(g => g.trim() === dbG.nombreGenero))
        .forEach((genero: any) => addLibroGenero(genero.idGenero, isbn))
    dbEncuadernados
        .filter((dbE: any) => encuadernados.find(e => e.trim() === dbE.tipo))
        .forEach((encuadernado: any) => addLibroEncuadernado(encuadernado.idEncuadernado, isbn))

    const libro = await response.json()
    if (libro.errors) throw 'Error en request'
    return libro.data
}

export const addLibroPromocion = async (id_libro: number, id_promocion: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createLibroPromocion(idLibro: ${id_libro}, idPromocionDescuento: ${id_promocion}){
              libroPromocion{
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
}

export const addPromocion = async (
    nombre: string,
    porcentaje: number,
    imagen: string,
    fechaFin: string,
    fechaInicio: string,
    libros: string[]
) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              createPromocionDescuento(fechaFin: "${fechaFin}", fechaInicio: "${fechaInicio}",imagen: "${imagen}", nombrePromocion: "${nombre}", porcentaje: ${porcentaje}){
               promocionDescuento{
                 idPromocionDescuento
               }
             }
           }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const promocion = await response.json()
    if (promocion.errors) throw 'Error in request'

    const dbLibros = await getProducts()
    dbLibros
        .filter((dbL: any) => libros.find(l => dbL.titulo === l.trim()))
        .forEach((dbL: any) =>
            addLibroPromocion(dbL.isbn, promocion.data.createPromocionDescuento.promocionDescuento.idPromocionDescuento)
        )

    return promocion.data
}

export const getPromocion = async (id_promocion: number) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            promocionesDescuento(idPromocionDescuento: ${id_promocion}){
              idPromocionDescuento,
              nombrePromocion,
              porcentaje,
              fechaFin,
              fechaInicio,
              imagen,
              libros{
                libro{
                  titulo
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
    const promocion = await response.json()
    if (promocion.errors) throw 'Error in request'
    return promocion.data.promocionesDescuento[0]
}

export const updatePromocion = async (
    nombre: string,
    porcentaje: number,
    imagen: string,
    fechaFin: string,
    fechaInicio: string,
    libros: string[],
    id_promocion: number
) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            updatePromocionDescuento(idPromocionDescuento: ${id_promocion},fechaFin: "${fechaFin}", fechaInicio: "${fechaInicio}",imagen: "${imagen}", nombrePromocion: "${nombre}", porcentaje: ${porcentaje}){
             promocionDescuento{
               idPromocionDescuento
             }
           }
         }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: getCookie('sesionId') ?? '',
        },
    })
    const promocion = await response.json()
    if (promocion.errors) throw 'Error in request'

    await deleteLibroPromociones(id_promocion)

    const dbLibros = await getProducts()
    dbLibros
        .filter((dbL: any) => libros.find(l => dbL.titulo === l))
        .forEach((dbL: any) => addLibroPromocion(dbL.isbn, id_promocion))

    return promocion.data
}

export const getFavoritos = async (id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              favoritosLibro(idUsuario: "${id_usuario}"){
                libro{
                  isbn,
                  titulo,
                  precio,
                  imagen,
                  autores{
                    autor{
                      nombreAutor
                    }
                  },
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio
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
    const favoritos = await response.json()
    if (favoritos.errors) throw 'Error in request'
    return favoritos.data.favoritosLibro
}

export const addPedido = async (envio: number, id_usuario: string, total: number) => {
    const fecha = new Date().toISOString()
    let id_envio = 2
    if (envio === 0) {
        id_envio = 1
    }
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createPedido(costoEnvio: ${envio},fecha: "${fecha}",idEnvio: ${id_envio},idUsuario:"${id_usuario}",total: ${total}){
              pedido{
                idPedido
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const pedido = await response.json()
    if (pedido.errors) throw pedido.errors
    return pedido.data
}

export const getWishlist = async (id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            deseosLibro(idUsuario:"${id_usuario}"){
              idUsuario
              libro{
                isbn,
                titulo,
                precio,
                imagen,
                autores{
                  autor{
                    nombreAutor
                  }
                },
                promociones{
                  promocionDescuento{
                    porcentaje,
                    fechaFin,
                    fechaInicio
                  }
                },
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const lista_deseos = await response.json()
    if (lista_deseos.errors) throw lista_deseos.errors
    return lista_deseos.data.deseosLibro
}

export const getReviews = async (
    isbn: number
): Promise<
    [[{ texto: string; valoracion: number; usuario: { nombre: string; apellido: string } }], { titulo: string }]
> => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              resenias(idLibro: ${isbn}){
                 texto,
                valoracion,
                usuario{
                  nombre,
                  apellido
                }
              }
              libros(isbn: ${isbn}){
                titulo
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const reviews = await response.json()
    if (reviews.errors) throw reviews.errors
    return [reviews.data.resenias, reviews.data.libros[0]]
}

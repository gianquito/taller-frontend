import { ejemplarForm } from '@/types/ejemplarForm'
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
        cache: 'no-store',
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

export const getUsers = async (id_session: string) => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              usuarios{
                idUsuario,
                email,
                rol
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: id_session ?? '',
        },
    })
    const data = await request.json()
    if (data.errors) throw data.errors[0]
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
            sesionId: getCookie('sesionId') ?? '',
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
                  idLibro,
                  titulo,
                  imagen,
                  descripcion,
                  ejemplares{
                    isbn,
                    precio,
                    stock,
                    paginas,
                    dimensiones,
                    promociones{
                      promocionDescuento{
                        porcentaje,
                        fechaFin,
                        fechaInicio
                      }
                    }
                      editorial{
                        nombreEditorial
                      }
                      encuadernado{
                        tipo
                      }
                  }
                  usuariosFavoritos{
                    idUsuario
                  },
                  generos{
                    genero{
                      nombreGenero
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
        },
    })
    const products = await request.json()
    if (products.errors) throw products.errors[0]
    return products.data.libros
}

export const getProduct = async (idLibro: number): Promise<libro> => {
    const request = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              libros(idLibro: ${idLibro}){
                titulo,
                idLibro,
                imagen,
                descripcion,
                ejemplares{
                  isbn,
                  precio,
                  stock,
                  paginas,
                  dimensiones,
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio,
                    }
                  }
                  editorial{
                    nombreEditorial
                  }
                  encuadernado{
                    tipo
                  }
                }
                generos{
                  genero{
                    nombreGenero
                  }
                }
                autores{
                  autor{
                    nombreAutor
                  }
                }
                usuariosFavoritos{
                  idUsuario
                }
                usuariosDeseados{
                  idUsuario
                }
                resenias{
                  valoracion
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
              libros(titulo: "${nombre}"){
                titulo,
                idLibro,
                imagen,
                ejemplares{
                  isbn,
                  precio,
                  stock,
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio,
                    }
                  }
                }
                generos{
                  genero{
                    nombreGenero
                  }
                }
                autores{
                  autor{
                    nombreAutor
                  }
                }usuariosFavoritos{
                  idUsuario
                }resenias{
                  valoracion
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
    if (products.errors) throw products.errors[0]
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
              ejemplaresEnCarrito(idCarrito: ${id_carrito}){
                cantidad,
                ejemplar{
                  isbn
                  precio
                  stock
                  promociones{
                    promocionDescuento{
                      porcentaje,
                      fechaFin,
                      fechaInicio
                    }
                  },
                  libro{
                    idLibro
                    titulo
                    imagen
                    autores{
                      autor{
                        nombreAutor
                      }
                    }
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
    const products = await response.json()
    if (products.errors) throw products.errors[0]
    return products.data.ejemplaresEnCarrito
}

export const addProductToCart = async (id_ejemplar: number, id_carrito: number, amount = 1, exact = false) => {
    const ejemplares = await getProductsInCart(id_carrito)
    const productInCart = ejemplares.find((prod: any) => prod.ejemplar.isbn == id_ejemplar)
    if (productInCart) {
        const res = await fetch(`${SERVER_URL}/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{updateLineaCarrito(idCarrito: ${id_carrito}, idEjemplar: ${id_ejemplar}, cantidad: ${
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
                query: `mutation{createLineaCarrito(idEjemplar: ${id_ejemplar}, idCarrito: ${id_carrito}, cantidad: ${amount}){ lineaCarrito{ cantidad } }}`,
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

export const deleteProductFromCart = async (id_carrito: number, id_ejemplar: number) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteLineaCarrito(idEjemplar: ${id_ejemplar}, idCarrito: ${id_carrito}){
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

export const getDirecciones = async (id_usuario: string, id_session: string) => {
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
            sesionId: id_session ?? '',
        },
    })
    const direcciones = await response.json()
    if (direcciones.errors) throw direcciones.errors[0]
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

export const getPedidos = async (id_session: string) => {
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
            sesionId: id_session ?? '',
        },
    })
    const pedidos = await response.json()
    if (pedidos.errors) throw 'Error in request'
    return pedidos.data.pedidos
}

export const getPedidosByUser = async (id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              pedidos(idUsuario: "${id_usuario}"){
                lineasPedido{
                  ejemplar{
                    libro{
                      idLibro
                    }
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
    const pedidos = await response.json()
    if (pedidos.errors) throw 'Error in request'
    return pedidos.data.pedidos
}

export const getProductsSales = async (id_session: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              lineasPedidos{
                ejemplar{
                  idLibro
                }
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: id_session ?? '',
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
              ejemplares{
                idEjemplar
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
              fechaInicio
              fechaFin
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
    if (promocion.errors) throw promocion.errors[0]
    if (!promocion.data.promocionesDescuento.length) return null
    return promocion.data.promocionesDescuento
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
    if (generos.errors) throw generos.errors[0]
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
    return editorial.data.createEditorial.editorial
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
    return encuadernado.data.createEncuadernado.encuadernado
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

export const deleteEjemplarPromociones = async (id_promocion: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteEjemplarPromocion(idPromocionDescuento: ${id_promocion}){
              ejemplarPromocion{
                idEjemplar
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

export const getEjemplares = async (): Promise<{ isbn: number }[]> => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            ejemplares{
              isbn
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
    return encuadernado.data.ejemplares
}

export const addProduct = async (
    autores: string[],
    generos: string[],
    descripcion: string,
    imagen: string,
    titulo: string,
    ejemplares: ejemplarForm[]
) => {
    const dbAutores = await getAutores('')
    const dbGeneros = await getGeneros('')

    const newAutores = autores.filter(a => !dbAutores.find((dbA: any) => dbA.nombreAutor === a))
    const newGeneros = generos.filter(g => !dbGeneros.find((dbG: any) => dbG.nombreGenero === g))

    //Crear nuevos autores, editoriales, generos, encuadernados
    newAutores.forEach(a =>
        addAutor(a.trim()).then(created =>
            dbAutores.push({ nombreAutor: a.trim(), idAutor: created.createAutor.autor.idAutor })
        )
    )
    newGeneros.forEach(g =>
        addGenero(g.trim()).then(created =>
            dbGeneros.push({ nombreGenero: g.trim(), idGenero: created.createGenero.genero.idGenero })
        )
    )

    //Crear libro
    const newLibro = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              createLibro(descripcion: "${descripcion}", imagen: "${imagen}", titulo: "${titulo}"){
                libro{
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
    const libro = await newLibro.json()

    //Crear ejemplares
    ejemplares.forEach(async ejemplar => {
        const dbEditoriales = await getEditoriales('')
        const dbEncuadernados = await getEncuadernados('')

        //crear editorial
        let newEditorial = dbEditoriales.find((dbE: any) => dbE.nombreEditorial === ejemplar.editorial)
        //si la editorial no existe se crea
        if (!newEditorial) {
            newEditorial = await addEditorial(ejemplar.editorial)
        }
        //crear encuadernado
        let newEncuadernado = dbEncuadernados.find((dbE: any) => dbE.tipo === ejemplar.encuadernado)
        if (!newEncuadernado) {
            newEncuadernado = await addEncuadernado(ejemplar.encuadernado)
        }

        const newEjemplar = await fetch(`${SERVER_URL}/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                createEjemplar(dimensiones: "${ejemplar.dimensiones}", isbn: ${ejemplar.isbn}, paginas: ${ejemplar.paginas}, precio: ${ejemplar.precio}, stock: ${ejemplar.stock}, idEditorial: ${newEditorial.idEditorial}, idEncuadernado: ${newEncuadernado.idEncuadernado},idLibro: ${libro.data.createLibro.libro.idLibro}){
                  ejemplar{
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
    })

    //Crear lineas
    dbAutores
        .filter((dbA: any) => autores.find(a => a.trim() === dbA.nombreAutor))
        .forEach((autor: any) => addLibroAutor(autor.idAutor, libro.data.createLibro.libro.idLibro))
    dbGeneros
        .filter((dbG: any) => generos.find(g => g.trim() === dbG.nombreGenero))
        .forEach((genero: any) => addLibroGenero(genero.idGenero, libro.data.createLibro.libro.idLibro))

    if (libro.errors) throw 'Error en request'
    return libro.data
}

export const updateProduct = async (
    id_libro: number,
    autores: string[],
    generos: string[],
    descripcion: string,
    imagen: string,
    titulo: string,
    ejemplares: ejemplarForm[]
) => {
    const dbAutores = await getAutores('')
    const dbGeneros = await getGeneros('')

    const newAutores = autores.filter(a => !dbAutores.find((dbA: any) => dbA.nombreAutor === a.trim()))
    const newGeneros = generos.filter(g => !dbGeneros.find((dbG: any) => dbG.nombreGenero === g.trim()))

    //Crear nuevos autores, editoriales, generos, encuadernados
    newAutores.forEach(a =>
        addAutor(a.trim()).then(created =>
            dbAutores.push({ nombreAutor: a.trim(), idAutor: created.createAutor.autor.idAutor })
        )
    )
    newGeneros.forEach(g =>
        addGenero(g.trim()).then(created =>
            dbGeneros.push({ nombreGenero: g.trim(), idGenero: created.createGenero.genero.idGenero })
        )
    )

    //Actualizar libro
    const newLibro = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              updateLibro(idLibro: ${id_libro}, descripcion:"${descripcion}", imagen: "${imagen}", titulo: "${titulo}"){
                libro{
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

    const libro = await newLibro.json()

    const dbEjemplares = await getEjemplares()

    //Actualizar ejemplares
    ejemplares.forEach(async ejemplar => {
        const dbEditoriales = await getEditoriales('')
        const dbEncuadernados = await getEncuadernados('')

        //crear editorial
        let newEditorial = dbEditoriales.find((dbE: any) => dbE.nombreEditorial === ejemplar.editorial)
        //si la editorial no existe se crea
        if (!newEditorial) {
            newEditorial = await addEditorial(ejemplar.editorial)
        }
        //crear encuadernado
        let newEncuadernado = dbEncuadernados.find((dbE: any) => dbE.tipo === ejemplar.encuadernado)
        if (!newEncuadernado) {
            newEncuadernado = await addEncuadernado(ejemplar.encuadernado)
        }

        // | SI EXISTE
        //  -| ACTUALIZARLO

        // | SI NO EXISTE
        //  -| AGREGARLO
        const mutationType = dbEjemplares.find(dbEj => dbEj.isbn === ejemplar.isbn)
            ? 'updateEjemplar'
            : 'createEjemplar'

        const newEjemplar = await fetch(`${SERVER_URL}/graphql`, {
            method: 'POST',
            body: JSON.stringify({
                query: `mutation{
                  ${mutationType}(isbn: ${ejemplar.isbn}, dimensiones: "${ejemplar.dimensiones}", paginas: ${ejemplar.paginas}, precio: ${ejemplar.precio}, stock: ${ejemplar.stock}, idEditorial: ${newEditorial.idEditorial}, idEncuadernado: ${newEncuadernado.idEncuadernado},idLibro: ${libro.data.updateLibro.libro.idLibro}){
                    ejemplar{
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
    })

    await deleteLibroAutores(id_libro)
    await deleteLibroGeneros(id_libro)

    dbAutores
        .filter((dbA: any) => autores.find(a => a.trim() === dbA.nombreAutor))
        .forEach((autor: any) => addLibroAutor(autor.idAutor, id_libro))
    dbGeneros
        .filter((dbG: any) => generos.find(g => g.trim() === dbG.nombreGenero))
        .forEach((genero: any) => addLibroGenero(genero.idGenero, id_libro))

    if (libro.errors) throw 'Error en request'
    return libro.data
}

export const addEjemplarPromocion = async (id_ejemplar: number, id_promocion: number) => {
    await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            createEjemplarPromocion(idEjemplar: ${id_ejemplar}, idPromocionDescuento: ${id_promocion}){
              ejemplarPromocion{
                idEjemplar
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
    ejemplaresIsbn: string[]
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
        .flatMap((dbL: any) => dbL.ejemplares.map((ejemplar: any) => ({ ejemplar })))
        .filter(({ ejemplar }: any) => ejemplaresIsbn.find(l => ejemplar.isbn === l.trim()))
        .forEach(({ ejemplar }: any) =>
            addEjemplarPromocion(
                ejemplar.isbn,
                promocion.data.createPromocionDescuento.promocionDescuento.idPromocionDescuento
            )
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
              ejemplares{
                idEjemplar
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
    ejemplaresIsbn: string[],
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

    await deleteEjemplarPromociones(id_promocion)
    await addEjemplarPromociones(
        ejemplaresIsbn,
        promocion.data.updatePromocionDescuento.promocionDescuento.idPromocionDescuento
    )

    return promocion.data
}

export const addEjemplarPromociones = async (ejemplaresIsbn: string[], id_promocion: number) => {
    const dbLibros = await getProducts()
    const ejemplaresPromocion = dbLibros
        .flatMap((dbL: any) => dbL.ejemplares.map((ejemplar: any) => ({ ejemplar })))
        .filter(({ ejemplar }: any) => ejemplaresIsbn.find(l => ejemplar.isbn === l.trim()))
        .map(({ ejemplar }: any) => ejemplar)

    const addPromises = ejemplaresPromocion.map((ejemplar: any) => addEjemplarPromocion(ejemplar.isbn, id_promocion))

    await Promise.all(addPromises)
}

export const getFavoritos = async (id_usuario: string, id_session?: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              favoritosLibro(idUsuario: "${id_usuario}"){
                libro{
                  ejemplares{
                    isbn,
                    stock,
                    precio,
                    promociones{
                      promocionDescuento{
                        porcentaje,
                        fechaInicio,
                        fechaFin
                      }
                    }
                    
                  }
                  idLibro
                  titulo,
                  imagen,
                  autores{
                    autor{
                      nombreAutor
                    }
                  }
                }
              }
            }`,
        }),
        headers: {
            'Content-Type': 'application/json',
            sesionId: id_session ?? '',
        },
    })
    const favoritos = await response.json()
    if (favoritos.errors) throw favoritos.errors[0]
    return favoritos.data.favoritosLibro
}

export const addPedido = async (
    envio: number,
    id_usuario: string,
    total_con_descuento: number,
    total: number,
    id_direccion: string
) => {
    const fecha = new Date().toISOString()
    let id_envio = 2
    if (envio === 0) {
        id_envio = 1
    }
    const idDireccion = id_direccion == '-1' ? '' : ', idDireccion: ' + parseInt(id_direccion)
    console.log(total_con_descuento)
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
              createPedido(costoEnvio: ${envio}, fecha: "${fecha}", idEnvio: ${id_envio}, idUsuario:"${id_usuario}", total: ${total}, totalConDescuento: ${total_con_descuento} ${idDireccion}){
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
                deseosLibro(idUsuario: "${id_usuario}"){
                  idUsuario
                  libro{
                    ejemplares{
                      isbn,
                      stock,
                      precio,
                      promociones{
                        promocionDescuento{
                          porcentaje,
                          fechaInicio,
                          fechaFin
                        }
                      }
                      
                    }
                    idLibro
                    titulo,
                    imagen,
                    autores{
                      autor{
                        nombreAutor
                      }
                    }
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
    [
        [{ texto: string; valoracion: number; usuario: { idUsuario: string; nombre: string; apellido: string } }],
        { titulo: string },
    ]
> => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
              resenias(idLibro: ${isbn}){
                 texto,
                valoracion,
                usuario{
                  idUsuario,
                  nombre,
                  apellido
                }
              }
              libros(idLibro: ${isbn}){
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

export const addReview = async (isbn: number, id_usuario: string, texto: string, valoracion: number) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation {
            createResenia(idLibro: ${isbn}, idUsuario: "${id_usuario}", texto:"${texto}",valoracion:${valoracion}){
              resenia{
                valoracion
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const review = await response.json()
    if (review.errors) throw review.errors
    return review.data
}

export const getReview = async (id_libro: number, id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `{
            resenias(idUsuario: "${id_usuario}", idLibro: ${id_libro}){
              idUsuario,
              idLibro
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const review = await response.json()
    if (review.errors) throw review.errors
    return review.data.resenias
}

export const deleteReview = async (id_libro: number, id_usuario: string) => {
    const response = await fetch(`${SERVER_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({
            query: `mutation{
            deleteResenia(idLibro: ${id_libro}, idUsuario: "${id_usuario}"){
              resenia{
                idUsuario
              }
            }
          }`,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const review = await response.json()
    if (review.errors) throw review.errors
    return review.data
}

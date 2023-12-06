'use client'
import BlackButton from '@/components/BlackButton'
import { getAutores, getEditoriales, getEncuadernados, getGeneros, getProduct, updateProduct } from '@/services/graphql'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useFilePicker } from 'use-file-picker'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

export default function NuevoLibro({ params }: { params: { id: number } }) {
    const [imagen, setImagen] = useState('')
    const [isbn, setIsbn] = useState<number | undefined>()
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [editorial, setEditorial] = useState('')
    const [paginas, setPaginas] = useState<number | undefined>()
    const [dimensiones, setDimensiones] = useState('')
    const [genero, setGenero] = useState('')
    const [encuadernado, setEncuadernado] = useState('')
    const [precio, setPrecio] = useState<number | undefined>()
    const [stock, setStock] = useState<number | undefined>()
    const [descripcion, setDescripcion] = useState('')

    const [autocompletado, setAutocompletado] = useState<any[]>([])
    const [showAutocompletado, setShowAutocompletado] = useState('')

    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    const ref = useDetectClickOutside({
        onTriggered: () => {
            setShowAutocompletado('')
        },
    })

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    })

    function handleEditorialSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setEditorial(value)
        getEditoriales(value.split(',').at(-1)!).then(editoriales =>
            setAutocompletado(editoriales.map((ed: any) => ({ name: ed.nombreEditorial })))
        )
    }

    function handleAutorSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setAutor(value)
        getAutores(value.split(',').at(-1)!).then(autores =>
            setAutocompletado(autores.map((au: any) => ({ name: au.nombreAutor })))
        )
    }

    function handleGeneroSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setGenero(value)
        getGeneros(value.split(',').at(-1)!).then(generos =>
            setAutocompletado(generos.map((g: any) => ({ name: g.nombreGenero })))
        )
    }

    function handleEncuadernadoSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setEncuadernado(value)
        getEncuadernados(value.split(',').at(-1)!).then(encuadernados =>
            setAutocompletado(encuadernados.map((en: any) => ({ name: en.tipo })))
        )
    }

    useEffect(() => {
        if (isAuthenticated === null) return
        if (isAuthenticated === false || user.rol !== 1) {
            router.push('/')
            return
        }

        getProduct(params.id)
            .then(libro => {
                setImagen(atob(libro.imagen))
                setIsbn(params.id)
                setTitulo(libro.titulo)
                setPaginas(libro.paginas)
                setDimensiones(libro.dimensiones)
                setPrecio(libro.precio)
                setStock(libro.stock)
                setDescripcion(libro.descripcion)
                setAutor(libro.autores.map(({ autor }) => autor.nombreAutor).join(','))
                setEditorial(libro.editoriales.map(({ editorial }) => editorial.nombreEditorial).join(','))
                setGenero(libro.generos.map(({ genero }) => genero.nombreGenero).join(','))
                setEncuadernado(libro.encuadernados.map(({ encuadernado }) => encuadernado.tipo).join(','))
            })
            .catch(() => {
                toast.error('No se puede obtener el libro solicitado')
                router.push('/')
            })
    }, [user, isAuthenticated])

    useEffect(() => {
        setAutocompletado([])
    }, [showAutocompletado])

    useEffect(() => {
        if (!filesContent.length) return
        setImagen(filesContent[0].content)
    }, [filesContent])

    function addLibro() {
        if (
            !isbn ||
            !imagen ||
            !titulo.trim() ||
            !autor.trim() ||
            !editorial.trim() ||
            !paginas ||
            !dimensiones.trim() ||
            !genero.trim() ||
            !encuadernado.trim() ||
            !precio ||
            stock === undefined ||
            !descripcion.trim()
        ) {
            toast.error('Los datos están incompletos')
            return
        }
        updateProduct(
            autor,
            editorial,
            genero,
            encuadernado,
            descripcion,
            dimensiones,
            btoa(imagen),
            isbn,
            paginas,
            precio,
            stock,
            titulo
        )
            .then(() => toast.success(`Se actualizó el libro ${titulo}`))
            .catch(() => toast.error('Error al actualizar libro'))
    }

    if (!isAuthenticated || user.rol !== 1) return null
    return (
        <div className="my-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="w-max">
                <p className=" text-center text-2xl font-semibold">Imagen</p>
                {imagen ? (
                    <img className="w-[240px] lg:w-[350px]" src={imagen} />
                ) : (
                    <div className="h-[400px] w-[240px] bg-neutral-300 md:h-[550px] lg:w-[350px]"></div>
                )}
                <button className="float-right text-lg underline" onClick={openFilePicker}>
                    Cargar imagen
                </button>
            </div>
            <div className="flex w-96 flex-col md:w-[450px]">
                <p className="mb-3 text-center text-2xl font-semibold">Información del producto</p>
                <label className="text-sm">ISBN</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="ISBN"
                    value={isbn}
                    type="number"
                    onChange={e => setIsbn(Number(e.target.value))}
                />
                <label className="text-sm">Título</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Título"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
                <label className="text-sm">Autores</label>
                <div ref={ref}>
                    <input
                        className="mb-3 w-full border border-black px-5 py-3"
                        placeholder="Autores"
                        value={autor}
                        onChange={handleAutorSearch}
                        onClick={() => setShowAutocompletado('autor')}
                    />
                    {showAutocompletado === 'autor' && (
                        <div className="w-full border border-black bg-white px-6">
                            {autocompletado.map(elems => (
                                <p
                                    className=" my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                    key={elems.name}
                                    onClick={() => {
                                        // La peor linea de codigo del trabajo
                                        // Reemplaza desde la ultima coma hasta el final con el nombre clickeado del autocompletado
                                        setAutor(
                                            prev =>
                                                prev.slice(
                                                    0,
                                                    prev.lastIndexOf(',') !== -1 ? prev.lastIndexOf(',') : 0
                                                ) +
                                                (prev.indexOf(',') !== -1 ? ',' : '') +
                                                elems.name
                                        )
                                        setShowAutocompletado('')
                                    }}
                                >
                                    {elems.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <label className="text-sm">Editoriales</label>
                <div ref={ref}>
                    <input
                        className="mb-3 w-full border border-black px-5 py-3"
                        placeholder="Editoriales"
                        value={editorial}
                        onChange={handleEditorialSearch}
                        onClick={() => setShowAutocompletado('editorial')}
                    />
                    {showAutocompletado === 'editorial' && (
                        <div className="w-full border border-black bg-white px-6">
                            {autocompletado.map(elems => (
                                <p
                                    className=" my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                    key={elems.name}
                                    onClick={() => {
                                        setEditorial(
                                            prev =>
                                                prev.slice(
                                                    0,
                                                    prev.lastIndexOf(',') !== -1 ? prev.lastIndexOf(',') : 0
                                                ) +
                                                (prev.indexOf(',') !== -1 ? ',' : '') +
                                                elems.name
                                        )
                                        setShowAutocompletado('')
                                    }}
                                >
                                    {elems.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <label className="text-sm">Páginas</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Páginas"
                    value={paginas}
                    type="number"
                    min={0}
                    onChange={e => setPaginas(Number(e.target.value))}
                />
                <label className="text-sm">Dimensiones</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Dimensiones"
                    value={dimensiones}
                    onChange={e => setDimensiones(e.target.value)}
                />
                <label className="text-sm">Precio</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Precio"
                    value={precio}
                    min={0}
                    type="number"
                    onChange={e => setPrecio(Number(e.target.value))}
                />
                <label className="text-sm">Stock</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Stock"
                    value={stock}
                    min={0}
                    type="number"
                    onChange={e => setStock(Number(e.target.value))}
                />
                <label className="text-sm">Géneros</label>
                <div ref={ref}>
                    <input
                        className="mb-3 w-full border border-black px-5 py-3"
                        placeholder="Géneros"
                        value={genero}
                        onChange={handleGeneroSearch}
                        onClick={() => setShowAutocompletado('genero')}
                    />
                    {showAutocompletado === 'genero' && (
                        <div className="w-full border border-black bg-white px-6">
                            {autocompletado.map(elems => (
                                <p
                                    className="my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                    key={elems.name}
                                    onClick={() => {
                                        setGenero(
                                            prev =>
                                                prev.slice(
                                                    0,
                                                    prev.lastIndexOf(',') !== -1 ? prev.lastIndexOf(',') : 0
                                                ) +
                                                (prev.indexOf(',') !== -1 ? ',' : '') +
                                                elems.name
                                        )
                                        setShowAutocompletado('')
                                    }}
                                >
                                    {elems.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <label className="text-sm">Encuadernado</label>
                <div ref={ref}>
                    <input
                        className="mb-3 w-full border border-black px-5 py-3"
                        placeholder="Encuadernado"
                        value={encuadernado}
                        onChange={handleEncuadernadoSearch}
                        onClick={() => setShowAutocompletado('encuadernado')}
                    />
                    {showAutocompletado === 'encuadernado' && (
                        <div className="w-full border border-black bg-white px-6">
                            {autocompletado.map(elems => (
                                <p
                                    className="my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                    key={elems.name}
                                    onClick={() => {
                                        setEncuadernado(
                                            prev =>
                                                prev.slice(
                                                    0,
                                                    prev.lastIndexOf(',') !== -1 ? prev.lastIndexOf(',') : 0
                                                ) +
                                                (prev.indexOf(',') !== -1 ? ',' : '') +
                                                elems.name
                                        )
                                        setShowAutocompletado('')
                                    }}
                                >
                                    {elems.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <label className="text-sm">Descipción</label>
                <textarea
                    className="mb-3 w-full border border-black px-5 py-3"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                />
                <BlackButton text="Confirmar" onClick={addLibro} />
            </div>
        </div>
    )
}

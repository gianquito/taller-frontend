'use client'
import BlackButton from '@/components/BlackButton'
import { getAutores, getEditoriales, getEncuadernados, getGeneros, getProduct, updateProduct } from '@/services/graphql'
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'

export default function NuevoLibro({ params }: { params: { id: number } }) {
    const [imagen, setImagen] = useState('')
    const [isbn, setIsbn] = useState<number | undefined>()
    const [titulo, setTitulo] = useState('')
    const [paginas, setPaginas] = useState<number | undefined>()
    const [dimensiones, setDimensiones] = useState('')
    const [precio, setPrecio] = useState<number | undefined>()
    const [stock, setStock] = useState<number | undefined>()
    const [descripcion, setDescripcion] = useState('')
    const [autores, setAutores] = useState<string[]>([])
    const [generos, setGeneros] = useState<string[]>([])
    const [editoriales, setEditoriales] = useState<string[]>([])
    const [encuadernados, setEncuadernados] = useState<string[]>([])

    const { user, isAuthenticated } = useAuth()
    const router = useRouter()

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    })

    async function fetchEditoriales() {
        const editoriales = await getEditoriales('')
        return editoriales.map((ed: any) => ed.nombreEditorial)
    }

    async function fetchAutores() {
        const autores = await getAutores('')
        return autores.map((autor: any) => autor.nombreAutor)
    }

    async function fetchGeneros() {
        const generos = await getGeneros('')
        return generos.map((g: any) => g.nombreGenero)
    }

    async function fetchEncuadernados() {
        const encuadernados = await getEncuadernados('')
        return encuadernados.map((en: any) => en.tipo)
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
                setAutores(libro.autores.map(({ autor }) => autor.nombreAutor))
                setEditoriales(libro.editoriales.map(({ editorial }) => editorial.nombreEditorial))
                setGeneros(libro.generos.map(({ genero }) => genero.nombreGenero))
                setEncuadernados(libro.encuadernados.map(({ encuadernado }) => encuadernado.tipo))
            })
            .catch(() => {
                toast.error('No se puede obtener el libro solicitado')
                router.push('/')
            })
    }, [user, isAuthenticated])

    useEffect(() => {
        if (!filesContent.length) return
        setImagen(filesContent[0].content)
    }, [filesContent])

    function addLibro() {
        if (
            !isbn ||
            !imagen ||
            !titulo.trim() ||
            !autores.length ||
            !editoriales.length ||
            !paginas ||
            !dimensiones.trim() ||
            !generos.length ||
            !encuadernados.length ||
            !precio ||
            stock === undefined ||
            !descripcion.trim()
        ) {
            toast.error('Los datos están incompletos')
            return
        }
        updateProduct(
            autores,
            editoriales,
            generos,
            encuadernados,
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
                <AutocompleteBox
                    availableOptions={fetchAutores()}
                    category="autor"
                    onValuesChange={setAutores}
                    initialValues={autores}
                    key={autores[0]}
                />
                <label className="text-sm">Editoriales</label>
                <AutocompleteBox
                    availableOptions={fetchEditoriales()}
                    category="editorial"
                    onValuesChange={setEditoriales}
                    initialValues={editoriales}
                    key={editoriales[0]}
                />
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
                <AutocompleteBox
                    availableOptions={fetchGeneros()}
                    category="genero"
                    onValuesChange={setGeneros}
                    initialValues={generos}
                    key={generos[0]}
                />
                <label className="text-sm">Encuadernado</label>
                <AutocompleteBox
                    availableOptions={fetchEncuadernados()}
                    category="encuadernado"
                    onValuesChange={setEncuadernados}
                    initialValues={encuadernados}
                    key={encuadernados[0]}
                />
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

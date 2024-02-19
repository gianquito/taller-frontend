'use client'
import BlackButton from '@/components/BlackButton'
import { addProduct, getAutores, getEditoriales, getEncuadernados, getGeneros } from '@/services/graphql'
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'
import useClientAuth from '@/hooks/useAuth'

export default function NuevoLibro() {
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

    const user = useClientAuth()
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
        if (!user) return
        if (user.rol !== 1) {
            router.push('/')
            return
        }
    }, [user])

    function addLibro() {
        if (
            !isbn ||
            !filesContent.length ||
            !titulo.trim() ||
            !autores.length ||
            !editoriales.length ||
            !paginas ||
            !dimensiones.trim() ||
            !generos.length ||
            !encuadernados.length ||
            !precio ||
            !stock ||
            !descripcion.trim()
        ) {
            toast.error('Los datos están incompletos')
            return
        }
        addProduct(
            autores,
            editoriales,
            generos,
            encuadernados,
            descripcion,
            dimensiones,
            btoa(filesContent[0].content),
            isbn,
            paginas,
            precio,
            stock,
            titulo
        )
            .then(() => toast.success(`Se creó el libro ${titulo}`))
            .catch(() => toast.error('Error al crear libro'))
    }

    if (!user || user.rol !== 1) return null
    return (
        <div className="my-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="w-max">
                <p className=" text-center text-2xl font-semibold">Imagen</p>
                {filesContent.length ? (
                    <img className="w-[240px] lg:w-[350px]" src={filesContent[0].content} />
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
                <AutocompleteBox availableOptions={fetchAutores()} category="autor" onValuesChange={setAutores} />
                <label className="text-sm">Editoriales</label>
                <AutocompleteBox
                    availableOptions={fetchEditoriales()}
                    category="editorial"
                    onValuesChange={setEditoriales}
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
                <AutocompleteBox availableOptions={fetchGeneros()} category="genero" onValuesChange={setGeneros} />
                <label className="text-sm">Encuadernado</label>
                <AutocompleteBox
                    availableOptions={fetchEncuadernados()}
                    category="encuadernado"
                    onValuesChange={setEncuadernados}
                />
                <label className="text-sm">Descripción</label>
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

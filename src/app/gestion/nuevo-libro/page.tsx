'use client'
import BlackButton from '@/components/BlackButton'
import { addProduct, getAutores, getEditoriales, getEncuadernados, getGeneros } from '@/services/graphql'
import { useEffect, useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'
import useClientAuth from '@/hooks/useAuth'
import TablaEjemplares from '@/components/TablaEjemplares'
import { ejemplarForm } from '@/types/ejemplarForm'
import EditarEjemplarDialog from '@/components/EditarEjemplarDialog'

export default function NuevoLibro() {
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [autores, setAutores] = useState<string[]>([])
    const [generos, setGeneros] = useState<string[]>([])

    const [ejemplares, setEjemplares] = useState<ejemplarForm[]>([])

    const user = useClientAuth()
    const router = useRouter()

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    })

    async function fetchAutores() {
        const autores = await getAutores('')
        return autores.map((autor: any) => autor.nombreAutor)
    }

    async function fetchGeneros() {
        const generos = await getGeneros('')
        return generos.map((g: any) => g.nombreGenero)
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
            !filesContent.length ||
            !titulo.trim() ||
            !autores.length ||
            !generos.length ||
            !descripcion.trim() ||
            !ejemplares.length
        ) {
            toast.error('Los datos están incompletos')
            return
        }
        addProduct(autores, generos, descripcion, btoa(filesContent[0].content), titulo, ejemplares)
            .then(() => toast.success(`Se creó el libro ${titulo}`))
            .catch(() => toast.error('Error al crear libro'))
    }

    function handleNewEjemplar(newEjemplar: ejemplarForm | undefined) {
        if (
            newEjemplar === undefined ||
            newEjemplar.isbn === undefined ||
            newEjemplar.precio === undefined ||
            newEjemplar.stock === undefined ||
            newEjemplar.dimensiones.trim() == '' ||
            newEjemplar.editorial === undefined ||
            newEjemplar.encuadernado.trim() === undefined
        ) {
            toast.error('Todos los campos son obligatorios!')
            return
        }
        setEjemplares(prevEjemplares => [...prevEjemplares.filter(ej => ej.isbn !== newEjemplar.isbn), newEjemplar])
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
            <div className="flex w-96 flex-col md:w-[500px]">
                <p className="mb-3 text-center text-2xl font-semibold">Información del libro</p>
                <label className="text-sm">Título</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Título"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
                <label className="text-sm">Autores</label>
                <AutocompleteBox availableOptions={fetchAutores} category="autor" onValuesChange={setAutores} />
                <label className="text-sm">Géneros</label>
                <AutocompleteBox availableOptions={fetchGeneros} category="genero" onValuesChange={setGeneros} />
                <label className="text-sm">Descripción</label>
                <textarea
                    className="mb-3 w-full border border-black px-5 py-3"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                    placeholder="Descripción"
                />
                <p className="mb-3 text-center text-2xl font-semibold">Ejemplares</p>
                <div className="self-end">
                    <EditarEjemplarDialog
                        submitFn={handleNewEjemplar}
                        triggerElement={
                            <div className="flex w-max items-center gap-2.5 border-[1.5px] border-black px-3 py-2">
                                <img className="w-3.5" src="/plus.png" />
                                <p className="text-xs font-semibold">Cargar ejemplar</p>
                            </div>
                        }
                    />
                </div>
                <TablaEjemplares ejemplares={ejemplares} submitFn={handleNewEjemplar} />
                <BlackButton text="Confirmar" onClick={addLibro} />
            </div>
        </div>
    )
}

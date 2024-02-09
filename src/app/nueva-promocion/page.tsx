'use client'

import { useFilePicker } from 'use-file-picker'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'
import { addPromocion, getProducts } from '@/services/graphql'
import BlackButton from '@/components/BlackButton'
import toast from 'react-hot-toast'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'

export default function NuevaPromocion() {
    const [nombre, setNombre] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [porcentaje, setPorcentaje] = useState<number | undefined>()
    const [libros, setLibros] = useState<string[]>([])

    const { user, isAuthenticated } = useAuth()

    const router = useRouter()

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    })

    useEffect(() => {
        if (isAuthenticated === null) return
        if (isAuthenticated === false || user.rol !== 1) {
            router.push('/')
            return
        }
    }, [user, isAuthenticated])

    async function fetchLibros() {
        const libros = await getProducts()
        return libros.map(libro => libro.titulo)
    }

    function addPromo() {
        if (!nombre.trim() || !filesContent.length || !fechaInicio || !fechaFin || !porcentaje || !libros.length) {
            toast.error('Los datos están incompletos')
            return
        }
        addPromocion(nombre, porcentaje, btoa(filesContent[0].content), fechaFin, fechaInicio, libros)
            .then(() => toast.success(`Se creó la promoción ${nombre}`))
            .catch(() => toast.error('Error al crear promoción'))
    }

    if (!isAuthenticated || user.rol !== 1) return null

    return (
        <div className="my-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="w-max">
                <p className=" text-center text-2xl font-semibold">Imagen</p>
                {filesContent.length ? (
                    <img className="w-[240px] lg:w-[350px]" src={filesContent[0].content} />
                ) : (
                    <div className="h-[550px] w-[240px] bg-neutral-300 lg:w-[350px]"></div>
                )}
                <button className="float-right text-lg underline" onClick={openFilePicker}>
                    Cargar imagen
                </button>
            </div>
            <div className="flex w-96 flex-col md:w-[450px]">
                <p className="mb-3 text-center text-2xl font-semibold">Información de la promoción</p>
                <label className="text-sm">Nombre</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <label className="text-sm">Fecha inicio</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Fecha inicio"
                    value={fechaInicio}
                    type="date"
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <label className="text-sm">Fecha fin</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Fecha fin"
                    value={fechaFin}
                    type="date"
                    onChange={e => setFechaFin(e.target.value)}
                />
                <label className="text-sm">Porcentaje descuento</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Porcentaje descuento"
                    value={porcentaje}
                    type="number"
                    onChange={e => setPorcentaje(Number(e.target.value))}
                />
                <label className="text-sm">Libros</label>
                <AutocompleteBox
                    availableOptions={fetchLibros()}
                    category="libro"
                    onValuesChange={setLibros}
                    preventAdd
                />
                <BlackButton text="Confirmar" onClick={addPromo} />
            </div>
        </div>
    )
}

'use client'

import { useFilePicker } from 'use-file-picker'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { addPromocion, getProducts } from '@/services/graphql'
import BlackButton from '@/components/BlackButton'
import toast from 'react-hot-toast'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'
import useClientAuth from '@/hooks/useAuth'

export default function NuevaPromocion() {
    const [nombre, setNombre] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [porcentaje, setPorcentaje] = useState<number | undefined>()
    const [librosIsbn, setLibrosIsbn] = useState<string[]>([])
    const [loadingConfirm, setLoadingConfirm] = useState(false)

    const user = useClientAuth()

    const router = useRouter()

    const { openFilePicker, filesContent, loading, errors } = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
    })

    useEffect(() => {
        if (!user) return
        if (user.rol !== 1) {
            router.push('/')
            return
        }
    }, [user])

    async function fetchIsbn() {
        const libros = await getProducts()
        return libros.map(libro => libro.ejemplares.map(ejemplar => String(ejemplar.isbn))).flat()
    }

    function addPromo() {
        if (!nombre.trim() || !filesContent.length || !fechaInicio || !fechaFin || !porcentaje || !librosIsbn.length) {
            toast.error('Los datos están incompletos')
            return
        }
        setLoadingConfirm(true)
        addPromocion(nombre, porcentaje, btoa(filesContent[0].content), fechaFin, fechaInicio, librosIsbn)
            .then(() => toast.success(`Se creó la promoción ${nombre}`))
            .catch(() => toast.error('Error al crear promoción'))
            .finally(() => setLoadingConfirm(false))
    }

    if (!user || user.rol !== 1) return null

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
                <label className="text-sm">Nombre de la promoción</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <label className="text-sm">Fecha de inicio</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Fecha inicio"
                    value={fechaInicio}
                    type="date"
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <label className="text-sm">Fecha de fin</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Fecha fin"
                    value={fechaFin}
                    type="date"
                    onChange={e => setFechaFin(e.target.value)}
                />
                <label className="text-sm">Porcentaje de descuento</label>
                <input
                    className="mb-3 border border-black px-5 py-3"
                    placeholder="Porcentaje descuento"
                    value={porcentaje}
                    type="number"
                    onChange={e => setPorcentaje(Number(e.target.value))}
                />
                <label className="text-sm">ISBN de los ejemplares</label>
                <AutocompleteBox
                    availableOptions={fetchIsbn}
                    category="libro"
                    onValuesChange={setLibrosIsbn}
                    preventAdd
                />
                <BlackButton text={loadingConfirm ? 'Cargando...' : 'Confirmar'} onClick={addPromo} />
            </div>
        </div>
    )
}

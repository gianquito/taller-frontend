'use client'

import { useFilePicker } from 'use-file-picker'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProducts, getPromocion, updatePromocion } from '@/services/graphql'
import BlackButton from '@/components/BlackButton'
import toast from 'react-hot-toast'
import { ejemplar } from '@/types/ejemplar'
import { AutocompleteBox } from '@/components/ui/AutocompleteBox'
import useClientAuth from '@/hooks/useAuth'

export default function EditarPromocion({ params }: { params: { id: number } }) {
    const [nombre, setNombre] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [porcentaje, setPorcentaje] = useState<number | undefined>()
    const [librosIsbn, setLibrosIsbn] = useState<string[]>([])
    const [imagen, setImagen] = useState('')
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

        getPromocion(params.id).then(promo => {
            setNombre(promo.nombrePromocion)
            setPorcentaje(promo.porcentaje)
            setFechaInicio(promo.fechaInicio.slice(0, 10))
            setFechaFin(promo.fechaFin.slice(0, 10))
            setImagen(atob(promo.imagen))
            setLibrosIsbn(promo.ejemplares.map((ejemplar: any) => ejemplar.idEjemplar));

        })
    }, [user])

    useEffect(() => {
        if (!filesContent.length) return
        setImagen(filesContent[0].content)
    }, [filesContent])

    async function fetchIsbn() {
        const libros = await getProducts()
        return libros.map(libro => libro.ejemplares.map(ejemplar => String(ejemplar.isbn))).flat()
    }

    function updatePromo() {
        if (!nombre.trim() || !imagen || !fechaInicio || !fechaFin || !porcentaje || !librosIsbn.length) {
            toast.error('Los datos están incompletos')
            return
        }
        setLoadingConfirm(true)
        updatePromocion(nombre, porcentaje, btoa(imagen), fechaFin, fechaInicio, librosIsbn, params.id)
            .then(() => toast.success(`Se actualizó la promoción ${nombre}`))
            .catch(() => toast.error('Error al actualizar promoción'))
            .finally(() => setLoadingConfirm(false))
    }

    if (!user || user.rol !== 1) return null

    return (
        <div className="my-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="w-max">
                <p className=" text-center text-2xl font-semibold">Imagen</p>
                {imagen ? (
                    <img className="w-[240px] lg:w-[350px]" src={imagen} />
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
                    initialValues={librosIsbn}
                    preventAdd
                    key={librosIsbn[0]}
                />
                <BlackButton text={loadingConfirm ? 'Cargando...' : 'Confirmar'} onClick={updatePromo} />
            </div>
        </div>
    )
}

'use client'

import { useFilePicker } from 'use-file-picker'
import { useEffect, useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/authContext'
import { getProductsByName, getPromocion, updatePromocion } from '@/services/graphql'
import { useDetectClickOutside } from 'react-detect-click-outside'
import BlackButton from '@/components/BlackButton'
import toast from 'react-hot-toast'
import { libro } from '@/types/libro'
import useAutocompletado from '@/hooks/useAutocompletado'

export default function EditarPromocion({ params }: { params: { id: number } }) {
    const [nombre, setNombre] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [porcentaje, setPorcentaje] = useState<number | undefined>()
    const [libros, setLibros] = useState('')
    const [imagen, setImagen] = useState('')

    const autocompletado = useAutocompletado()

    const { user, isAuthenticated } = useAuth()

    const router = useRouter()

    const ref = useDetectClickOutside({
        onTriggered: () => {
            autocompletado.hide()
        },
    })

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

        getPromocion(params.id).then(promo => {
            setNombre(promo.nombrePromocion)
            setPorcentaje(promo.porcentaje)
            setFechaInicio(promo.fechaInicio.slice(0, 10))
            setFechaFin(promo.fechaFin.slice(0, 10))
            setImagen(atob(promo.imagen))
            setLibros(promo.libros.map(({ libro }: { libro: libro }) => libro.titulo).join(','))
        })
    }, [user, isAuthenticated])

    useEffect(() => {
        if (!filesContent.length) return
        setImagen(filesContent[0].content)
    }, [filesContent])

    function handleLibroSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setLibros(value)
        getProductsByName(value.split(',').at(-1)!).then(libros =>
            autocompletado.setOptions(libros.map(libro => ({ name: libro.titulo })))
        )
    }

    function updatePromo() {
        if (!nombre.trim() || !imagen || !fechaInicio || !fechaFin || !porcentaje || !libros.trim()) {
            toast.error('Los datos están incompletos')
            return
        }
        updatePromocion(nombre, porcentaje, btoa(imagen), fechaFin, fechaInicio, libros, params.id)
            .then(() => toast.success(`Se actualizó la promoción ${nombre}`))
            .catch(() => toast.error('Error al actualizar promoción'))
    }

    if (!isAuthenticated || user.rol !== 1) return null

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
            <div className="flex w-96 flex-col gap-4 md:w-[450px]">
                <p className="text-center text-2xl font-semibold">Información de la promoción</p>
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Fecha inicio"
                    value={fechaInicio}
                    type="date"
                    onChange={e => setFechaInicio(e.target.value)}
                />
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Fecha fin"
                    value={fechaFin}
                    type="date"
                    onChange={e => setFechaFin(e.target.value)}
                />
                <input
                    className="border border-black px-5 py-3"
                    placeholder="Porcentaje descuento"
                    value={porcentaje}
                    type="number"
                    onChange={e => setPorcentaje(Number(e.target.value))}
                />
                <div ref={ref}>
                    <input
                        className="w-full border border-black px-5 py-3"
                        placeholder="Libros"
                        value={libros}
                        onChange={handleLibroSearch}
                        onClick={() => autocompletado.setCategory('libros')}
                    />
                    {autocompletado.getCategory() === 'libros' && (
                        <div className="w-full border border-black bg-white px-6">
                            {autocompletado.get().map(elems => (
                                <p
                                    className=" my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                    key={elems.name}
                                    onClick={() => {
                                        setLibros(
                                            prev =>
                                                prev.slice(
                                                    0,
                                                    prev.lastIndexOf(',') !== -1 ? prev.lastIndexOf(',') : 0
                                                ) +
                                                (prev.indexOf(',') !== -1 ? ',' : '') +
                                                elems.name
                                        )
                                        autocompletado.hide()
                                    }}
                                >
                                    {elems.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <BlackButton text="Confirmar" onClick={updatePromo} />
            </div>
        </div>
    )
}

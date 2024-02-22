'use client'

import BlackButton from '@/components/BlackButton'
import useClientAuth from '@/hooks/useAuth'
import useAutocompletado from '@/hooks/useAutocompletado'
import { getCiudad, getDireccion, updateDireccion } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { toast } from 'react-hot-toast'

export default function DireccionId({ params }: { params: { id: number } }) {
    const [calle, setCalle] = useState('')
    const [numero, setNumero] = useState<number | undefined>()
    const [ciudad, setCiudad] = useState('')
    const [cp, setCp] = useState<number | undefined>()

    const autocompletado = useAutocompletado()

    const user = useClientAuth()
    const router = useRouter()

    const ref = useDetectClickOutside({
        onTriggered: () => {
            autocompletado.hide()
        },
    })

    useEffect(() => {
        if (!user) return
        getDireccion(user.idUsuario, params.id)
            .then(dir => {
                setCalle(dir.calle)
                setNumero(dir.numero)
                setCiudad(dir.ciudad.nombreCiudad)
                setCp(dir.cpCiudad)
            })
            .catch(() => toast.error('Hubo un error al obtener la dirección'))
    }, [user])

    function editAddress() {
        if (!user) return

        updateDireccion(user.idUsuario, params.id, calle, numero!, cp!, ciudad)
            .then(() => router.push('/mi-cuenta'))
            .catch(() => toast.error('Hubo un error al editar tu dirección'))
    }

    function handleCiudadSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setCiudad(value)
        getCiudad(value).then(ciudades =>
            autocompletado.setOptions(ciudades.map((ci: { nombreCiudad: string }) => ({ name: ci.nombreCiudad })))
        )
    }

    if (!user) return null

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-2xl font-semibold">Editar dirección</h1>
                <div className="my-10 flex w-[350px] flex-col gap-4 md:w-[450px]">
                    <input
                        className="border border-black px-5 py-3"
                        placeholder="Calle"
                        value={calle}
                        onChange={e => setCalle(e.target.value)}
                    />
                    <input
                        className="border border-black px-5 py-3"
                        placeholder="Numero"
                        value={numero}
                        type="number"
                        onChange={e => setNumero(Number(e.target.value))}
                    />
                    <div ref={ref} className="relative">
                        <input
                            className="w-full border border-black px-5 py-3"
                            placeholder="Ciudad"
                            value={ciudad}
                            onChange={handleCiudadSearch}
                            onClick={() => autocompletado.setCategory('ciudad')}
                        />
                        {autocompletado.getCategory() === 'ciudad' && (
                            <div className="absolute w-full border border-black bg-white px-6">
                                {autocompletado.get().map(elems => (
                                    <p
                                        className="my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                        key={elems.name}
                                        onClick={() => {
                                            setCiudad(elems.name)
                                            autocompletado.hide()
                                        }}
                                    >
                                        {elems.name}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                    <input
                        className="border border-black px-5 py-3"
                        placeholder="Código postal"
                        value={cp}
                        type="number"
                        onChange={e => setCp(Number(e.target.value))}
                    />
                </div>
                <BlackButton text="Confirmar" onClick={editAddress} />
            </div>
        </div>
    )
}

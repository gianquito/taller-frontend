'use client'

import BlackButton from '@/components/BlackButton'
import { useAuth } from '@/context/authContext'
import { addDireccion, getCiudad } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { toast } from 'react-hot-toast'

export default function Direccion() {
    const [calle, setCalle] = useState('')
    const [numero, setNumero] = useState<number | undefined>()
    const [ciudad, setCiudad] = useState('')
    const [cp, setCp] = useState<number | undefined>()

    const [showAutocompletado, setShowAutocompletado] = useState(false)
    const [autocompletado, setAutocompletado] = useState<any[]>([])

    const { user } = useAuth()
    const router = useRouter()

    const ref = useDetectClickOutside({
        onTriggered: () => {
            setShowAutocompletado(false)
        },
    })

    function addAddress() {
        if (!user) {
            router.push('/ingresar')
            return
        }
        addDireccion(user.idUsuario, calle, numero!, cp!, ciudad)
            .then(() => router.push('/mi-cuenta'))
            .catch(() => toast.error('Error al crear dirección'))
    }

    function handleCiudadSearch(e: ChangeEvent) {
        const value = (e.target as HTMLInputElement).value
        setCiudad(value)
        getCiudad(value).then(ciudades => setAutocompletado(ciudades.map((ci: any) => ({ name: ci.nombreCiudad }))))
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-2xl font-semibold">Nueva dirección</h1>
                <div className="my-10 flex w-96 flex-col gap-4 md:w-[450px]">
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
                            onClick={() => setShowAutocompletado(true)}
                        />
                        {showAutocompletado && (
                            <div className="absolute w-full border border-black bg-white px-6">
                                {autocompletado.map(elems => (
                                    <p
                                        className="my-2 cursor-pointer text-lg hover:bg-neutral-200"
                                        key={elems.name}
                                        onClick={() => {
                                            setCiudad(elems.name)
                                            setShowAutocompletado(false)
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
                <BlackButton text="Confirmar" onClick={addAddress} />
            </div>
        </div>
    )
}

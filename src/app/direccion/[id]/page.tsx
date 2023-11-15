'use client'

import BlackButton from '@/components/BlackButton'
import { useAuth } from '@/context/authContext'
import { getDireccion, updateDireccion } from '@/services/graphql'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function DireccionId({ params }: { params: { id: number } }) {
    const [calle, setCalle] = useState('')
    const [numero, setNumero] = useState<number | undefined>()
    const [ciudad, setCiudad] = useState('')
    const [cp, setCp] = useState<number | undefined>()
    const { user } = useAuth()
    const router = useRouter()

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
        if (!user) {
            router.push('/ingresar')
            return
        }
        updateDireccion(user.idUsuario, params.id, calle, numero!, cp!)
            .then(() => router.push('/mi-cuenta'))
            .catch(() => toast.error('Hubo un error al editar tu dirección'))
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-2xl font-semibold">Editar dirección</h1>
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
                    <input
                        className="border border-black px-5 py-3"
                        placeholder="Ciudad"
                        value={ciudad}
                        onChange={e => setCiudad(e.target.value)}
                    />
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

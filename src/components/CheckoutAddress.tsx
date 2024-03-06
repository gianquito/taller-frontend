'use client'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface CheckoutAdressProps {
    calle: string
    numero: number
    cp: number
    ciudad: string
    isSelected: boolean
    toggle: () => void
    setCostoEnvios: React.Dispatch<
        React.SetStateAction<{
            [id: string]: number
        }>
    >
    id: string
    local?: boolean
}

export default function CheckoutAdress({
    calle,
    numero,
    cp,
    ciudad,
    isSelected,
    toggle,
    setCostoEnvios,
    id,
    local,
}: CheckoutAdressProps) {
    const [envio, setEnvio] = useState<number | undefined>(undefined)
    useEffect(() => {
        if (local) {
            setEnvio(0)
            setCostoEnvios(prev => ({ ...prev, [-1]: 0 }))
            return
        }
        fetch('https://corsproxy.io/?https://www6.oca.com.ar/PlataformaEnvios/Home/ObtenerPrecioEnvio', {
            method: 'POST',
            body: JSON.stringify({
                peso: '0.25',
                volumen: '0.001',
                cpOrigen: '3260',
                cpDestino: cp.toString(),
                idOperativa: '302964',
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                setEnvio(data.Respuesta.PrecioDeEnvioConIVA)
                setCostoEnvios(prev => ({ ...prev, [id]: parseInt(data.Respuesta.PrecioDeEnvioConIVA) }))
            })
            .catch(() => {
                setEnvio(undefined)
                toast.error(`No se pudo calcular el envío de ${ciudad} CP ${cp}`)
            })
    }, [])

    return (
        <div
            className="flex w-[350px] gap-5 border-2 border-black px-5 py-3 tracking-tight md:w-[400px]"
            onClick={toggle}
        >
            <div className="mt-2 h-[23px] w-[23px] cursor-pointer select-none border border-black p-[3px] hover:bg-neutral-200">
                {isSelected && <Image src="/check.svg" alt="check" width={17} height={17} />}
            </div>
            <div>
                {local && <p className="text-sm font-bold">Retiro gratis en el local</p>}
                <p>{`${calle} ${numero}, CP ${cp}`}</p>
                <p>{ciudad}</p>
                <p>{envio !== undefined ? formatPrice(envio) : '$...'}</p>
            </div>
        </div>
    )
}

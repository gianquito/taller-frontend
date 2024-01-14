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
        fetch('https://corsproxy.io/?https://cotizador-api.andreani.com/api/v1/Cotizar', {
            method: 'POST',
            body: JSON.stringify({
                codigoPostalOrigen: '3260',
                codigoPostalDestino: cp.toString(),
                tipoDeEnvioId: '9c16612c-a916-48cf-9fbb-dbad2b097e9e',
                itemId: '9a4edc9d-1299-41fb-8f9d-b268cabcb5f3',
                altoCm: '1',
                anchoCm: '1',
                largoCm: '1',
                peso: '1000',
                valorDeclarado: '1000',
                volumen: '1',
            }),
            headers: {
                'content-type': 'application/json',
                Xapikey: 'TEST_XqPMiwXzTRKHH0mF3gmtPtQt3LNGIuqCTdgaUHINMdmlaFid0x9MzlYTKXPxluYQ',
            },
        })
            .then(res => res.json())
            .then(data => {
                setEnvio(data[1].tarifaSinIva)
                setCostoEnvios(prev => ({ ...prev, [id]: data[1].tarifaSinIva }))
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

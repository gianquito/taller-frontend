'use client'

import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useState } from 'react'

interface ProductCartProps {
    title: string
    image: string
    author: string
    price: number
    id: number
    amount: number
}

export default function ProductCart({ title, image, author, price, id, amount }: ProductCartProps) {
    const [amountInput, setAmountInput] = useState(amount)

    function updateAmount(newAmount: number) {
        if (newAmount < 0 && amountInput <= 0) return
        setAmountInput(prev => (prev += newAmount))
    }

    return (
        <div className="flex flex-shrink-0 translate-x-8 gap-6">
            <Image className="h-[132px] w-[80px]" src={image} alt={title} width={80} height={132} />
            <div className="flex w-60 flex-col gap-1 sm:w-96">
                <p className="text-xl font-semibold tracking-tighter">{title}</p>
                <p className="text-sm text-gray-600">por: {author}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm">Cantidad: </p>
                    <button className="text-lg" onClick={() => updateAmount(-1)}>
                        -
                    </button>
                    <input
                        className="h-6 w-8 rounded-lg border-2 border-neutral-600 text-center font-semibold"
                        type="number"
                        min={0}
                        value={amountInput}
                        onChange={e => setAmountInput(Number(e.target.value))}
                    />
                    <button onClick={() => updateAmount(1)}>+</button>
                </div>
                <div className="flex flex-col justify-between sm:flex-row">
                    <p className="text-xl font-black">{formatPrice(price)}</p>
                    <p className="cursor-pointer text-sm underline">Eliminar</p>
                </div>
            </div>
        </div>
    )
}

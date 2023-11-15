'use client'

import { addProductToCart, deleteProductFromCart } from '@/services/graphql'
import { formatPrice } from '@/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface ProductCartProps {
    title: string
    image: string
    author: string
    price: number
    amount: number
    id: number
    cart_id: number
    stock: number
    fetch_products: () => void
    setAmounts: React.Dispatch<any>
}

export default function ProductCart({
    title,
    image,
    author,
    price,
    amount,
    id,
    cart_id,
    stock,
    fetch_products,
    setAmounts,
}: ProductCartProps) {
    const [amountInput, setAmountInput] = useState(amount)

    function updateAmount(newAmount: number, exact: boolean) {
        if (!Number.isInteger(newAmount)) return
        if (newAmount < 0 && amountInput <= 1) return
        if (newAmount < 1 && exact) return
        if (newAmount > 0 && amountInput >= stock) return
        if (newAmount > stock && exact) return

        setAmountInput(prev => (exact ? newAmount : (prev += newAmount)))
        addProductToCart(id, cart_id, newAmount, exact)
    }

    useEffect(() => {
        setAmounts(prev => ({ ...prev, [id]: { amount: amountInput, price } }))
    }, [amountInput])

    return (
        <div className="flex flex-shrink-0 translate-x-8 gap-6">
            <Image className="h-[132px] w-[80px]" src={image} alt={title} width={80} height={132} />
            <div className="flex w-60 flex-col sm:w-96">
                <p className="text-xl font-semibold tracking-tighter">{title}</p>
                <p className="text-sm text-gray-600">por: {author}</p>
                <div className="flex items-center gap-2">
                    <p className="text-sm">Cantidad: </p>
                    <button className="select-none text-lg" onClick={() => updateAmount(-1, false)}>
                        -
                    </button>
                    <input
                        className="h-6 w-8 rounded-lg border-2 border-neutral-600 text-center font-semibold"
                        type="number"
                        min={1}
                        max={stock}
                        value={amountInput}
                        onChange={e => updateAmount(Number(e.target.value), true)}
                    />
                    <button className="select-none text-lg" onClick={() => updateAmount(1, false)}>
                        +
                    </button>
                </div>
                <p className="text-sm">Stock: {stock}</p>
                <div className="flex flex-col justify-between sm:flex-row">
                    <p className="text-xl font-black">{formatPrice(price * amountInput)}</p>
                    <p
                        className="cursor-pointer text-sm underline"
                        onClick={() =>
                            deleteProductFromCart(cart_id, id)
                                .then(() => {
                                    toast.success(`Se eliminó ${title} de tu carrito`)
                                    fetch_products()
                                })
                                .catch(() => toast.error(`No se pudo eliminar ${title} de tu carrito`))
                        }
                    >
                        Eliminar
                    </p>
                </div>
            </div>
        </div>
    )
}

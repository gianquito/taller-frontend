'use client'

import { deleteWishlisted } from '@/services/graphql'
import { ejemplar } from '@/types/ejemplar'
import { calculateDiscount, formatPrice } from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

interface ProductCardHomeProps {
    title: string
    image: string
    author: string
    price: number
    id: number
    id_usuario: string | undefined
    ejemplar: ejemplar
    id_lista: string
}

export default function ProductCardWishlist({
    title,
    image,
    author,
    price,
    id,
    id_usuario,
    ejemplar,
    id_lista,
}: ProductCardHomeProps) {
    const discount = calculateDiscount(ejemplar)
    const router = useRouter()

    return (
        <Link className="flex w-40 flex-col gap-0.5 leading-7" href={`/libro/${id}?ejemplar=${ejemplar.isbn}`}>
            <img className="w-40" alt={title + ' portada'} src={image} />
            <p className="leading-5">{title}</p>
            <p className="text-sm text-gray-600">por: {author}</p>
            <div className="flex items-center gap-1">
                {discount.hasDiscount ? (
                    <>
                        <p className="text-xs text-neutral-600 line-through">{formatPrice(discount.originalPrice)}</p>
                        <p className="font-black text-red-500">{formatPrice(discount.discountedPrice!)}</p>
                        <p className="rounded bg-red-500 px-1 py-0.5 text-xs font-medium text-white">
                            {discount.porcentaje}
                        </p>
                    </>
                ) : (
                    <p className="font-black ">{formatPrice(price)}</p>
                )}
            </div>
            {id_usuario === id_lista && (
                <p
                    className="text-sm underline"
                    onClick={e => {
                        e.preventDefault()
                        deleteWishlisted(id, id_usuario)
                            .then(() => {
                                toast.success(`Se eliminó ${title} de tu lista de deseos`)
                                router.refresh()
                            })
                            .catch(() => toast.error(`No se pudo eliminar ${title} de tu lista de deseos`))
                    }}
                >
                    Eliminar
                </p>
            )}
        </Link>
    )
}

'use client'

import { deleteFavorite } from '@/services/graphql'
import { libro } from '@/types/libro'
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
    id_usuario: string
    libro: libro
}

export default function ProductCardFavorites({
    title,
    image,
    author,
    price,
    id,
    id_usuario,
    libro,
}: ProductCardHomeProps) {
    const discount = calculateDiscount(libro)
    const router = useRouter()
    return (
        <Link className="flex w-40 flex-col gap-0.5 leading-7" href={`/libro/${id}`}>
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
            <p
                className="text-sm underline"
                onClick={e => {
                    e.preventDefault()
                    deleteFavorite(id, id_usuario)
                        .then(() => {
                            toast.success(`Se eliminó ${title} de tus favoritos`)
                            router.refresh()
                        })
                        .catch(() => toast.error(`No se pudo eliminar ${title} de tus favoritos`))
                }}
            >
                Eliminar
            </p>
        </Link>
    )
}

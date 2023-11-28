import { calculateDiscount, formatPrice } from '@/utils'
import Link from 'next/link'

interface ProductCardHomeProps {
    title: string
    image: string
    author: string
    price: number
    id: number
    libro: any
}

export default function ProductCardHome({ title, image, author, price, id, libro }: ProductCardHomeProps) {
    const discount = calculateDiscount(libro)
    return (
        <Link className="flex w-40 flex-col gap-0.5 leading-7" href={`/libro/${id}`} prefetch={false}>
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
                    <p className="text-lg font-black ">{formatPrice(price)}</p>
                )}
            </div>
        </Link>
    )
}

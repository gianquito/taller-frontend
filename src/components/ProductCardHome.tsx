import { formatPrice } from '@/utils'

interface ProductCardHomeProps {
    title: string
    image: string
    author: string
    price: number
}

export default function ProductCardHome({ title, image, author, price }: ProductCardHomeProps) {
    return (
        <div className="flex w-40 flex-col gap-0.5 leading-7">
            <img className="w-40" alt={title + ' portada'} src={image} />
            <p className="leading-5">{title}</p>
            <p className="text-sm text-gray-600">por: {author}</p>
            <p className="text-lg font-black">{formatPrice(price)}</p>
        </div>
    )
}

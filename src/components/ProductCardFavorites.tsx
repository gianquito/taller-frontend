import { deleteFavorite } from '@/services/graphql'
import { formatPrice } from '@/utils'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface ProductCardHomeProps {
    title: string
    image: string
    author: string
    price: number
    id: number
    id_usuario: string
    fetch_products: () => void
}

export default function ProductCardFavorites({
    title,
    image,
    author,
    price,
    id,
    id_usuario,
    fetch_products,
}: ProductCardHomeProps) {
    return (
        <Link className="flex w-40 flex-col gap-0.5 leading-7" href={`/libro/${id}`}>
            <img className="w-40" alt={title + ' portada'} src={image} />
            <p className="leading-5">{title}</p>
            <p className="text-sm text-gray-600">por: {author}</p>
            <div className="flex items-center justify-between">
                <p className="font-black">{formatPrice(price)}</p>
                <p
                    className="text-sm underline"
                    onClick={e => {
                        e.preventDefault()
                        deleteFavorite(id, id_usuario)
                            .then(() => {
                                toast.success(`Se eliminó ${title} de tus favoritos`)
                                fetch_products()
                            })
                            .catch(() => toast.error(`No se pudo eliminar ${title} de tus favoritos`))
                    }}
                >
                    Eliminar
                </p>
            </div>
        </Link>
    )
}

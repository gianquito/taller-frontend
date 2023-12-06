import { libro } from '@/types/libro'
import { calculateDiscount, formatPrice } from '@/utils'
import Image from 'next/image'

interface ProductCheckoutProps {
    title: string
    image: string
    author: string
    price: number
    amount: number
    libro: libro
}

export default function ProductCheckout({ amount, author, image, price, title, libro }: ProductCheckoutProps) {
    const discount = calculateDiscount(libro)
    return (
        <div className="flex flex-shrink-0 translate-x-4 gap-6">
            <Image className="h-[132px] w-[80px]" src={image} alt={title} width={80} height={132} />
            <div className="flex w-52 flex-col gap-1 sm:w-80">
                <p className="text-xl font-semibold tracking-tighter">{title}</p>
                <p className="text-sm text-gray-600">por: {author}</p>
                <p className="text-sm text-gray-600">Cantidad: {amount}</p>
                <p className="text-xl font-black">
                    {formatPrice((discount.hasDiscount ? discount.discountedPrice! : price) * amount)}
                </p>
            </div>
        </div>
    )
}

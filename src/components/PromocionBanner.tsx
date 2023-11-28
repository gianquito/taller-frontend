import { getPromocionImagen } from '@/services/graphql'

export default async function PromocionBanner() {
    const image = await getPromocionImagen()
    if (!image) return null
    return (
        <div className="my-8 flex justify-center">
            <img alt="promocion" src={atob(image)} />
        </div>
    )
}

import { getPromocionImagen } from '@/services/graphql'
import { promocion } from '@/types/promocion'

export default async function PromocionBanner() {
    const promociones = await getPromocionImagen()
    if (!promociones || promociones.length === 0) return null
    const currentDate = new Date()
    const filteredPromos = promociones.filter((promo: promocion) => {
        const fechaInicio = new Date(promo.fechaInicio)
        const fechaFin = new Date(promo.fechaFin)
        return currentDate >= fechaInicio && currentDate <= fechaFin
    })
    if (filteredPromos.length === 0) return null
    return (
        <div className="mt-8 flex h-72 justify-center">
            <img alt="promocion" src={atob(filteredPromos[0].imagen)} />
        </div>
    )
}

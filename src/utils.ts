import { ejemplar } from './types/ejemplar'
import { libro } from './types/libro'

export const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price).replace(/\s/g, '')

export function getCookie(name: string) {
    if (typeof window === 'undefined') return undefined
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return undefined
}

export function calculateDiscount(ejemplar: ejemplar) {
    const currentDate = new Date().getTime()
    //Obtiene las promociones activas actualmente
    const currentPromotions = ejemplar.promociones.filter(promocion => {
        return (
            new Date(promocion.promocionDescuento.fechaFin).getTime() >= currentDate &&
            new Date(promocion.promocionDescuento.fechaInicio).getTime() <= currentDate
        )
    })
    if (currentPromotions.length === 0) return { hasDiscount: false, originalPrice: ejemplar.precio }

    //Obtiene el descuento mas alto de las promociones activas
    const descuento: number = currentPromotions.sort((a, b) => {
        if (a.promocionDescuento.porcentaje > b.promocionDescuento.porcentaje) {
            return 1
        } else if (a.promocionDescuento.porcentaje > b.promocionDescuento.porcentaje) {
            return -1
        }
        return 0
    })[0].promocionDescuento.porcentaje

    return {
        hasDiscount: true,
        originalPrice: ejemplar.precio,
        porcentaje: `${descuento}%`,
        discountedPrice: ejemplar.precio * (descuento / 100),
    }
}

export function getDefaultEjemplar(product: libro) {
    // busca los ejemplares en stock
    const ejemplaresEnStock = product.ejemplares.filter(ejemplar => ejemplar.stock > 0)
    // si el libro no tiene ejemplares en stock devuelve undefined
    if (!ejemplaresEnStock.length) return undefined

    // busca si algun ejemplar en stock está en promocion y lo devuelve
    const ejemplarConDescuento = ejemplaresEnStock.find(ejemplar => ejemplar.promociones.length > 0)
    if (ejemplarConDescuento) return ejemplarConDescuento

    // devuelve el primer ejemplar de la lista
    return ejemplaresEnStock[0]
}

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://127.0.0.1:5000'

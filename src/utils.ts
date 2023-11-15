export const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price).replace(/\s/g, '')

export function getCookie(name: string) {
    if (typeof window === 'undefined') return undefined
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return undefined
}

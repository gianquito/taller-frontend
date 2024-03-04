import { addPedido, getProductsInCart } from '@/services/graphql'
import { ejemplar } from '@/types/ejemplar'
import { MercadoPagoConfig, Payment, PaymentRefund, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-876248817619970-111419-3c01d2fa781f6c10c3b10cef9659a800-1548518089',
    options: { timeout: 5000, idempotencyKey: 'abc' },
})

export async function POST(request: Request) {
    const body = await request.json()
    if (body.type === 'payment') {
        const payment = new Payment(client)
        const p = await payment.get({ id: body.data.id })

        const cartProducts: { cantidad: number; ejemplar: ejemplar }[] = await getProductsInCart(
            p.metadata.id_carrito,
            p.metadata.id_session
        )

        const ejemplarSinStock = cartProducts
            .reduce(
                function (filtered, product) {
                    const compra_item = p.additional_info?.items?.find(item => {
                        //@ts-ignore
                        return item.id === product.ejemplar.isbn
                    })
                    if (compra_item) {
                        filtered.push({ stockActual: product.ejemplar.stock, compraCantidad: compra_item.quantity })
                    }
                    return filtered
                },
                [] as { stockActual: number; compraCantidad: number }[]
            )
            .find(product => product.stockActual < product.compraCantidad)

        if (ejemplarSinStock) {
            console.log('Hay productos sin stock, reembolsando pago')
            const refund = new PaymentRefund(client)
            await refund.create({ payment_id: p.id! })

            return new Response('OK', {
                status: 200,
            })
        }

        await addPedido(
            p.shipping_amount ?? 0,
            p.metadata.user_id,
            p.transaction_amount ?? 0,
            p.metadata.total,
            p.metadata.id_direccion
        )
    }

    return new Response('OK', {
        status: 200,
    })
}

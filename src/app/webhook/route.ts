import { addPedido } from '@/services/graphql'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-876248817619970-111419-3c01d2fa781f6c10c3b10cef9659a800-1548518089',
    options: { timeout: 5000, idempotencyKey: 'abc' },
})

export async function POST(request: Request) {
    const body = await request.json()
    if (body.type === 'payment') {
        const payment = new Payment(client)
        const p = await payment.get({ id: body.data.id })
        addPedido(p.shipping_amount ?? 0, p.metadata.user_id, p.transaction_amount ?? 0)
    }

    return new Response('OK', {
        status: 200,
    })
}

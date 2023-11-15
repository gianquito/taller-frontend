import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-876248817619970-111419-3c01d2fa781f6c10c3b10cef9659a800-1548518089',
    options: { timeout: 5000, idempotencyKey: 'abc' },
})

export async function POST(request: Request) {
    const { products } = await request.json()

    const preference = new Preference(client)
    // add payer info with id_usuario; validate cookie?; create webhook endpoint to confirm payment
    const body = {
        items: [...products],
    }
    try {
        const res = await preference.create({ body })
        return new Response(res.init_point, {
            status: 200,
        })
    } catch (error) {
        return new Response('Error al crear pago', {
            status: 400,
        })
    }
}

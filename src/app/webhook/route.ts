import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-876248817619970-111419-3c01d2fa781f6c10c3b10cef9659a800-1548518089',
    options: { timeout: 5000, idempotencyKey: 'abc' },
})

export async function POST(request: Request) {
    const body = await request.json()
    if (body.type === 'payment') {
        const payment = new Payment(client)
        console.log(body)
        const p = await payment.search(body.data.id)
        console.log(p.results![0])
        console.log('---------------------')
        console.log(p.results![0].additional_info)
        body.data.id
    }

    return new Response('Hola', {
        status: 200,
    })
}

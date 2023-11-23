import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
    accessToken: 'TEST-876248817619970-111419-3c01d2fa781f6c10c3b10cef9659a800-1548518089',
    options: { timeout: 5000, idempotencyKey: 'abc' },
})

export async function POST(request: Request) {
    const {
        products,
        envio,
        id_usuario,
    }: {
        products: { quantity: number; unit_price: number; title: string; id: string; currency_id: string }[]
        envio: number
        id_usuario: string
    } = await request.json()
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(products)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    const preference = new Preference(client)
    // add payer info with id_usuario; validate cookie?; create webhook endpoint to confirm payment
    try {
        const res = await preference.create({
            body: {
                items: products,
                shipments: {
                    cost: envio,
                },
                additional_info: id_usuario,
                notification_url: 'https://59d6-2a09-bac1-680-28-00-2c-b5.ngrok-free.app/webhook',
                auto_return: 'approved',
                back_urls: {
                    success: 'http://localhost:3000',
                },
            },
        })
        return new Response(res.init_point, {
            status: 200,
        })
    } catch (error) {
        return new Response('Error al crear pago ' + JSON.stringify(error), {
            status: 400,
        })
    }
}

import { getPedidos, getProducts } from '@/services/graphql'
import { formatPrice } from '@/utils'

export default async function GestionCards({ sessionId, users }: { sessionId: string; users: any }) {
    const stock = (await getProducts()).reduce((acc: number, curr) => acc + curr.stock, 0)
    const pedidos: { total: number }[] = await getPedidos(sessionId)
    const clientes = users.length

    return (
        <div className="my-28 flex flex-wrap items-center justify-evenly gap-4 md:flex-row">
            <div className="flex w-44 flex-shrink-0 flex-col justify-between border border-black p-4 text-center text-2xl xl:w-80 xl:flex-row">
                <p className="font-medium">Stock</p>
                <p>{stock ?? ''}</p>
            </div>
            <div className="flex w-44 flex-shrink-0 flex-col justify-between border border-black p-4 text-center text-2xl xl:w-80 xl:flex-row">
                <p className="font-medium">Ventas</p>
                <p>{pedidos && pedidos.length}</p>
            </div>
            <div className="flex w-44 flex-shrink-0 flex-col justify-between border border-black p-4 text-center text-2xl xl:w-80 xl:flex-row">
                <p className="font-medium">Ganancias</p>
                <p>{pedidos && formatPrice(pedidos.reduce((acc, curr) => acc + curr.total, 0))}</p>
            </div>
            <div className="flex w-44 flex-shrink-0 flex-col justify-between border border-black p-4 text-center  text-2xl xl:w-80 xl:flex-row">
                <p className="font-medium">Clientes</p>
                <p>{clientes ?? ''}</p>
            </div>
        </div>
    )
}

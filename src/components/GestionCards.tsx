import { getPedidos, getProducts, getUsers } from '@/services/graphql'
import { formatPrice } from '@/utils'
import { useEffect, useState } from 'react'

export default function GestionCards() {
    const [stock, setStock] = useState<number | undefined>()
    const [pedidos, setPedidos] = useState<[] | undefined>()
    const [clientes, setClientes] = useState<number | undefined>()

    useEffect(() => {
        getProducts().then(products => setStock(products.reduce((acc: number, curr: any) => acc + curr.stock, 0)))
        getPedidos().then(pedidos => setPedidos(pedidos))
        getUsers().then(clientes => setClientes(clientes.length))
    }, [])
    return (
        <div className="flex flex-wrap items-center justify-evenly gap-4 md:flex-row">
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
                <p>{pedidos && formatPrice(pedidos.reduce((acc, curr: any) => acc + curr.total, 0))}</p>
            </div>
            <div className="flex w-44 flex-shrink-0 flex-col justify-between border border-black p-4 text-center  text-2xl xl:w-80 xl:flex-row">
                <p className="font-medium">Clientes</p>
                <p>{clientes ?? ''}</p>
            </div>
        </div>
    )
}

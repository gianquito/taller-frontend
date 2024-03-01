import { getPedidosDetallado } from '@/services/graphql'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { pedido } from '@/types/pedido'
import { formatPrice } from '@/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'

export default async function TablaPedidosGestion({ sessionId }: { sessionId: string }) {
    const pedidos: pedido[] = await getPedidosDetallado(sessionId)

    return (
        <div className="mx-auto mb-16 max-w-[1200px]">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Pedidos</h1>
            </div>
            <div className="mt-4 max-h-[800px] overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Total con descuento</TableHead>
                            <TableHead>Dirección de envío</TableHead>
                            <TableHead>Usuario</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidos
                            .sort((a, b) => b.fecha.localeCompare(a.fecha))
                            .map(pedido => (
                                <>
                                    <TableRow key={pedido.idPedido} className="border-b-0 border-t">
                                        <TableCell>{pedido.idPedido}</TableCell>
                                        <TableCell>{new Date(pedido.fecha).toLocaleString('es-ar')}</TableCell>
                                        <TableCell>{formatPrice(pedido.total)}</TableCell>
                                        <TableCell>{formatPrice(pedido.totalConDescuento)}</TableCell>
                                        <TableCell>
                                            {pedido.direccion ? (
                                                <>
                                                    <p>{`${pedido.direccion.calle} ${pedido.direccion.numero}`}</p>
                                                    <p>{`${pedido.direccion.ciudad.cp} ${pedido.direccion.ciudad.nombreCiudad}`}</p>
                                                </>
                                            ) : (
                                                'RETIRA EN SUCURSAL'
                                            )}
                                        </TableCell>
                                        <TableCell>{pedido.usuario.email}</TableCell>
                                    </TableRow>

                                    <TableRow className="-translate-y-3 hover:bg-white">
                                        <TableCell colSpan={6}>
                                            <div className="flex items-center justify-center">
                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-1" className="!border-0">
                                                        <AccordionTrigger className="justify-center">
                                                            Ejemplares del pedido
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <Table className="mx-auto w-[90%]">
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>ISBN</TableHead>
                                                                        <TableHead>Título</TableHead>
                                                                        <TableHead>Cantidad</TableHead>
                                                                        <TableHead>Precio</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {pedido.lineasPedido.map((lp, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCell>{lp.ejemplar.isbn}</TableCell>
                                                                            <TableCell>
                                                                                {lp.ejemplar.libro.titulo}
                                                                            </TableCell>
                                                                            <TableCell>{lp.cantidad}</TableCell>
                                                                            <TableCell>
                                                                                {formatPrice(lp.precio)}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

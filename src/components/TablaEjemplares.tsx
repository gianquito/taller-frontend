import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { ejemplarForm } from '@/types/ejemplarForm'
import { formatPrice } from '@/utils'
import EditarEjemplarDialog from './EditarEjemplarDialog'
import Image from 'next/image'

interface TablaEjemplaresProps {
    ejemplares: ejemplarForm[]
    submitFn: (newEjemplar: ejemplarForm | undefined) => void
    removeFn: (newEjemplar: ejemplarForm) => void
}

export default function TablaEjemplares({ ejemplares, submitFn, removeFn }: TablaEjemplaresProps) {
    return (
        <ScrollArea>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>

                        <TableHead>ISBN</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Dimensiones</TableHead>
                        <TableHead>Páginas</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Editorial</TableHead>
                        <TableHead>Encuadernado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ejemplares.length > 0 ? (
                        ejemplares.map(ejemplar => (
                            <TableRow key={ejemplar.isbn}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <EditarEjemplarDialog
                                            currentEjemplar={ejemplar}
                                            submitFn={submitFn}
                                            triggerElement={
                                                <div className="w-[14px] cursor-pointer select-none">
                                                    <Image
                                                        src="/lapiz1.png"
                                                        alt="Editar ejemplar"
                                                        draggable={false}
                                                        width={14}
                                                        height={14}
                                                    />
                                                </div>
                                            }
                                        />
                                        {!ejemplar.preventDelete && (
                                            <div
                                                className="w-[14px] cursor-pointer select-none"
                                                onClick={() => removeFn(ejemplar)}
                                            >
                                                <Image
                                                    src="/trash-can.png"
                                                    alt="Eliminar ejemplar"
                                                    draggable={false}
                                                    width={14}
                                                    height={14}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{ejemplar.isbn}</TableCell>
                                <TableCell>{formatPrice(ejemplar.precio)}</TableCell>
                                <TableCell>{ejemplar.dimensiones}</TableCell>
                                <TableCell>{ejemplar.paginas}</TableCell>
                                <TableCell>{ejemplar.stock}</TableCell>
                                <TableCell>{ejemplar.editorial}</TableCell>
                                <TableCell>{ejemplar.encuadernado}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No se cargó ningún ejemplar.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

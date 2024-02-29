import { getProducts, getProductsSales } from '@/services/graphql'
import ActionButton from './ActionButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Image from 'next/image'
import Kebab from './Kebab'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import TablaEjemplares from './TablaEjemplares'

export default async function TablaLibrosGestion({ sessionId }: { sessionId: string }) {
    const libros = await getProducts()
    const ventas = await getProductsSales(sessionId)

    return (
        <div className="mx-auto max-w-[1200px]">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Libros</h1>
                <div className="flex items-center gap-4">
                    <ActionButton href="/gestion/nuevo-libro" text="Cargar Libro" icon="/plus.png" />
                    <p className="text-sm">
                        <b>{libros.length}</b> Libros
                    </p>
                </div>
            </div>
            <div className="mt-4 max-h-[800px] overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Generos</TableHead>
                            <TableHead>Ventas</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {libros.map(libro => (
                            <>
                                <TableRow key={libro.idLibro} className="border-b-0 border-t">
                                    <TableCell className="flex gap-3">
                                        <Image
                                            className=" h-[132px] w-[80px]"
                                            src={atob(libro.imagen)}
                                            alt={libro.titulo}
                                            width={80}
                                            height={132}
                                        />
                                        <div className="flex flex-col gap-1">
                                            <p className="text-start text-xl font-semibold tracking-tighter">
                                                {libro.titulo}
                                            </p>
                                            <p className="text-start text-sm text-gray-600">
                                                por: {libro.autores.map(({ autor }) => autor.nombreAutor).join(', ')}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {libro.generos.map(({ genero }) => genero.nombreGenero).join(', ')}
                                    </TableCell>
                                    <TableCell className="h-24 text-center">
                                        {ventas.filter((e: any) => libro.idLibro == e.ejemplar.idLibro).length}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center">
                                            <Kebab
                                                actionList={[
                                                    {
                                                        name: 'Editar',
                                                        routeTo: `/gestion/nuevo-libro/${libro.idLibro}`,
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className="-translate-y-3">
                                    <TableCell colSpan={4}>
                                        <div className="flex items-center justify-center">
                                            <Accordion type="single" collapsible className="w-full">
                                                <AccordionItem value="item-1">
                                                    <AccordionTrigger className="justify-center">
                                                        Ejemplares
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        <TablaEjemplares
                                                            ejemplares={libro.ejemplares.map(
                                                                ({
                                                                    isbn,
                                                                    precio,
                                                                    dimensiones,
                                                                    paginas,
                                                                    stock,
                                                                    editorial,
                                                                    encuadernado,
                                                                }) => ({
                                                                    isbn,
                                                                    precio,
                                                                    dimensiones,
                                                                    paginas,
                                                                    stock,
                                                                    editorial: editorial.nombreEditorial,
                                                                    encuadernado: encuadernado.tipo,
                                                                    preventDelete: true,
                                                                })
                                                            )}
                                                        />
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

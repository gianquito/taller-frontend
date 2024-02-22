import { getProducts, getProductsSales } from '@/services/graphql'
import ActionButton from './ActionButton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import Image from 'next/image'
import { formatPrice } from '@/utils'
import Kebab from './Kebab'

export default async function TablaLibrosGestion({ sessionId }: { sessionId: string }) {
    const libros = await getProducts()
    const ventas = await getProductsSales(sessionId)

    return (
        <div className="mx-auto max-w-[1200px]">
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold">Libros</h1>
                <div className="flex items-center gap-4">
                    <ActionButton href="/nuevo-libro" text="Cargar Libro" icon="/plus.png" />
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
                            <TableHead>Editoriales</TableHead>
                            <TableHead>Precio</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Ventas</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {libros.map(libro => (
                            <TableRow key={libro.isbn}>
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
                                <TableCell>
                                    {libro.editoriales.map(({ editorial }) => editorial.nombreEditorial).join(', ')}
                                </TableCell>
                                <TableCell>{formatPrice(libro.precio)}</TableCell>
                                <TableCell className="h-24 text-center">{libro.stock}</TableCell>
                                <TableCell className="h-24 text-center">
                                    {ventas.filter((l: any) => libro.isbn == l.idLibro).length}
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Kebab
                                            actionList={[
                                                {
                                                    name: 'Editar',
                                                    routeTo: `/nuevo-libro/${libro.isbn}`,
                                                },
                                            ]}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

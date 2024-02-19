import { getProducts, getProductsSales } from '@/services/graphql'
import ActionButton from './ActionButton'
import LibroGestion from './LibroGestion'

export default async function TablaLibrosGestion({ sessionId }: { sessionId: string }) {
    const libros = await getProducts()
    const ventas = await getProductsSales(sessionId)

    function getVentas(isbn: number) {
        return ventas.filter((l: any) => isbn == l.idLibro).length
    }

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
            <div className="mt-6 overflow-auto">
                <div className="grid max-h-[500px] min-w-[980px] grid-cols-7 gap-4 text-center">
                    <div className="text-xl">Nombre</div>
                    <div className="ml-16 text-xl">Genero</div>
                    <div className="text-xl">Editorial</div>
                    <div className="text-xl">Precio</div>
                    <div className="text-xl">Stock</div>
                    <div className="text-xl">Ventas</div>
                    <div className="text-xl">Acciones</div>

                    {libros.map(libro => (
                        <LibroGestion
                            key={libro.isbn}
                            libro={libro}
                            ventas={ventas.filter((l: any) => libro.isbn == l.idLibro).length}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

import { getProducts, getProductsSales } from '@/services/graphql'
import ActionButton from './ActionButton'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/utils'
import Kebab from './Kebab'
import { useRouter } from 'next/navigation'
import { libro } from '@/types/libro'

export default function LibrosGestion() {
    const [libros, setLibros] = useState<libro[]>([])
    const [ventas, setVentas] = useState([])

    const router = useRouter()

    useEffect(() => {
        getProducts().then(products => setLibros(products))
        getProductsSales().then(lineas => setVentas(lineas))
    }, [])

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
                        <>
                            <div className="flex gap-3">
                                <Image
                                    className=" h-[132px] w-[80px]"
                                    src={atob(libro.imagen)}
                                    alt={libro.titulo}
                                    width={80}
                                    height={132}
                                />
                                <div className="flex flex-col gap-1">
                                    <p className="text-start text-xl font-semibold tracking-tighter">{libro.titulo}</p>
                                    <p className="text-start text-sm text-gray-600">
                                        por: {libro.autores.map(({ autor }) => autor.nombreAutor).join(', ')}
                                    </p>
                                </div>
                            </div>
                            <p className="ml-16">{libro.generos.map(({ genero }) => genero.nombreGenero).join(', ')}</p>
                            <p>{libro.editoriales.map(({ editorial }) => editorial.nombreEditorial).join(', ')}</p>
                            <p>{formatPrice(libro.precio)}</p>
                            <p>{libro.stock}</p>
                            <p>{getVentas(libro.isbn)}</p>
                            <div className="flex justify-center">
                                <Kebab
                                    actionList={[
                                        {
                                            name: 'Editar',
                                            function: () => {
                                                router.push(`/nuevo-libro/${libro.isbn}`)
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

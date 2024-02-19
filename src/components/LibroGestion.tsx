'use client'
import { libro } from '@/types/libro'
import Image from 'next/image'
import Kebab from './Kebab'
import { useRouter } from 'next/navigation'
import { formatPrice } from '@/utils'

export default function LibroGestion({ libro, ventas }: { libro: libro; ventas: number }) {
    const router = useRouter()

    return (
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
            <p>{ventas}</p>
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
    )
}

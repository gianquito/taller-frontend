import ActionButton from '@/components/ActionButton'
import AddToCartButton from '@/components/AddToCartButton'
import EditarLibroProducto from '@/components/EditarLibroProducto'
import FavoritoButton from '@/components/FavoritoButton'
import WishListButton from '@/components/WishListButton'
import { getProduct } from '@/services/graphql'
import { calculateDiscount, formatPrice } from '@/utils'

export const dynamic = 'force-dynamic'

export default async function Libro({ params }: { params: { id: number } }) {
    const libro = await getProduct(params.id)
    const discount = calculateDiscount(libro)
    return (
        <div className="mb-32 mt-6 flex flex-1 flex-col items-center justify-evenly px-12 lg:mt-20 lg:flex-row">
            <div>
                <img className="w-[240px] lg:w-[350px]" src={atob(libro.imagen)} />
                <div className="mt-0.5 flex items-center gap-2">
                    <img src="/Star.svg" />
                    <p className="text-sm font-semibold">4,5</p>
                    <ActionButton href="/" icon="/Reseña.png" text="Reseñas" />
                </div>
            </div>
            <div className="mt-4 flex min-w-[400px] max-w-xl flex-col items-center lg:mt-0 lg:items-baseline">
                <div className="flex items-center gap-2">
                    <h1 className="text-center text-4xl font-semibold lg:text-left">{libro.titulo}</h1>
                    <EditarLibroProducto isbn={libro.isbn} />
                </div>
                <div className="mt-2 flex w-full items-center justify-evenly lg:mt-0 lg:flex-col lg:items-baseline">
                    <div className="mt-1 flex flex-col items-center gap-2 lg:flex-row">
                        {discount.hasDiscount ? (
                            <>
                                <p className="text-2xl text-neutral-500 line-through">
                                    {formatPrice(discount.originalPrice)}
                                </p>
                                <p className="text-2xl font-medium text-red-500">
                                    {formatPrice(discount.discountedPrice!)}
                                </p>
                                <p className="rounded bg-red-500 px-2 py-1 text-sm font-medium text-white">
                                    {discount.porcentaje}
                                </p>
                            </>
                        ) : (
                            <p className="text-2xl">{formatPrice(libro.precio)}</p>
                        )}
                    </div>

                    <div className="mt-1 flex flex-col gap-0.5 text-sm text-neutral-500">
                        <p>Autores: {libro.autores.map(({ autor }) => autor.nombreAutor).join(', ')}</p>
                        <p>Dimensiones: {libro.dimensiones}</p>
                        <p>
                            Editoriales:{' '}
                            {libro.editoriales.map(({ editorial }) => editorial.nombreEditorial).join(', ')}
                        </p>
                        <p>Páginas: {libro.paginas}</p>
                        <p>Géneros: {libro.generos.map(({ genero }) => genero.nombreGenero).join(', ')}</p>
                        <p>
                            Encuadernados: {libro.encuadernados.map(({ encuadernado }) => encuadernado.tipo).join(', ')}
                        </p>
                    </div>
                </div>
                <AddToCartButton libro={libro} />
                <div className="my-1 mt-2 flex gap-2 self-start">
                    <WishListButton libro={libro} />
                    <FavoritoButton libro={libro} />
                </div>
                <p className="text-2xl font-medium">Sinopsis</p>
                <p>{libro.descripcion}</p>
            </div>
        </div>
    )
}

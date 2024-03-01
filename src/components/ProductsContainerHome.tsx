import { getProductsByName, getProductsSales } from '@/services/graphql'
import ProductCardHome from './ProductCardHome'
import CargarLibroHome from './CargarLibroHome'
import GeneroFilter from './GeneroFilter'
import { getDefaultEjemplar } from '@/utils'
import OrdenarFilter from './OrdenarFilter'
import { getSsrUser } from '@/ssrUtils'

export default async function ProductsHome({
    nombre,
    genero,
    orden,
}: {
    nombre?: string
    genero: string | undefined
    orden: string | undefined
}) {
    const data = await getProductsByName(nombre ?? '')
    const products =
        genero === undefined || genero === 'Todos'
            ? data
            : data.filter(product => product.generos.find(g => g.genero.nombreGenero === genero))

    const ventas = await getProductsSales()
    const getSortedProducts = () => {
        switch (orden) {
            case 'Reseñas':
                return [...products].sort(
                    (a, b) => calculateAverageRating(b.resenias) - calculateAverageRating(a.resenias)
                )
            case 'Favoritos':
                return [...products].sort((a, b) => b.usuariosFavoritos.length - a.usuariosFavoritos.length)
            case 'A-Z':
                return [...products].sort((a, b) => a.titulo.localeCompare(b.titulo))
            default:
                return [...products].sort(
                    (a, b) =>
                        ventas.filter((e: any) => b.idLibro == e.ejemplar.idLibro).length -
                        ventas.filter((e: any) => a.idLibro == e.ejemplar.idLibro).length
                )
        }
    }
    const calculateAverageRating = (resenias: { valoracion: number }[]) => {
        if (resenias.length === 0) return 0

        const totalRating = resenias.reduce((sum, review) => sum + review.valoracion, 0)
        return totalRating / resenias.length
    }
    const sortedProducts = getSortedProducts()
    return (
        <div className="mb-12 mt-8 flex max-w-[1500px] flex-col gap-4">
            <div className="flex w-full justify-center gap-4 self-end md:w-max">
                <GeneroFilter genero={genero} />
                <OrdenarFilter orden={orden} />
            </div>
            <div className="flex flex-wrap justify-center gap-8 px-2 md:px-24">
                <CargarLibroHome />
                {sortedProducts
                    .filter(product => getDefaultEjemplar(product) !== undefined)
                    .map(product => (
                        <>
                            <ProductCardHome
                                ejemplar={getDefaultEjemplar(product)!}
                                title={product.titulo}
                                image={atob(product.imagen)}
                                id={product.idLibro}
                                price={getDefaultEjemplar(product)!.precio}
                                author={product.autores[0].autor.nombreAutor}
                                key={product.idLibro}
                            />
                        </>
                    ))}
            </div>
        </div>
    )
}

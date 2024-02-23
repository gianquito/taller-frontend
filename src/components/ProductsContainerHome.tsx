import { getProductsByName } from '@/services/graphql'
import ProductCardHome from './ProductCardHome'
import CargarLibroHome from './CargarLibroHome'
import GeneroFilter from './GeneroFilter'
import { getDefaultEjemplar } from '@/utils'

export default async function ProductsHome({ nombre, genero }: { nombre?: string; genero: string | undefined }) {
    const data = await getProductsByName(nombre ?? '')
    const products =
        genero === undefined || genero === 'Todos'
            ? data
            : data.filter(product => product.generos.find(g => g.genero.nombreGenero === genero))

    return (
        <div className="mb-12 mt-8 flex max-w-[1500px] flex-col gap-4">
            <div className="flex w-full justify-center gap-4 self-end md:w-max">
                <GeneroFilter genero={genero} />
                <div className="flex items-center border border-black px-3 py-2 md:mr-40">
                    <p className="text-sm text-gray-600">Ordenar</p>
                    <select className="outline-none">
                        <option>Popular</option>
                        <option>Reseñas</option>
                        <option>A-Z</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 px-2 md:px-24">
                <CargarLibroHome />
                {products
                    .filter(product => getDefaultEjemplar(product) !== undefined && product.autores.length > 0)
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

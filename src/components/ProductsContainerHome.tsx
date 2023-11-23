import { getProducts, getProductsByName } from '@/services/graphql'
import ProductCardHome from './ProductCardHome'
import CargarLibroHome from './CargarLibroHome'

export default async function ProductsHome({ nombre }: { nombre?: string }) {
    const products = nombre ? await getProductsByName(nombre) : await getProducts()
    return (
        <div className="mb-12 flex max-w-[1500px] flex-col gap-4">
            <div className="flex w-max gap-4 self-end">
                <div className="flex items-center border border-black px-3 py-2">
                    <p className="text-sm text-gray-600">Genero</p>
                    <select className="outline-none">
                        <option>Todos</option>
                        <option>Ficcion</option>
                    </select>
                </div>
                <div className="mr-8 flex items-center border border-black px-3 py-2 lg:mr-40">
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
                    .filter(product => product.stock > 0)
                    .map(product => (
                        <>
                            <ProductCardHome
                                title={product.titulo}
                                image={atob(product.imagen)}
                                id={product.isbn}
                                price={product.precio}
                                author={product.autores[0].autor.nombreAutor}
                                key={product.isbn}
                            />
                        </>
                    ))}
            </div>
        </div>
    )
}

import ClientNavigator from '@/components/ClientNavigator'
import ProductCardFavorites from '@/components/ProductCardFavorites'
import { getFavoritos } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'
import { libro } from '@/types/libro'
import { getDefaultEjemplar } from '@/utils'

export default async function Favoritos() {
    const user = await getSsrUser()
    if (!user) return <ClientNavigator route="/" />

    const products: { libro: libro }[] = await getFavoritos(user.idUsuario, user.sessionId)

    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col px-4 md:w-3/4 md:px-0">
                <h1 className="ml-4 self-start text-4xl font-semibold tracking-tighter md:ml-0">Favoritos</h1>
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-10 md:justify-normal md:gap-8">
                    {!products.length && 'Tu lista de favoritos está vacia'}
                    {products.map(({ libro }) =>
                        getDefaultEjemplar(libro) != undefined ? (
                            <ProductCardFavorites
                                title={libro.titulo}
                                image={atob(libro.imagen)}
                                id={libro.idLibro}
                                price={getDefaultEjemplar(libro)!.precio}
                                author={libro.autores[0].autor.nombreAutor}
                                key={libro.idLibro}
                                id_usuario={user.idUsuario}
                                ejemplar={getDefaultEjemplar(libro)!}
                            />
                        ) : null
                    )}
                </div>
            </div>
        </div>
    )
}

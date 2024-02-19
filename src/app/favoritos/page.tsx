import ClientNavigator from '@/components/ClientNavigator'
import ProductCardFavorites from '@/components/ProductCardFavorites'
import { getFavoritos } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'
import { libro } from '@/types/libro'

export default async function Favoritos() {
    const user = await getSsrUser()
    if (!user) return <ClientNavigator route="/" />

    const products: { libro: libro }[] = await getFavoritos(user.idUsuario, user.sessionId)

    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col px-8 md:w-3/4 md:px-0">
                <h1 className="self-start text-4xl font-semibold tracking-tighter">Favoritos</h1>
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-10 md:justify-normal md:gap-8">
                    {!products.length && 'Tu lista de favoritos está vacia'}
                    {products.map(({ libro }) => (
                        <ProductCardFavorites
                            title={libro.titulo}
                            image={atob(libro.imagen)}
                            id={libro.isbn}
                            price={libro.precio}
                            author={libro.autores[0].autor.nombreAutor}
                            key={libro.isbn}
                            id_usuario={user.idUsuario}
                            libro={libro}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

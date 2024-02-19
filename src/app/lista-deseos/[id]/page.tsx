import ClientNavigator from '@/components/ClientNavigator'
import ProductCardWishlist from '@/components/ProductCardDeseos'
import ShareWishlistButton from '@/components/ShareWishlistButton'
import { getUserById, getWishlist } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'
import { libro } from '@/types/libro'

export const dynamic = 'force-dynamic'

export default async function ListaDeseos({ params }: { params: { id: string } }) {
    const user = await getSsrUser()
    const listUser = await getUserById(params.id)
    const products: { idUsuario: string; libro: libro }[] = await getWishlist(params.id)

    if (!listUser) return <ClientNavigator route="/" />

    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col px-8 md:w-3/4 md:px-0">
                <div className="flex flex-col justify-between md:flex-row">
                    <h1 className="self-start text-4xl font-semibold tracking-tighter">
                        Lista de deseos de {listUser?.nombre}
                    </h1>
                    <ShareWishlistButton />
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-4 md:mt-10 md:justify-normal md:gap-8">
                    {!products.length && 'La lista de deseos está vacia'}
                    {products.map(({ libro }) => (
                        <ProductCardWishlist
                            title={libro.titulo}
                            image={atob(libro.imagen)}
                            id={libro.isbn}
                            price={libro.precio}
                            author={libro.autores[0].autor.nombreAutor}
                            key={libro.isbn}
                            id_usuario={user ? user.idUsuario : undefined}
                            libro={libro}
                            id_lista={params.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

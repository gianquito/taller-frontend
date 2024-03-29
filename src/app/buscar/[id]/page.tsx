import ProductsContainerHome from '@/components/ProductsContainerHome'

export const dynamic = 'force-dynamic'

export default function Buscar({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams?: { [key: string]: string }
}) {
    return (
        <div className="flex justify-center">
            <div>
                <p className="mt-6 text-center md:ml-40 md:text-start">
                    Resultados para:
                    <b className="capitalize"> {decodeURI(params.id)}</b>
                </p>
                <ProductsContainerHome
                    nombre={decodeURI(params.id)}
                    genero={searchParams?.genero}
                    orden={searchParams?.orden}
                />
            </div>
        </div>
    )
}

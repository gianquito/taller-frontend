import ProductsContainerHome from '@/components/ProductsContainerHome'

export const dynamic = 'force-dynamic'

export default function Buscar({ params }: { params: { id: string } }) {
    return (
        <div className="flex justify-center">
            <div>
                <p className="mt-6 text-center md:ml-40 md:text-start">
                    Resultados para:
                    <b className="capitalize"> {decodeURI(params.id)}</b>
                </p>
                <ProductsContainerHome nombre={decodeURI(params.id)} />
            </div>
        </div>
    )
}

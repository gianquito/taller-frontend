import ProductsContainerHome from '@/components/ProductsContainerHome'

export const dynamic = 'force-dynamic'

export default function Buscar({ params }: { params: { id: string } }) {
    return (
        <div className="my-16 flex justify-center">
            <ProductsContainerHome nombre={decodeURI(params.id)} />
        </div>
    )
}

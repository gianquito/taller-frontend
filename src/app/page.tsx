import ProductsContainerHome from '@/components/ProductsContainerHome'
import PromocionBanner from '@/components/PromocionBanner'

export const dynamic = 'force-dynamic'

export default function Home({ searchParams }: { searchParams?: { [key: string]: string } }) {
    return (
        <main>
            <PromocionBanner />
            <div className="flex justify-center">
                <ProductsContainerHome genero={searchParams?.genero} orden={searchParams?.orden}/>
            </div>
        </main>
    )
}

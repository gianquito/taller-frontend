import ProductsContainerHome from '@/components/ProductsContainerHome'
import PromocionBanner from '@/components/PromocionBanner'

export default function Home() {
    return (
        <main>
            <PromocionBanner />
            <div className="flex justify-center">
                <ProductsContainerHome />
            </div>
        </main>
    )
}

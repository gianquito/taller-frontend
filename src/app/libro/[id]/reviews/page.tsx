import ClientNavigator from '@/components/ClientNavigator'
import Review from '@/components/Review'
import ReviewForm from '@/components/ReviewForm'
import { getReviews } from '@/services/graphql'
import { getSsrUser } from '@/ssrUtils'
import clearCachesByServerAction from './revalidate'

export const dynamic = 'force-dynamic'

export default async function Reviews({ params }: { params: { id: number } }) {
    const [reviews, libro] = await getReviews(params.id)
    const user = await getSsrUser()
    if (!libro) {
        return <ClientNavigator route="/" />
    }
    return (
        <div className="my-8 flex flex-col flex-wrap items-center md:my-16">
            <div className="flex flex-col items-center justify-center px-8 md:w-3/4 md:px-0 xl:items-start">
                <h1 className="self-start text-4xl font-semibold tracking-tighter">Reseñas sobre {libro.titulo}</h1>
                <div className="mt-10 flex gap-2">
                    {reviews.length > 0 &&
                        [
                            ...Array(
                                Math.round(
                                    reviews.map(review => review.valoracion).reduce((curr, acc) => acc + curr, 0) /
                                        reviews.length
                                )
                            ),
                        ].map((_, idx) => <img src="/Star_lleno.svg" key={idx} />)}
                </div>
                <div className="mt-4 flex w-full flex-col items-center justify-center xl:flex-row xl:items-start xl:justify-between">
                    <div className="flex flex-col gap-6">
                        <p className="text-[28px] font-semibold leading-none">
                            {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
                        </p>
                        <div className="flex flex-col gap-2 tabular-nums">
                            <div className="flex items-center gap-3 font-medium">
                                <p className="text-xl">5 estrellas</p>
                                <div className="h-[1.5px] w-20 bg-[#C4C4C4]"></div>
                                <p className="text-xl">({reviews.filter(review => review.valoracion === 5).length})</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium">
                                <p className="text-xl">4 estrellas</p>
                                <div className="h-[1.5px] w-20 bg-[#C4C4C4]"></div>
                                <p className="text-xl">({reviews.filter(review => review.valoracion === 4).length})</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium">
                                <p className="text-xl">3 estrellas</p>
                                <div className="h-[1.5px] w-20 bg-[#C4C4C4]"></div>
                                <p className="text-xl">({reviews.filter(review => review.valoracion === 3).length})</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium">
                                <p className="text-xl">2 estrellas</p>
                                <div className="h-[1.5px] w-20 bg-[#C4C4C4]"></div>
                                <p className="text-xl">({reviews.filter(review => review.valoracion === 2).length})</p>
                            </div>
                            <div className="flex items-center gap-3 font-medium">
                                <p className="text-xl">1 estrella</p>
                                <div className="h-[1.5px] w-20 bg-[#C4C4C4]"></div>
                                <p className="text-xl">({reviews.filter(review => review.valoracion === 1).length})</p>
                            </div>
                        </div>
                    </div>
                    <div className="my-8 flex flex-col gap-8 xl:mt-0">
                        {!reviews.length && <p className="text-lg">Este libro aún no tiene reseñas.</p>}
                        {reviews.map((review, idx) => (
                            <Review
                                key={idx}
                                reviewUser={review.usuario}
                                score={review.valoracion}
                                text={review.texto}
                                user={user}
                                idLibro={params.id}
                            />
                        ))}
                        <ReviewForm idLibro={params.id} user={user} revalidate={clearCachesByServerAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

import { userType } from '@/types/user'
import DeleteReviewButton from './DeleteReviewButton'
import clearCachesByServerAction from '@/app/libro/[id]/reviews/revalidate'

interface ReviewProps {
    reviewUser: { idUsuario: string; nombre: string; apellido: string }
    score: number
    text: string
    user: userType | undefined
    idLibro: number
}

export default function Review({ reviewUser, score, text, user, idLibro }: ReviewProps) {
    return (
        <div className="flex flex-col gap-2 xl:w-[700px]">
            <div className="flex gap-2">
                {[...Array(score)].map((_, idx) => (
                    <img src="/Star_lleno.svg" className="w-5" key={idx} />
                ))}
            </div>
            <p className="text-sm font-medium text-neutral-700">{`${reviewUser.nombre} ${reviewUser.apellido}`}</p>
            <p className="font-medium">{text}</p>
            <DeleteReviewButton
                user={user}
                reviewUser={reviewUser}
                idLibro={idLibro}
                revalidate={clearCachesByServerAction}
            />
        </div>
    )
}

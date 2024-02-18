interface ReviewProps {
    user: string
    score: number
    text: string
}

export default function Review({ user, score, text }: ReviewProps) {
    return (
        <div className="flex flex-col gap-2 xl:w-[700px]">
            <div className="flex gap-2">
                {[...Array(score)].map((_, idx) => (
                    <img src="/Star_lleno.svg" className="w-5" key={idx} />
                ))}
            </div>
            <p className="text-sm font-medium text-neutral-700">{user}</p>
            <p className="font-medium">{text}</p>
        </div>
    )
}

import { useEffect, useState } from 'react'

interface StarsInputProps {
    selectedRating: 0 | 1 | 2 | 3 | 4 | 5
    setSelectedRating: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3 | 4 | 5>>
}

export default function StarsInput({ selectedRating, setSelectedRating }: StarsInputProps) {
    const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0)

    useEffect(() => {
        function handleEvent(e: MouseEvent) {
            switch ((e.target as HTMLImageElement).id) {
                case 'star1':
                    e.type === 'mouseover' ? setRating(1) : setSelectedRating(1)
                    break
                case 'star2':
                    e.type === 'mouseover' ? setRating(2) : setSelectedRating(2)
                    break
                case 'star3':
                    e.type === 'mouseover' ? setRating(3) : setSelectedRating(3)
                    break
                case 'star4':
                    e.type === 'mouseover' ? setRating(4) : setSelectedRating(4)
                    break
                case 'star5':
                    e.type === 'mouseover' ? setRating(5) : setSelectedRating(5)
                    break
                default:
                    if ((e.target as HTMLImageElement).id !== 'starContainer' && e.type === 'mouseover')
                        setRating(selectedRating)
                    break
            }
        }

        document.addEventListener('mouseover', handleEvent)
        document.addEventListener('click', handleEvent)
        return () => {
            document.removeEventListener('mouseover', handleEvent)
            document.removeEventListener('click', handleEvent)
        }
    }, [selectedRating])

    return (
        <div className="flex items-center gap-3" id="starContainer">
            <p className="font-medium">{rating > 0 && `${rating} ${rating === 1 ? 'estrella' : 'estrellas'}`}</p>
            <img
                src="/Star_lleno.svg"
                draggable={false}
                id="star1"
                className={`${rating >= 1 ? 'opacity-100' : 'opacity-40'} cursor-pointer`}
            />
            <img
                src="/Star_lleno.svg"
                draggable={false}
                id="star2"
                className={`${rating >= 2 ? 'opacity-100' : 'opacity-40'} cursor-pointer`}
            />
            <img
                src="/Star_lleno.svg"
                draggable={false}
                id="star3"
                className={`${rating >= 3 ? 'opacity-100' : 'opacity-40'} cursor-pointer`}
            />
            <img
                src="/Star_lleno.svg"
                draggable={false}
                id="star4"
                className={`${rating >= 4 ? 'opacity-100' : 'opacity-40'} cursor-pointer`}
            />
            <img
                src="/Star_lleno.svg"
                draggable={false}
                id="star5"
                className={`${rating >= 5 ? 'opacity-100' : 'opacity-40'} cursor-pointer`}
            />
        </div>
    )
}

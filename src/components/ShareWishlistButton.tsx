'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import toast from 'react-hot-toast'

export default function ShareWishlistButton() {
    const [showShareMenu, setShowShareMenu] = useState(false)
    const ref = useDetectClickOutside({ onTriggered: () => setShowShareMenu(false) })
    const router = useRouter()
    return (
        <div className="relative flex select-none self-end" ref={ref}>
            <div
                className="flex h-10 cursor-pointer items-center gap-2.5 border-[1.5px] border-black px-4"
                onClick={() => setShowShareMenu(prev => !prev)}
            >
                <img className="w-4" src="/share.png" />
                <p className="text-sm font-semibold">Compartir</p>
            </div>
            {showShareMenu && (
                <div className="absolute flex w-full -translate-x-4 translate-y-11 flex-col gap-1 border border-black bg-white px-4 py-2">
                    <p
                        onClick={() => {
                            navigator.clipboard.writeText(document.location.href)
                            toast.success('Link copiado al portapapeles')
                            setShowShareMenu(false)
                        }}
                        className="cursor-pointer text-sm hover:underline"
                    >
                        Copiar Link
                    </p>
                    <p
                        onClick={() => {
                            router.push(
                                `https://twitter.com/intent/tweet?text=${encodeURI(
                                    'Echa un vistazo a mi lista de deseos en LibrosCdelU ' + document.location.href
                                )}`
                            )
                        }}
                        className="cursor-pointer text-sm hover:underline"
                    >
                        Twitter
                    </p>
                    <p
                        onClick={() => {
                            router.push(
                                `https://www.facebook.com/sharer/sharer.php?u=${encodeURI(document.location.href)}`
                            )
                        }}
                        className="cursor-pointer text-sm hover:underline"
                    >
                        Facebook
                    </p>
                </div>
            )}
        </div>
    )
}

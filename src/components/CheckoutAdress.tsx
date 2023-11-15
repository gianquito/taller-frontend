'use client'
import Image from 'next/image'
import { useState } from 'react'

interface CheckoutAdressProps {
    calle: string
    numero: number
    cp: number
    ciudad: string
    isSelected: boolean
    toggle: () => void
}

export default function CheckoutAdress({ calle, numero, cp, ciudad, isSelected, toggle }: CheckoutAdressProps) {
    return (
        <div
            className="flex w-[350px] gap-5 border-2 border-black px-5 py-3 tracking-tight md:w-[400px]"
            onClick={toggle}
        >
            <div className="mt-2 h-[23px] w-[23px] cursor-pointer select-none border border-black p-[3px] hover:bg-neutral-200">
                {isSelected && <Image src="/check.svg" alt="check" width={17} height={17} />}
            </div>
            <div>
                <p>{`${calle} ${numero}, CP ${cp}`}</p>
                <p>{ciudad}</p>
                <p>$1200</p>
            </div>
        </div>
    )
}

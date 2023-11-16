import Link from 'next/link'

interface ActionButtonProps {
    icon: string
    text: string
    href: string
}
export default function ActionButton({ icon, text, href }: ActionButtonProps) {
    return (
        <Link className="flex w-max items-center gap-2.5 border-[1.5px] border-black px-3 py-2" href={href}>
            <img className="w-3.5" src={icon} />
            <p className="text-xs font-semibold">{text}</p>
        </Link>
    )
}

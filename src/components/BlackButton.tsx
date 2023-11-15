export default function BlackButton({
    text,
    className,
    onClick,
    disabled,
}: {
    text: string
    className?: string
    onClick?: () => void
    disabled?: boolean
}) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={`w-full bg-black py-4 text-center font-semibold text-white ${
                disabled && 'bg-neutral-700'
            } ${className}`}
        >
            {disabled ? 'Sin Stock' : text}
        </button>
    )
}

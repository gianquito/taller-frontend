export default function BlackButton({
    text,
    className,
    onClick,
    disabled,
    disabledText,
}: {
    text: string
    className?: string
    onClick?: () => void
    disabled?: boolean
    disabledText?: string
}) {
    return (
        <button
            onClick={disabled ? undefined : onClick}
            className={`w-full bg-black py-4 text-center font-semibold text-white ${
                disabled && 'cursor-default bg-neutral-700'
            } ${className}`}
        >
            {disabled ? disabledText : text}
        </button>
    )
}

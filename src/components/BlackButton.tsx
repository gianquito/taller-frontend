export default function BlackButton({ text, className }: { text: string; className?: string }) {
    return <button className={`w-full bg-black py-4 text-center font-semibold text-white ${className}`}>{text}</button>
}

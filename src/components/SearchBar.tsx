import { useRouter } from 'next/navigation'

export default function SearchBar() {
    const router = useRouter()
    function handleSubmit(e: any) {
        router.push(`/buscar/${e.target.value}`)
    }

    return (
        <div className="order-2 flex w-full items-center rounded-3xl border-2 border-black bg-white px-2 md:order-none md:w-[30rem]">
            <img className="px-3 py-3" alt="search" src="/SearchIcon.svg" />
            <input
                className="h-max w-full rounded-r-3xl bg-white text-base placeholder-neutral-400 outline-none "
                type="text"
                onKeyDown={e => e.key === 'Enter' && handleSubmit(e)}
                onSubmit={e => handleSubmit(e)}
                placeholder="Buscar"
            />
        </div>
    )
}

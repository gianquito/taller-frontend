export default function SearchBar() {
    return (
        <div className="order-1 flex w-[30rem] items-center rounded-3xl bg-[#D9D9D9] px-2 md:order-none">
            <img className="px-3 py-3" alt="search" src="SearchIcon.svg" />
            <input
                className="h-max w-full rounded-r-3xl bg-[#D9D9D9] text-base placeholder-neutral-400 outline-none "
                type="text"
                placeholder="Buscar por Titulo, Autor"
            />
        </div>
    )
}

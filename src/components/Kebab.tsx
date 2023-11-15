import { useState } from 'react'

interface Action {
    name: string
    function: () => void
}

export default function Kebab({ actionList }: { actionList: Action[] }) {
    const [showMenu, setShowMenu] = useState(false)
    function handleClick() {
        setShowMenu(!showMenu)
    }

    return (
        <div>
            <div className="flex flex-shrink-0 cursor-pointer flex-col gap-1" onClick={handleClick}>
                <div className="h-2 w-2 rounded-full bg-black"></div>
                <div className="h-2 w-2 rounded-full bg-black"></div>
                <div className="h-2 w-2 rounded-full bg-black"></div>
            </div>
            {showMenu && (
                <div className="absolute flex -translate-x-20 flex-col gap-1 border border-black bg-white px-3 py-2">
                    {actionList.map(action => (
                        <p
                            onClick={action.function}
                            className="cursor-pointer text-sm hover:underline"
                            key={action.name}
                        >
                            {action.name}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

import { SERVER_URL } from '@/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MicrosoftLoginButton() {
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()

    const code = searchParams.get('code')
    useEffect(() => {
        async function getLoader() {
            const { ring } = await import('ldrs')
            ring.register()
        }
        getLoader()

        if (code) {
            setIsLoading(true)
            fetch(`${SERVER_URL}/validateMs`, { method: 'POST', body: code })
                .then(res => res.text())
                .then(data => {
                    if (data.includes('error')) return
                    const d = new Date()
                    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
                    document.cookie = `sesionId=${data}; expires=${d.toUTCString()}; path=/; SameSite=None; Secure`
                    setIsLoading(false)
                    document.location.href = '/'
                })
                .catch(err => {
                    setIsLoading(false)
                })
        }
    }, [])

    function handleClick() {
        router.push(
            'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=10f88338-8bd0-45ac-a3c9-5f68ca25dc8b&response_type=code&redirect_uri=http://localhost:3000/ingresar&response_mode=query&scope=user.read'
        )
    }

    return (
        <div
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-white py-3"
            onClick={handleClick}
        >
            {isLoading ? (
                <l-ring size="24" stroke="3" speed="2" color="black" bg-opacity="0"></l-ring>
            ) : (
                <>
                    <img className="h-4 w-4" src="/microsoft.png" />
                    <p>Continuar con Microsoft</p>
                </>
            )}
        </div>
    )
}

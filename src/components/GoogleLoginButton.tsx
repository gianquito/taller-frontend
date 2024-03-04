'use client'
import { SERVER_URL } from '@/utils'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'

export default function GoogleLoginButton() {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        async function getLoader() {
            const { ring } = await import('ldrs')
            ring.register()
        }
        getLoader()
    }, [])

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            fetch(`${SERVER_URL}/validate`, {
                method: 'POST',
                body: tokenResponse.code,
            })
                .then(res => res.text())
                .then(async data => {
                    const d = new Date()
                    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
                    document.cookie = `sesionId=${data}; expires=${d.toUTCString()}; path=/; SameSite=None; Secure`
                    setIsLoading(false)
                    document.location.href = '/'
                })
                .catch(err => {
                    setIsLoading(false)
                })
        },
        onNonOAuthError: () => {
            setIsLoading(false)
        },
        flow: 'auth-code',
    })

    return (
        <div
            className="flex cursor-pointer justify-center gap-2 rounded-md bg-white py-3"
            onClick={() => {
                setIsLoading(true)
                googleLogin()
            }}
        >
            {isLoading ? (
                <l-ring size="24" stroke="3" speed="2" color="black" bg-opacity="0"></l-ring>
            ) : (
                <>
                    <img src="Google.svg" />
                    <p>Continuar con Google</p>
                </>
            )}
        </div>
    )
}

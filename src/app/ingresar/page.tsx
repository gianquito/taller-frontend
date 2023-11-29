'use client'

import { useAuth } from '@/context/authContext'
import { getUserBySesion } from '@/services/graphql'
import { useGoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'

export default function Ingresar() {
    const [isLoading, setIsLoading] = useState(false)
    const { login } = useAuth()

    useEffect(() => {
        async function getLoader() {
            const { ring } = await import('ldrs')
            ring.register()
        }
        getLoader()
    }, [])

    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse)
            fetch('http://localhost:5000/validate', {
                method: 'POST',
                body: tokenResponse.code,
            })
                .then(res => res.text())
                .then(async data => {
                    const d = new Date()
                    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
                    document.cookie = `sesionId=${data}; expires=${d.toUTCString()}; path=/; SameSite=None; Secure`

                    const user = await getUserBySesion(data)
                    if (!user) return
                    login({
                        ...user,
                    })
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        },
        onNonOAuthError: () => {
            setIsLoading(false)
        },
        flow: 'auth-code',
    })

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex h-[260px] w-[360px] flex-col justify-center gap-4 rounded-lg border bg-[url('../../public/LoginBg.png')] bg-cover bg-center bg-no-repeat px-6 md:h-[305px] md:w-[460px] md:px-12">
                <p className="text-center text-2xl font-semibold text-white">Ingresar</p>
                <div className="flex cursor-pointer justify-center gap-2 rounded-md bg-white py-3">
                    <img src="Facebook.svg" />
                    <p>Continuar con Facebook</p>
                </div>
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
            </div>
        </div>
    )
}

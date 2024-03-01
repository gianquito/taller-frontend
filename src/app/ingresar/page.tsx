'use client'

import MicrosoftLoginButton from '@/components/MicrosoftLoginButton'
import GoogleLoginButton from '@/components/GoogleLoginButton'
import { GoogleOAuthProvider } from '@react-oauth/google'
export default function Ingresar() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex h-[260px] w-[360px] flex-col justify-center gap-4 rounded-lg border bg-[url('../../public/LoginBg.png')] bg-cover bg-center bg-no-repeat px-6 md:h-[305px] md:w-[460px] md:px-12">
                <p className="text-center text-2xl font-semibold text-white">Ingresar</p>
                <MicrosoftLoginButton />
                <GoogleOAuthProvider clientId="922082614639-te6q4juqlgmiqomf96n0jq2p2go4bnqa.apps.googleusercontent.com">
                    <GoogleLoginButton />
                </GoogleOAuthProvider>
            </div>
        </div>
    )
}

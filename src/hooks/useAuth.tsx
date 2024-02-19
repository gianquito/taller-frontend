import { getUserBySesion } from '@/services/graphql'
import { userType } from '@/types/user'
import { getCookie } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useClientAuth(preventRedirect?: boolean) {
    const [user, setUser] = useState<userType | undefined>(undefined)
    const router = useRouter()
    useEffect(() => {
        const sessionId = getCookie('sesionId')
        if (!sessionId) {
            !preventRedirect && router.push('/ingresar')
            return
        }
        getUserBySesion(sessionId).then(res => {
            if (res) {
                setUser(res)
                return
            }
            !preventRedirect && router.push('/ingresar')
        })
    }, [])
    return user
}

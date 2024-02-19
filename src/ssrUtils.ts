import { cookies } from 'next/headers'
import { getUserBySesion } from './services/graphql'
import 'server-only'
export async function getSsrUser() {
    const cookie = cookies()
    const sessionId = cookie.get('sesionId')?.value
    if (!sessionId) return undefined
    const user = await getUserBySesion(sessionId)
    if (!user) return undefined
    return { ...user, sessionId }
}

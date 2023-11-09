'use client'

import React, { ReactNode, createContext, useContext, useReducer, useEffect } from 'react'
import { userType } from '@/types/user'
import { useRouter } from 'next/navigation'
import { getUser } from '@/services/graphql'
import { getCookie } from '@/utils'
const initialState = {
    isAuthenticated: false,
    user: null,
}

// @ts-ignore
const AuthContext = createContext<{
    isAuthenticated: boolean
    user: userType
    login: (user: userType) => void
    logout: () => void
}>()

const authReducer = (state: any, action: { type: 'LOGIN' | 'LOGOUT'; payload?: userType }) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        default:
            return state
    }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState)
    const router = useRouter()

    useEffect(() => {
        async function setUser() {
            const sesionId = getCookie('sesionId')
            if (!sesionId) return
            const user = await getUser(sesionId)
            if (!user) return
            dispatch({ type: 'LOGIN', payload: { ...user } })
        }
        setUser()
    }, [])

    const login = (user: userType) => {
        dispatch({ type: 'LOGIN', payload: user })
        router.push('/')
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        fetch('http://localhost:5000/logout', {
            method: 'POST',
            body: getCookie('sesionId'),
        })
        router.push('/')
    }

    return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
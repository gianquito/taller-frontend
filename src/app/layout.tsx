'use client'

import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/context/authContext'
import { GoogleOAuthProvider } from '@react-oauth/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <title>LibrosCdelU</title>
                <meta name="description" content="E-Commerce LibrosCdelU" />
            </head>
            <body className={inter.className + 'bg-red flex h-screen flex-col justify-between'}>
                <GoogleOAuthProvider clientId="922082614639-te6q4juqlgmiqomf96n0jq2p2go4bnqa.apps.googleusercontent.com">
                    <AuthProvider>
                        <Navbar />
                        <main className="mb-auto">{children}</main>
                        <Footer />
                    </AuthProvider>
                </GoogleOAuthProvider>
            </body>
        </html>
    )
}

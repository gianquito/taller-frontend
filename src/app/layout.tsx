import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'LibrosCdelU',
    description: 'E-Commerce LibrosCdelU',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={inter.className + 'bg-red flex h-screen flex-col justify-between'}>
                <Navbar />
                <main className="mb-auto">{children}</main>
                <Footer />
            </body>
        </html>
    )
}

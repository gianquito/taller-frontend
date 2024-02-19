import Navbar from '@/app/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <head>
                <title>LibrosCdelU</title>
                <meta name="description" content="E-Commerce LibrosCdelU" />
            </head>
            <body className={inter.className + ' bg-red flex h-screen flex-col justify-between'}>
                <Navbar />
                <Toaster position="top-center" reverseOrder={false} />
                <main className="mb-auto">{children}</main>
                <Footer />
            </body>
        </html>
    )
}

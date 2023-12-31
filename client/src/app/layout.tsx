import './globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import NextAuthProvider from '@/providers/NextAuthProvider'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Job Fair',
	description: 'Generated by create next app'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const nextAuthSession = await getServerSession(authOptions)

	return (
		<html lang="en">
			<body className={inter.className}>
				<NextAuthProvider session={nextAuthSession}>
					<ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
					<div className="bg-gradient-to-br from-cyan-500 to-sky-600 min-h-screen pb-0.5">
						<Navbar />
						{children}
					</div>
				</NextAuthProvider>
			</body>
		</html>
	)
}

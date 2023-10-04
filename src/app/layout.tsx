import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Job Fair',
	description: 'Generated by create next app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="bg-gradient-to-br from-sky-500 to-sky-600 min-h-screen">
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	)
}

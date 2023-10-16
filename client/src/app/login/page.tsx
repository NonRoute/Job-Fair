'use client'
import Center from '@/components/Center'
import { TextField } from '@mui/material'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'

export default function Login() {
	const email = useRef('')
	const password = useRef('')

	return (
		<div>
			<Center header="Login">
				<TextField
					label="Email"
					type="email"
					variant="filled"
					onChange={(e) => (email.current = e.target.value)}
				/>
				<TextField
					label="Password"
					type="password"
					variant="filled"
					onChange={(e) => (password.current = e.target.value)}
				/>
				<div className="flex flex-col gap-1">
					<button
						className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
						onClick={async () =>
							await signIn('credentials', {
								email: email.current,
								password: password.current,
								redirect: true,
								callbackUrl: '/'
							})
						}
					>
						Login
					</button>
					<Link href="/register" className="text-sky-600 font-semibold underline ml-auto">
						Doesn’t have an account? Register here
					</Link>
				</div>
			</Center>
		</div>
	)
}

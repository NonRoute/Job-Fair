'use client'
import Center from '@/components/Center'
import { TextField } from '@mui/material'
import { error } from 'console'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
	const email = useRef('')
	const password = useRef('')

	const router = useRouter()

	const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await signIn('credentials', {
			email: email.current,
			password: password.current,
			redirect: false
		})
		if (response?.ok) {
			toast.success('Login success')
			router.push('/')
		} else {
			console.error(response)
			toast.error('Login failed')
		}
	}

	return (
		<form onSubmit={onLogin}>
			<Center header="Login">
				<TextField required label="Email" type="email" variant="filled" onChange={(e) => (email.current = e.target.value)} />
				<TextField required label="Password" type="password" variant="filled" onChange={(e) => (password.current = e.target.value)} />
				<div className="flex flex-col gap-1">
					<button
						type="submit"
						className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
					>
						Login
					</button>
					<Link href="/register" className="text-sky-600 font-semibold underline ml-auto">
						Doesn’t have an account? Register here
					</Link>
				</div>
			</Center>
		</form>
	)
}

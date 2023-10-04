import Center from '@/components/Center'
import { TextField } from '@mui/material'
import Link from 'next/link'

export default function Login() {
	return (
		<div>
			<Center header="Login">
				<TextField label="Email" variant="filled" />
				<TextField label="Password" type="password" variant="filled" />
				<div className="flex flex-col gap-1">
					<button className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg">
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

import Center from '@/components/Center'
import { TextField } from '@mui/material'
import Link from 'next/link'

export default function Register() {
	return (
		<div>
			<Center header="Register">
				<TextField label="Name" variant="filled" />
				<TextField label="Telephone Number" type="number" variant="filled" />
				<TextField label="Email" type="email" variant="filled" />
				<TextField label="Password" type="password" variant="filled" />
				<div className="flex flex-col gap-1">
					<button className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg">
						Register
					</button>
					<Link href="/login" className="text-sky-600 font-semibold underline ml-auto">
						Already have an account? Login here
					</Link>
				</div>
			</Center>
		</div>
	)
}

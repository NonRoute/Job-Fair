'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { PiBagFill } from 'react-icons/pi'
import { BiSolidUser } from 'react-icons/bi'

export default function Navbar() {
	const { data: session, status } = useSession()

	return (
		<div className="bg-white h-14 text-black flex items-center justify-between p-4 shadow">
			<div className="flex items-center gap-3">
				<Link href="/" className="flex items-center gap-3">
					<PiBagFill className="text-4xl" />
					<div className="font-bold text-3xl whitespace-nowrap">Job Fair</div>
				</Link>
				<div className="flex gap-4 mx-4 font-semibold">
					<Link href="/interview">My interview</Link>
					<Link href="/create">Create company</Link>
				</div>
			</div>
			{session ? (
				<div className="flex gap-4">
					<div className="flex gap-2 items-center">
						<BiSolidUser />
						{session?.user?.name}
					</div>
					<button
						onClick={() => signOut()}
						className="border-sky-600 border-2 py-1 px-3 text-sky-600 font-semibold rounded-md hover:bg-slate-200"
					>
						Logout
					</button>
				</div>
			) : (
				<button
					onClick={() => signIn()}
					className="border-sky-500 border-2 py-1 px-3 text-sky-600 font-semibold rounded-md hover:bg-slate-200"
				>
					Login
				</button>
			)}
		</div>
	)
}

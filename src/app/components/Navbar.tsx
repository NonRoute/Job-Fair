import Link from 'next/link'
import { PiBagFill } from 'react-icons/pi'

export default function Navbar() {
	return (
		<div className="bg-white h-14 text-black flex items-center justify-between p-4 shadow">
			<div className="flex items-center gap-3">
				<PiBagFill className="text-4xl" />
				<div className="font-bold text-3xl">Job Fair</div>
				<div className="flex gap-4 ml-4 font-semibold">
					<Link href="/interview">My interview</Link>
					<Link href="/create">Create company</Link>
				</div>
			</div>
			<Link
				href="/login"
				className="border-sky-600 border-2 py-1 px-3 text-sky-600 font-semibold rounded-md hover:bg-slate-200"
			>
				Login
			</Link>
			{/* <Link
				href="/logout"
				className="border-sky-600 border-2 py-1 px-3 text-sky-600 font-semibold rounded-md hover:bg-slate-200"
			>
				Logout
			</Link> */}
		</div>
	)
}

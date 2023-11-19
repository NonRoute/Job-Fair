import { FaUser } from "react-icons/fa";
import Link from "next/link";

export function SessionSlot({ session, mode }: { session: any; mode: string }) {
	return (
		<Link
			href={`/edit-session/${session._id}`}
			className={`flex gap-2 items-center justify-center border-2 border-sky-600 rounded-lg p-1 font-semibold w-[130px] ${
				session.user ? "text-white bg-sky-600 hover:bg-sky-500" : "text-sky-600 hover:bg-slate-200"
			}`}
			key={session._id}
		>
			{session.user && <FaUser />}
			{new Date(session.bookingStart).getHours()}:
			{new Date(session.bookingStart).getMinutes().toString().padStart(2, "0")} -{" "}
			{new Date(session.bookingEnd).getHours()}:
			{new Date(session.bookingEnd).getMinutes().toString().padStart(2, "0")}
		</Link>
	);
}

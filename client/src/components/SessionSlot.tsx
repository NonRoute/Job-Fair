import { FaUser } from "react-icons/fa";
import Link from "next/link";

export function SessionSlot({
	session,
	sessionId,
	mode,
	isActive,
	onSetActive
}: {
	session: any;
	sessionId?: string;
	mode: string;
	isActive: boolean;
	onSetActive: () => void;
}) {
	if (mode == "add") {
		return (
			<Link
				href={`/edit-session/${session._id}`}
				className={`flex gap-2 items-center justify-center border-2 border-sky-600 rounded-lg p-1 font-semibold w-[140px] 
				${session.user ? "text-white bg-sky-600 hover:bg-sky-500" : "text-sky-600 hover:bg-slate-200"}`}
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
	if (mode == "book") {
		return (
			<div>
				<button
					onClick={onSetActive}
					className={`flex gap-2 items-center justify-center border-2 rounded-lg p-1 font-semibold w-[140px]
				${
					session.user
						? "text-white bg-slate-400 cursor-not-allowed"
						: isActive
						  ? "text-white bg-sky-600 hover:bg-sky-500"
						  : "border-sky-600 text-sky-600 bg-white hover:bg-slate-200"
				}`}
					key={session._id}
					disabled={session.user}
				>
					{session.user && <FaUser />}
					{new Date(session.bookingStart).getHours()}:
					{new Date(session.bookingStart).getMinutes().toString().padStart(2, "0")} -{" "}
					{new Date(session.bookingEnd).getHours()}:
					{new Date(session.bookingEnd).getMinutes().toString().padStart(2, "0")}
				</button>
			</div>
		);
	}
	if (mode == "edit") {
		return (
			<div>
				<button
					onClick={onSetActive}
					className={`flex gap-2 items-center justify-center border-2 rounded-lg p-1 font-semibold w-[140px]
				${
					isActive
						? "text-white bg-sky-600 hover:bg-sky-500"
						: session.user && session._id !== sessionId
						  ? "text-white bg-slate-400 cursor-not-allowed"
						  : "border-sky-600 text-sky-600 bg-white hover:bg-slate-200"
				}`}
					key={session._id}
					disabled={session.user && session._id !== sessionId}
				>
					{session.user && <FaUser />}
					{new Date(session.bookingStart).getHours()}:
					{new Date(session.bookingStart).getMinutes().toString().padStart(2, "0")} -{" "}
					{new Date(session.bookingEnd).getHours()}:
					{new Date(session.bookingEnd).getMinutes().toString().padStart(2, "0")}
				</button>
			</div>
		);
	}
	return <>wrong mode</>;
}

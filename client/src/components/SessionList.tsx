import React from "react";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export function SessionList({ sessions }: { sessions: Array<any> }) {
	return (
		<div className="flex flex-wrap gap-2">
			<div className="font-semibold text-3xl pt-2">Session lists</div>
			{sessions.length === 0 && <div className="w-full mt-2">No interview session added</div>}
			{sessions
				.sort((a, b) => new Date(a.bookingStart).getTime() - new Date(b.bookingStart).getTime())
				.map((session, index) => {
					if (
						index == 0 ||
						sessions[index].bookingStart.split("T")[0] !== sessions[index - 1].bookingStart.split("T")[0]
					) {
						return (
							<React.Fragment key={index}>
								<div className="font-bold w-full text-sky-600 mt-2 text-lg">
									{new Date(session.bookingStart).toLocaleDateString("en-GB", {
										year: "numeric",
										month: "short",
										day: "numeric"
									})}
								</div>
								<SessionSlot session={session} />
							</React.Fragment>
						);
					}
					return <SessionSlot session={session} key={index} />;
				})}
		</div>
	);
}

export function SessionSlot({ session }: { session: any }) {
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

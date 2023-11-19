import React from "react";
import { SessionSlot } from "./SessionSlot";

export function SessionList({ sessions, mode }: { sessions: Array<any>; mode: string }) {
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
								<SessionSlot session={session} mode={mode} />
							</React.Fragment>
						);
					}
					return <SessionSlot session={session} key={index} mode={mode} />;
				})}
		</div>
	);
}

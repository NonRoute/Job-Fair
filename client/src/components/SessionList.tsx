"use client";
import React, { useState } from "react";
import { SessionSlot } from "./SessionSlot";
import assignInterviewee from "@/libs/assignInterviewee";
import removeInterviewee from "@/libs/removeInterviewee";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function SessionList({
	userToken,
	userId,
	sessions,
	sessionId,
	mode
}: {
	userToken?: string;
	userId?: string;
	sessions: Array<any>;
	sessionId?: string;
	mode: string;
}) {
	const router = useRouter();
	const [activeSessionId, setActiveSessionId] = useState<string | null>(sessionId ?? null);

	const handleBookingSubmit = async (e: any) => {
		e.preventDefault(); // Prevent the default form submission behavior
		try {
			if (!userToken || !activeSessionId || !userId) {
				throw new Error("No session selected or log in first");
			}
			const response = await assignInterviewee(userToken, activeSessionId, userId);
			if (response?.success) {
				// setActiveSessionId(null);
				toast.success("Book session success");
				router.push("/interview");
			} else {
				toast.error("Book session failed");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error book session");
		}
	};

	const handleEditingSubmit = async (e: any) => {
		e.preventDefault(); // Prevent the default form submission behavior
		try {
			if (!userToken || !activeSessionId || !userId || !sessionId) {
				throw new Error("No session selected or log in first");
			}
			const removeResponse = await removeInterviewee(userToken, sessionId);
			const assignResponse = await assignInterviewee(userToken, activeSessionId, userId);
			if (assignResponse?.success) {
				// setActiveSessionId(null);
				toast.success("Update interview success");
				router.push("/interview");
			} else {
				toast.error("Update interview failed");
			}
		} catch (error) {
			console.error(error);
			toast.error("Error update session");
		}
	};

	return (
		<div>
			<div className="flex flex-wrap gap-2">
				<div className="font-semibold text-3xl pt-2">
					{mode == "add"
						? "Session lists"
						: sessions.length === 0
						  ? "No interview session available"
						  : "Select a interview session"}
				</div>
				{sessions.length === 0 && (
					<div className="w-full mt-2">{mode == "add" ? "No interview session added" : ""}</div>
				)}
				{sessions
					.sort((a, b) => new Date(a.bookingStart).getTime() - new Date(b.bookingStart).getTime())
					.map((session, index) => {
						const isActive = session._id === activeSessionId;
						const isDateHeaderRequired =
							index === 0 ||
							sessions[index].bookingStart.split("T")[0] !==
								sessions[index - 1].bookingStart.split("T")[0];
						return (
							<React.Fragment key={session._id}>
								{isDateHeaderRequired && (
									<div className="font-bold w-full text-sky-600 mt-2 text-lg">
										{new Date(session.bookingStart).toLocaleDateString("en-GB", {
											year: "numeric",
											month: "short",
											day: "numeric"
										})}
									</div>
								)}
								<SessionSlot
									session={session}
									sessionId={sessionId}
									mode={mode}
									isActive={isActive}
									onSetActive={() => {
										if (session._id == activeSessionId) {
											setActiveSessionId(null);
										} else {
											setActiveSessionId(session._id);
										}
									}}
								/>
							</React.Fragment>
						);
					})}
			</div>
			{sessions.length === 0 || mode == "add" ? (
				<></>
			) : mode == "book" ? (
				<form
					onSubmit={handleBookingSubmit}
					className="text-5xl font-bold text-white mt-4 flex flex-col items-center justify-center"
				>
					<button
						type="submit"
						disabled={!activeSessionId}
						className={` py-2 px-20 font-semibold rounded-md text-lg 
						${
							!activeSessionId
								? "bg-gray-300 cursor-not-allowed"
								: "bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 hover:bg-slate-200 "
						}`}
					>
						Confirm Booking
					</button>
				</form>
			) : (
				<form
					onSubmit={handleEditingSubmit}
					className="text-5xl font-bold text-white mt-4 flex flex-col items-center justify-center"
				>
					<button
						type="submit"
						disabled={!activeSessionId}
						className={` py-2 px-20 font-semibold rounded-md text-lg 
						${
							!activeSessionId
								? "bg-gray-300 cursor-not-allowed"
								: "bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 hover:bg-slate-200 "
						}`}
					>
						Save
					</button>
				</form>
			)}
		</div>
	);
}

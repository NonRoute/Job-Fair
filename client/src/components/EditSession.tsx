"use client";
import React, { useEffect, useState } from "react";
import SessionForm from "./SessionForm";
import getBooking from "@/libs/getBooking";
import deleteSession from "@/libs/deleteSession";
import removeInterviewee from "@/libs/removeInterviewee";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function EditSession({ userToken, bookingId }: { userToken: string; bookingId: string }) {
	const [interviewee, setInterviewee] = useState<string>("No Interviewee book this session");
	const router = useRouter();

	const fetchData = async () => {
		const booking = (await getBooking(userToken, bookingId)).data;
		console.log(booking);
		if (booking.user) {
			setInterviewee(booking.user.name);
			console.log(booking.user.name);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleDeleteSession = async (e: any) => {
		e.preventDefault();
		try {
			if (!bookingId) {
				throw new Error("No Booking ID given");
			}
			const response = await deleteSession(userToken, bookingId);
			if (response?.success) {
				toast.success("Delete Session success");
				// Should go back to company overall session for better UX
				router.push("/"); // change to company page
			} else {
				toast.error("Delete Session failed");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteInterviewee = async (e: any) => {
		e.preventDefault();
		try {
			if (!bookingId) {
				throw new Error("No Booking ID given");
			}
			const response = await removeInterviewee(userToken, bookingId);
			if (response?.success) {
				toast.success("Remove Interviewee success");
				setInterviewee("No Interviewee book this session");
			} else {
				toast.error("Remove Interviewee failed");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="m-8">
			<form
				onSubmit={handleDeleteSession}
				className="text-5xl font-bold text-white mb-4 flex flex-row justify-between"
			>
				Edit Session
				<button
					type="submit"
					className="bg-white py-1 px-3 text-red-500 font-semibold rounded-md 
							border-2 border-red-500 hover:bg-slate-200 text-lg text-center"
				>
					Delete Session
				</button>
			</form>
			<div className="px-8 pb-8 bg-white rounded-md shadow">
				<SessionForm userToken={userToken} bookingId={bookingId} mode="edit" onSessionAdded={() => {}} />
			</div>
			<form
				onSubmit={handleDeleteInterviewee}
				className="text-5xl font-bold text-white mb-4 pt-4 flex flex-row justify-between"
			>
				Interviewee
				<button
					type="submit"
					disabled={interviewee == "No Interviewee book this session"}
					className={`py-1 px-3 font-semibold rounded-md border-2
					${
						interviewee == "No Interviewee book this session"
							? "bg-gray-300 text-white cursor-not-allowed border-gray-300"
							: "text-red-500 bg-white hover:bg-slate-200 border-red-500"
					} text-lg text-center`}
				>
					Remove Interviewee
				</button>
			</form>
			<div className="p-8 bg-white rounded-md shadow bg-white flex items-center">
				<FaUser className="text-cyan-600 text-3xl mr-2" />
				<div className="text-cyan-600 font-semibold text-3xl">{interviewee}</div>
			</div>
		</div>
	);
}

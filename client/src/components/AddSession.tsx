"use client";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import addSession from "@/libs/addSession";
import { toast } from "react-toastify";
import getBookings from "@/libs/getBookings";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function AddSession({ userToken, id }: { userToken: string; id: string }) {
	const [date, setDate] = useState<Date | null>();
	const [timeStart, setTimeStart] = useState<Date | null>();
	const [timeEnd, setTimeEnd] = useState<Date | null>();
	const [sessions, setSessions] = useState<Array<any>>([]);
	const onAdd = async (e: any) => {
		e.preventDefault();
		if (date && timeStart && timeEnd && dayjs(timeEnd).isAfter(timeStart)) {
			const bookingDate = new Date(dayjs(date).format("YYYY-MM-DD"));
			const bookingStart = new Date(
				bookingDate.setHours(dayjs(timeStart).get("hour"), dayjs(timeStart).get("minute"))
			);
			const bookingEnd = new Date(bookingDate.setHours(dayjs(timeEnd).get("hour"), dayjs(timeEnd).get("minute")));
			console.log(bookingDate, bookingStart, bookingEnd);
			await addSession(userToken, id, bookingStart, bookingEnd);
			fetchData();
		} else {
			toast.error("Error adding session");
		}
	};

	const fetchData = async () => {
		setSessions((await getBookings(userToken, id)).data);
	};
	useEffect(() => {
		fetchData();
	}, []);

	console.log(sessions);

	return (
		<>
			<div className="text-5xl font-bold text-white my-4 pt-2">Interview Session</div>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div className="bg-white rounded-md shadow p-8 gap-6 flex flex-col">
					<div className="font-semibold text-3xl">Add Session</div>
					<DatePicker
						className="w-1/2 pr-3"
						label="Date"
						slotProps={{ textField: { variant: "filled" } }}
						onChange={(e: Date | null) => {
							console.log(e);
							setDate(e);
						}}
					/>
					<div className="flex gap-6">
						<TimePicker
							className="w-full"
							label="Time start"
							slotProps={{ textField: { variant: "filled" } }}
							onChange={(e: Date | null) => {
								setTimeStart(e);
							}}
						/>
						<TimePicker
							className="w-full"
							label="Time end"
							slotProps={{ textField: { variant: "filled" } }}
							onChange={(e: Date | null) => {
								setTimeEnd(e);
							}}
						/>
					</div>
					<button
						className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
						onClick={onAdd}
					>
						Add
					</button>
					<div className="font-semibold text-3xl pt-2">Session lists</div>
					<div className="flex flex-wrap gap-2">
						{sessions
							.sort((a, b) => new Date(a.bookingStart).getTime() - new Date(b.bookingStart).getTime())
							.map((session, index) => {
								if (
									index == 0 ||
									sessions[index].bookingStart.split("T")[0] !==
										sessions[index - 1].bookingStart.split("T")[0]
								) {
									return (
										<>
											<div className="font-bold w-full text-sky-600 mt-2 text-lg">
												{new Date(session.bookingStart).toLocaleDateString("en-GB", {
													year: "numeric",
													month: "short",
													day: "numeric"
												})}
											</div>
											<SessionSlot session={session} />
										</>
									);
								}
								return <SessionSlot session={session} />;
							})}
					</div>
				</div>
			</LocalizationProvider>
		</>
	);
}

export function SessionSlot({ session }: { session: any }) {
	return (
		<Link
			href={"/"}
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

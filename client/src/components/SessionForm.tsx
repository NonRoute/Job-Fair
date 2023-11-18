// AddSessionForm.js
import React, { useState } from "react";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import addSession from "@/libs/addSession";

export default function SessionForm({
	userToken,
	id,
	onSessionAdded
}: {
	userToken: string;
	id: string;
	onSessionAdded: () => void;
}) {
	const [date, setDate] = useState<Date | null>(null);
	const [timeStart, setTimeStart] = useState<Date | null>(null);
	const [timeEnd, setTimeEnd] = useState<Date | null>(null);

	const onAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (date && timeStart && timeEnd && dayjs(timeEnd).isAfter(timeStart)) {
			const bookingDate = new Date(dayjs(date).format("YYYY-MM-DD"));
			const bookingStart = new Date(
				bookingDate.setHours(dayjs(timeStart).get("hour"), dayjs(timeStart).get("minute"))
			);
			const bookingEnd = new Date(bookingDate.setHours(dayjs(timeEnd).get("hour"), dayjs(timeEnd).get("minute")));
			try {
				await addSession(userToken, id, bookingStart, bookingEnd);
				onSessionAdded();
				toast.success("Add session success");
			} catch (error) {
				toast.error("Error adding session");
			}
		} else {
			toast.error("Error adding session");
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="gap-6 flex flex-col">
				<div className="font-semibold text-3xl">Add Session</div>
				<DatePicker
					className="w-1/2 pr-3"
					label="Date"
					slotProps={{ textField: { variant: "filled" } }}
					onChange={(e: Date | null) => setDate(e)}
				/>
				<div className="flex gap-6">
					<TimePicker
						className="w-full"
						label="Time start"
						slotProps={{ textField: { variant: "filled" } }}
						onChange={(e: Date | null) => setTimeStart(e)}
					/>
					<TimePicker
						className="w-full"
						label="Time end"
						slotProps={{ textField: { variant: "filled" } }}
						onChange={(e: Date | null) => setTimeEnd(e)}
					/>
				</div>
				<button
					className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
					onClick={onAdd}
				>
					Add
				</button>
			</div>
		</LocalizationProvider>
	);
}

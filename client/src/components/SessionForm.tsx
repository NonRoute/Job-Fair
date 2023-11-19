import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import addSession from "@/libs/addSession";
import editBooking from "@/libs/editBooking";
import getBooking from "@/libs/getBooking";

export default function SessionForm({
	userToken,
	companyId,
	bookingId,
	onSessionAddedOrCreated,
	mode
}: {
	userToken: string;
	companyId?: string;
	bookingId?: string;
	onSessionAddedOrCreated: () => void;
	mode: string;
}) {
	const [date, setDate] = useState<Date | null>(null);
	const [timeStart, setTimeStart] = useState<Date | null>(null);
	const [timeEnd, setTimeEnd] = useState<Date | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (mode === "edit" && bookingId) {
			setLoading(true);
			getBooking(userToken, bookingId)
				.then((booking) => {
					const bookingStart = new Date(booking.data.bookingStart);
					const bookingEnd = new Date(booking.data.bookingEnd);
					setDate(dayjs(bookingStart));
					setTimeStart(dayjs(bookingStart));
					setTimeEnd(dayjs(bookingEnd));
				})
				.catch((error) => {
					console.error("Error fetching booking details:", error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, []);

	if (loading) {
		return <>Loading...</>;
	}

	const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (date && timeStart && timeEnd && dayjs(timeEnd).isAfter(timeStart)) {
			const bookingDate = new Date(dayjs(date).format("YYYY-MM-DD"));
			const bookingStart = new Date(
				bookingDate.setHours(dayjs(timeStart).get("hour"), dayjs(timeStart).get("minute"))
			);
			const bookingEnd = new Date(bookingDate.setHours(dayjs(timeEnd).get("hour"), dayjs(timeEnd).get("minute")));
			if (mode == "add") {
				try {
					if (!companyId) {
						throw new Error("No Company ID given");
					}
					await addSession(userToken, companyId, bookingStart, bookingEnd);
					onSessionAddedOrCreated();
					toast.success("Add session success");
				} catch (error) {
					toast.error("Error adding session");
				}
			}
			if (mode == "edit") {
				try {
					if (!bookingId) {
						throw new Error("No Booking ID given");
					}
					await editBooking(userToken, bookingId, bookingStart, bookingEnd);
					onSessionAddedOrCreated();
					toast.success("Add edit success");
				} catch (error) {
					toast.error("Error edit session");
				}
			} else {
				console.log("wrong mode");
			}
		} else {
			toast.error("Error manage session");
		}
	};

	const onAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (date && timeStart && timeEnd && dayjs(timeEnd).isAfter(timeStart)) {
			const bookingDate = new Date(dayjs(date).format("YYYY-MM-DD"));
			const bookingStart = new Date(
				bookingDate.setHours(dayjs(timeStart).get("hour"), dayjs(timeStart).get("minute"))
			);
			const bookingEnd = new Date(bookingDate.setHours(dayjs(timeEnd).get("hour"), dayjs(timeEnd).get("minute")));
			try {
				if (!companyId) {
					throw new Error("No Company ID given");
				}
				await addSession(userToken, companyId, bookingStart, bookingEnd);
				onSessionAddedOrCreated();
				toast.success("Add session success");
			} catch (error) {
				toast.error("Error adding session");
			}
		} else {
			toast.error("Error adding session");
		}
	};

	const onEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (date && timeStart && timeEnd && dayjs(timeEnd).isAfter(timeStart)) {
			const bookingDate = new Date(dayjs(date).format("YYYY-MM-DD"));
			const bookingStart = new Date(
				bookingDate.setHours(dayjs(timeStart).get("hour"), dayjs(timeStart).get("minute"))
			);
			const bookingEnd = new Date(bookingDate.setHours(dayjs(timeEnd).get("hour"), dayjs(timeEnd).get("minute")));
			try {
				if (!bookingId) {
					throw new Error("No Booking ID given");
				}
				await editBooking(userToken, bookingId, bookingStart, bookingEnd);
				onSessionAddedOrCreated();
				toast.success("Add edit success");
			} catch (error) {
				toast.error("Error edit session");
			}
		} else {
			toast.error("Error edit session");
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className="gap-6 flex flex-col">
				<div className="font-semibold text-3xl">{mode == "add" ? <>Add Session</> : <></>}</div>
				<DatePicker
					className="w-1/2 pr-3"
					label="Date"
					slotProps={{ textField: { variant: "filled" } }}
					value={date}
					onChange={(e: Date | null) => setDate(e)}
				/>
				<div className="flex gap-6">
					<TimePicker
						className="w-full"
						label="Time start"
						slotProps={{ textField: { variant: "filled" } }}
						value={timeStart}
						onChange={(e: Date | null) => setTimeStart(e)}
					/>
					<TimePicker
						className="w-full"
						label="Time end"
						slotProps={{ textField: { variant: "filled" } }}
						value={timeEnd}
						onChange={(e: Date | null) => setTimeEnd(e)}
					/>
				</div>
				<button
					className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
					onClick={onSubmit}
				>
					{mode == "add" ? <>Add</> : <>Save</>}
				</button>
			</div>
		</LocalizationProvider>
	);
}

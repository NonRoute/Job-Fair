"use client";
import { CompanyItem } from "@/interface/Interface";
import Link from "next/link";
import CompanyDetail from "./CompanyDetail";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBooking from "@/libs/getBooking";
import dayjs from "dayjs";
import { MdAccessTimeFilled } from "react-icons/md";
import { usePathname } from "next/navigation";

export default function ProductCard({
	company,
	isLogin,
	isAdmin,
	sessionId
}: {
	company: CompanyItem;
	isLogin?: boolean;
	isAdmin?: boolean;
	sessionId?: string;
}) {
	const { data: session, status } = useSession();
	const [bookingTime, setBookingTime] = useState<string>("");
	const fetchData = async () => {
		if (session && sessionId) {
			const bookingData = await getBooking(session.user.token, sessionId);
			const bookingDate = dayjs().format("YYYY-MMM-DD");
			const bookingStart =
				dayjs(bookingData.data.bookingStart).get("hour") +
				":" +
				dayjs(bookingData.data.bookingStart).get("minute");
			const bookingEnd =
				dayjs(bookingData.data.bookingEnd).get("hour") + ":" + dayjs(bookingData.data.bookingEnd).get("minute");
			const time = bookingDate + " " + bookingStart + "-" + bookingEnd;
			setBookingTime(time);
		}
	};
	const pathname = usePathname()

	useEffect(() => {
		if (session && session.user.token) {
			fetchData();
		}
	}, [session]);

	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden py-4 px-6 gap-2 flex flex-col w-full justify-between h-full">
			<CompanyDetail company={company} />
			{bookingTime && (
				<div className="text-cyan-600 font-semibold text-lg gap-2 flex items-center justify-center">
					<MdAccessTimeFilled />
					{bookingTime}
				</div>
			)}
			<div className="gap-2 flex flex-col">
				{isLogin ? (
					sessionId ? (
						<Link
							href={`/editing/${sessionId}`}
							type="submit"
							className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 
                    hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg text-center"
						>
							Edit interview
						</Link>
					) : (
						<Link
							href={`/booking/${company.id}`}
							type="submit"
							className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 
                    hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg text-center"
						>
							Book interview
						</Link>
					)
				) : (
					<></>
				)}
				{isAdmin && pathname == "/" ? (
					<Link
						href={`/edit-company/${company.id}`}
						type="submit"
						className="bg-white py-2 px-3 text-cyan-500 font-semibold rounded-md border-2 border-cyan-500 hover:bg-slate-200 text-lg text-center"
					>
						Edit company
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

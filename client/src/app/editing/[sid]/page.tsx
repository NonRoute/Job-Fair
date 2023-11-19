"use client";
import CompanyDetail from "@/components/CompanyDetail";
import getBookings from "@/libs/getBookings";
import { SessionList } from "@/components/SessionList";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CompanyItem } from "@/interface/Interface";
import getBooking from "@/libs/getBooking";
import removeInterviewee from "@/libs/removeInterviewee";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Editing({ params }: { params: { sid: string } }) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [profile, setProfile] = useState<any>();
	const [company, setCompany] = useState<CompanyItem>();
	const [sessionBookings, setSessionBookings] = useState<any>();

	if (!session || !session.user.token) return null;

	const fetchData = async () => {
		const userProfile = await getUserProfile(session.user.token);
		setProfile(userProfile);
		const bookingData = await getBooking(session.user.token, params.sid);
		setCompany(bookingData.data.company);
		// Check if the company is available before fetching related bookings
		if (bookingData.data.company) {
			const bookings = await getBookings(session.user.token, bookingData.data.company.id);
			setSessionBookings(bookings.data);
		}
	};

	useEffect(() => {
		if (session && session.user.token) {
			fetchData();
		}
	}, [session, params.sid]);

	const handleDeleteBooking = async (e: any) => {
		e.preventDefault();
		try {
			if (!company?.id) {
				throw new Error("No Booking ID given");
			}
			const response = await removeInterviewee(session.user.token, params.sid);
			if (response?.success) {
				toast.success("Remove Interviewee success");
				router.push("/interview");
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
				onSubmit={handleDeleteBooking}
				className="text-5xl font-bold text-white mb-4 flex flex-row justify-between"
			>
				Edit Interview
				<button
					type="submit"
					className="bg-white py-1 px-3 text-red-500 font-semibold rounded-md 
							border-2 border-red-500 hover:bg-slate-200 text-lg text-center"
				>
					Delete Interview
				</button>
			</form>
			<div className="p-8 gap-8 bg-white rounded-md shadow flex flex-col">
				{company && <CompanyDetail company={company} />}
				{profile && sessionBookings && (
					<SessionList
						userToken={session.user.token}
						userId={profile.data._id}
						sessions={sessionBookings}
						sessionId={params.sid}
						mode="edit"
					/>
				)}
			</div>
		</div>
	);
}

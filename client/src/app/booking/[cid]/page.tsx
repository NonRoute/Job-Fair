"use client";
import CompanyDetail from "@/components/CompanyDetail";
import getBookings from "@/libs/getBookings";
import getCompany from "@/libs/getCompany";
import { SessionList } from "@/components/SessionList";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CompanyItem } from "@/interface/Interface";

export default function Booking({ params }: { params: { cid: string } }) {
	const { data: session, status } = useSession();
	const [profile, setProfile] = useState<any>();
	const [company, setCompany] = useState<CompanyItem>();
	const [sessionBookings, setSessionBookings] = useState<any>();

	if (!session || !session.user.token) return null;

	const fetchData = async () => {
		setProfile(await getUserProfile(session.user.token));
		setCompany((await getCompany(params.cid)).data);
		setSessionBookings((await getBookings(session.user.token, params.cid)).data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="m-8">
			<div className="text-5xl font-bold text-white my-4 pt-2">Interview Session</div>
			<div className="p-8 gap-8 bg-white rounded-md shadow flex flex-col">
				{company && <CompanyDetail company={company} />}
				{profile && sessionBookings && (
					<SessionList
						userToken={session.user.token}
						userId={profile.data._id}
						sessions={sessionBookings}
						mode="book"
					/>
				)}
			</div>
		</div>
	);
}

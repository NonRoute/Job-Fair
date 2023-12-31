"use client";
import CompanyCatalog from "@/components/CompanyCatalog";
import { CompanyItem } from "@/interface/Interface";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import getBookings from "@/libs/getBookings";

export default function Interview() {
	const { data: session, status } = useSession();
	const [profile, setProfile] = useState<any>();
	const [companies, setCompanies] = useState<Array<CompanyItem>>([]);
	const [sessionBookings, setSessionBookings] = useState<any>();

	const fetchData = async () => {
		if (session && session.user.token) {
			setProfile(await getUserProfile(session.user.token));
			setSessionBookings((await getBookings(session.user.token)).data);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (sessionBookings && sessionBookings.length > 0) {
			const newCompanies = sessionBookings.map((booking: any) => booking.company);
			setCompanies(newCompanies);
		}
	}, [sessionBookings]);

	if (!session || !session.user.token) return <>Please login</>;

	return (
		<main>
			<div className="text-5xl font-bold text-white ml-8 mt-8">My interview</div>
			{companies.length == 0 && (
				<div className="text-xl font-bold ml-8 my-4 pt-2 text-white">You do not have any booking</div>
			)}
			<CompanyCatalog companies={companies} profile={profile} sessions={sessionBookings} />
		</main>
	);
}

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

	if (!session || !session.user.token) return <>Please login</>;

	const fetchData = async () => {
		setProfile(await getUserProfile(session.user.token));
		setSessionBookings((await getBookings(session.user.token)).data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (sessionBookings && sessionBookings.length > 0) {
			const newCompanies = sessionBookings.map((booking) => booking.company);
			setCompanies(newCompanies);
		}
	}, [sessionBookings]);

	if (companies.length == 0) {
		return <>You do not have any booking</>;
	}
	return (
		<main>
			<CompanyCatalog companies={companies} profile={profile} sessions={sessionBookings} />
		</main>
	);
}

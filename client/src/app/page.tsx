"use client";
import CompanyCatalog from "@/components/CompanyCatalog";
import { CompanyItem } from "@/interface/Interface";
import getCompanies from "@/libs/getCompanies";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";

export default function Home() {
	const { data: session, status } = useSession();
	const [profile, setProfile] = useState<any>();
	const [companies, setCompanies] = useState<Array<CompanyItem>>([]);

	const fetchData = async () => {
		setCompanies((await getCompanies()).data);
		if (session) {
			setProfile(await getUserProfile(session.user.token));
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<CompanyCatalog companies={companies} profile={profile} />
		</main>
	);
}

"use client";
import CompanyCatalog from "@/components/CompanyCatalog";
import { CompanyItem } from "@/interface/Interface";
import getCompanies from "@/libs/getCompanies";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import Image from "next/image";
import Link from "next/link";

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
			{!session && (
				<div className="w-full h-[50vh] sm:h-[65vh] block relative">
					<Image src={"/job.jpg"} fill={true} priority className="object-cover" alt={""} />
					<div className="z-20 top-10 relative left-10">
						<h1 className="text-2xl sm:text-4xl font-bold">Welcome to Job Fair</h1>
						<h3 className="text-md sm:text-xl font-semibold">Discover Your Perfect Job </h3>
						<Link
							href="/register"
							className="border-sky-500 border-2 py-2 px-3 mt-2 block w-fit text-sky-600 font-semibold rounded-md hover:bg-slate-200"
						>
							Register now
						</Link>
					</div>
				</div>
			)}
			<CompanyCatalog companies={companies} profile={profile} />
		</main>
	);
}

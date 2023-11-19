"use client";
import CompanyCatalog from "@/components/CompanyCatalog";
import { CompanyItem } from "@/interface/Interface";
import getCompanies from "@/libs/getCompanies";
import { useEffect, useState } from "react";

export default function Home() {
	const [companies, setCompanies] = useState<Array<CompanyItem>>([]);

	const fetchData = async () => {
		setCompanies((await getCompanies()).data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<main>
			<CompanyCatalog companies={companies} />
		</main>
	);
}

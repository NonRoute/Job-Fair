import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanies from "@/libs/getCompanies";

export default function Home() {
	const companies = getCompanies();
	return (
		<main>
			<CompanyCatalog companies={companies} />
		</main>
	);
}

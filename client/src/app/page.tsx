import CompanyCatalog from "@/components/CompanyCatalog";
import getCompanies from "@/libs/getCompanies";

export default async function Home() {
	const companies = await getCompanies();
	
	return (
		<main>
			<CompanyCatalog companies={companies} />
		</main>
	);
}

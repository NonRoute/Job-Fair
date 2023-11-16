import { CompanyItem } from "@/interface/CompanyItem";

export default async function editCompany(token: string, company: CompanyItem) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/companies/${company.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify(company)
	});

	if (!response.ok) {
		throw new Error("Failed to edit company");
	}
	return await response.json();
}

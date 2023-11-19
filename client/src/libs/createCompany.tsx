import { CompanyItem } from "@/interface/Interface";

export default async function createCompany(token: string, company: CompanyItem) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/companies`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify(company)
	});

	if (!response.ok) {
		throw new Error("Failed to create company");
	}
	// console.log(response);
	// response format from fetch and from response.json() is different
	return await response.json();
}

import { CompanyItem } from "@/interface/CompanyItem";

export default async function deleteCompany(token: string, id: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/companies/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error("Failed to delete company");
	}
	return await response.json();
}

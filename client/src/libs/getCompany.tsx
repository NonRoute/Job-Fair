export default async function getCompany(id: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/companies/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch company");
	}
	return await response.json();
}

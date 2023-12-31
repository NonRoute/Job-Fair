export default async function getBookings(token: string, companyId?: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const urlParams = companyId ? new URLSearchParams({ companyId }) : "";
	const url = `${NEXT_PUBLIC_SERVER_URL}/api/v1/bookings?${urlParams}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		}
	});
	if (!response.ok) {
		throw new Error("Failed to fetch bookings");
	}

	return await response.json();
}

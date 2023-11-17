export default async function addSession(token: string, companyId: string, bookingStart: Date, bookingEnd: Date) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/companies/${companyId}/bookings/session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ bookingStart, bookingEnd })
	});

	if (!response.ok) {
		throw new Error("Failed to create company");
	}

	return await response.json();
}

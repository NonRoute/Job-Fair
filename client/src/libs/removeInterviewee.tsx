export default async function removeInterviewee(token: string, bookingId: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");
	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/bookings/assign/${bookingId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error("Failed to remove user to session");
	}
	return await response.json();
}

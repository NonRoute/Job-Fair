export default async function assignInterviewee(token: string, bookingId: string, userId: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");
	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/bookings/assign/${bookingId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ userId })
	});

	if (!response.ok) {
		throw new Error("Failed to assign user to session");
	}
	return await response.json();
}

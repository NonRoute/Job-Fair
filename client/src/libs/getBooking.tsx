export default async function getBooking(token: string, bookingId: string) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/bookings/${bookingId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		}
	});
	if (!response.ok) {
		throw new Error("Failed to fetch booking with id");
	}

	return await response.json();
}

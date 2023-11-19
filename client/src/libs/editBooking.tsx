export default async function editBooking(
	token: string,
	bookingId: string,
	bookingStart: Date,
	bookingEnd: Date,
	user?: string
) {
	const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
	if (!NEXT_PUBLIC_SERVER_URL) throw new Error("Please define NEXT_PUBLIC_SERVER_URL");

	const response = await fetch(`${NEXT_PUBLIC_SERVER_URL}/api/v1/bookings/${bookingId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ bookingStart, bookingEnd, user })
	});

	if (!response.ok) {
		throw new Error("Failed to edit booking");
	}
	return await response.json();
}

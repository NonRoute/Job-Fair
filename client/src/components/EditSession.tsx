"use client";
import React, { useEffect, useState } from "react";
import SessionForm from "./SessionForm";
import getBookings from "@/libs/getBookings";

// interface CompanyItem {
// 	id?: string;
// 	name: string;
// 	business: string;
// 	address: string;
// 	province: string;
// 	postalcode: string;
// 	tel: string;
// 	picture: string;
// }

export default function EditSession({ userToken, bookingId }: { userToken: string; bookingId: string }) {
	// const [sessions, setSessions] = useState<any>();

	const fetchData = async () => {
		// setSessions((await getBookings(userToken, bookingId)).data);
	};

	useEffect(() => {
		// fetchData();
	}, []);

	const handleSessionEdited = () => {
		// fetchData(); // refetch sessions after adding a new one
	};

	return (
		<>
			<SessionForm
				userToken={userToken}
				bookingId={bookingId}
				mode="edit"
				onSessionAddedOrCreated={handleSessionEdited}
			/>
		</>
	);
}

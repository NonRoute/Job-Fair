import React, { useEffect, useState } from "react";
import SessionForm from "./SessionForm";
import { SessionList } from "./SessionList";
import getBookings from "@/libs/getBookings";

export default function AddSession({ userToken, companyId }: { userToken: string; companyId: string }) {
	const [sessions, setSessions] = useState<Array<any>>([]);

	const fetchData = async () => {
		setSessions((await getBookings(userToken, companyId)).data);
	};

	useEffect(() => {
		fetchData();
	}, [userToken, companyId]);

	const handleSessionAdded = () => {
		fetchData(); // refetch sessions after adding a new one
	};

	return (
		<>
			<div className="text-5xl font-bold text-white my-4 pt-2">Interview Session</div>
			<div className="p-8 gap-8 bg-white rounded-md shadow flex flex-col">
				<SessionForm
					userToken={userToken}
					companyId={companyId}
					onSessionAdded={handleSessionAdded}
					mode="add"
				/>
				<SessionList userToken={userToken} sessions={sessions} mode="add" />
			</div>
		</>
	);
}

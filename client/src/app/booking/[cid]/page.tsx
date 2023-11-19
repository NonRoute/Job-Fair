import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import getUserProfile from "@/libs/getUserProfile";
import CompanyDetail from "@/components/CompanyDetail";
import getBookings from "@/libs/getBookings";
import getCompany from "@/libs/getCompany";
import { SessionList } from "@/components/SessionList";

export default async function Booking({ params }: { params: { cid: string } }) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user.token) return null;
	// const profile = await getUserProfile(session.user.token);
	// if (profile.data.role != "admin") return <div>No permission</div>;
	const company = (await getCompany(params.cid)).data;
	const sessionBookings = (await getBookings(session.user.token, params.cid)).data;

	return (
		<div className="m-8">
			<div className="text-5xl font-bold text-white my-4 pt-2">Interview Session</div>
			<div className="p-8 gap-8 bg-white rounded-md shadow flex flex-col">
				<CompanyDetail company={company} />
				<SessionList
					userToken={session.user.token}
					userId={session.user._id}
					sessions={sessionBookings}
					mode="book"
				/>
			</div>
		</div>
	);
}

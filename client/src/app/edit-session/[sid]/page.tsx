import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import EditSession from "@/components/EditSession";

export default async function Edit({ params }: { params: { sid: string } }) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user.token) return null;
	const profile = await getUserProfile(session.user.token);
	if (profile.data.role != "admin") return <div>No permission</div>;
	return <EditSession userToken={session.user.token} bookingId={params.sid} />;
}

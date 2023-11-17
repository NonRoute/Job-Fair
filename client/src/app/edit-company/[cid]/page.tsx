import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import CompanyForm from "@/components/CompanyForm";

export default async function EditCompany({ params }: { params: { cid: string } }) {
	const session = await getServerSession(authOptions);
	if (!session || !session.user.token) return null;
	const profile = await getUserProfile(session.user.token);
	if (profile.data.role != "admin") return <div>No permission</div>;
	return <CompanyForm userToken={session.user.token} mode={"edit"} id={params.cid} />;
}

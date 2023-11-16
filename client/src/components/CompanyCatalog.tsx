import ProductCard from "./ProductCard";
import { CompanyItem } from "@/interface/CompanyItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";

export default async function CompanyCatalog({ companies }: { companies: Promise<any> }) {
	const companiesReady = await companies;
	const companiesData: CompanyItem[] = companiesReady.data;

	const session = await getServerSession(authOptions);
	// Refactor this code
	if (!session || !session.user.token)
		return (
			<div className="m-4 justify-around items-center flex flex-row flex-wrap">
				{companiesData.map((companyItem, index) => (
					<ProductCard
						company={{
							id: companyItem.id,
							name: companyItem.name,
							business: companyItem.business,
							address: companyItem.address,
							province: companyItem.province,
							postalcode: companyItem.postalcode,
							tel: companyItem.tel,
							picture: companyItem.picture
						}}
						key={index}
					/>
				))}
			</div>
		);

	const profile = await getUserProfile(session.user.token);

	return (
		<div className="m-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
			{companiesData.map((companyItem, index) => (
				<ProductCard
					isLogin={true}
					isAdmin={profile.data.role === "admin"}
					company={{
						id: companyItem.id,
						name: companyItem.name,
						business: companyItem.business,
						address: companyItem.address,
						province: companyItem.province,
						postalcode: companyItem.postalcode,
						tel: companyItem.tel,
						picture: companyItem.picture
					}}
					key={index}
				/>
			))}
		</div>
	);
}

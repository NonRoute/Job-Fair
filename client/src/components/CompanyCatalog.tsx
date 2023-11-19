"use client";
import ProductCard from "./ProductCard";
import { CompanyItem } from "@/interface/Interface";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function CompanyCatalog({ companies }: { companies: Array<CompanyItem> }) {
	const { data: session, status } = useSession();
	// Refactor this code
	if (!session || !session.user.token)
		return (
			<div className="m-4 justify-around items-center flex flex-row flex-wrap">
				{companies.map((companyItem, index) => (
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

	const [profile, setProfile] = useState<any>("");

	const fetchData = async () => {
		setProfile(await getUserProfile(session.user.token));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="m-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
			{companies.map((companyItem, index) => (
				<ProductCard
					isLogin={true}
					isAdmin={profile.data?.role === "admin"}
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

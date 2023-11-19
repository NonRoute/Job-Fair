"use client";
import ProductCard from "./ProductCard";
import { CompanyItem } from "@/interface/Interface";

export default function CompanyCatalog({
	companies,
	profile,
	sessions
}: {
	companies: Array<CompanyItem>;
	profile: any;
	sessions?: Array<any>;
}) {
	if (!profile) {
		return (
			<div className="m-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
	}

	return (
		<div className="m-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
			{sessions
				? sessions.map((sessionItem, index) => {
						const companyItem = sessionItem.company;
						return (
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
								sessionId={sessionItem._id}
								key={index}
							/>
						);
				  })
				: companies.map((companyItem, index) => (
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

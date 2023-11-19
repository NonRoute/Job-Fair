"use client";
import Image from "next/image";
import { CompanyItem } from "@/interface/Interface";

export default function CompanyDetail({ company }: { company: CompanyItem }) {
	return (
		<div className="gap-2 flex flex-col w-full justify-between h-full">
			<div>
				<div className="text-2xl font-bold text-black">{company.name}</div>
				<div>{company.business}</div>
				<div>
					Address: {company.address} {company.province} {company.postalcode}, Tel: {company.tel}
				</div>
			</div>
			<div className="flex-shrink-0 w-full h-32 relative">
				<Image src={company.picture} alt="company picture" fill={true} className="object-contain" />
			</div>
		</div>
	);
}

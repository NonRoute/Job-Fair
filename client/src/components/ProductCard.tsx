"use client";
import Image from "next/image";
import { CompanyItem } from "@/interface/CompanyItem";
import Link from "next/link";

export default function ProductCard({
	company,
	isLogin,
	isAdmin
}: {
	company: CompanyItem;
	isLogin?: boolean;
	isAdmin?: boolean;
}) {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden py-4 px-6 gap-2 flex flex-col w-full justify-between h-full">
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

			<div className="gap-2 flex flex-col">
				{isLogin ? (
					<button
						type="submit"
						className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 
                    hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg"
					>
						Book interview
					</button>
				) : (
					<></>
				)}
				{isAdmin ? (
					<Link
						href={`/edit-company/${company.id}`}
						type="submit"
						className="bg-white py-2 px-3 text-cyan-500 font-semibold rounded-md border-2 border-cyan-500 hover:bg-slate-200 text-lg text-center"
					>
						Edit company
					</Link>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

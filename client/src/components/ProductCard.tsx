"use client";
import { CompanyItem } from "@/interface/Interface";
import Link from "next/link";
import CompanyDetail from "./CompanyDetail";

export default function ProductCard({
	company,
	isLogin,
	isAdmin,
	sessionId
}: {
	company: CompanyItem;
	isLogin?: boolean;
	isAdmin?: boolean;
	sessionId?: string;
}) {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden py-4 px-6 gap-2 flex flex-col w-full justify-between h-full">
			<CompanyDetail company={company} />
			<div className="gap-2 flex flex-col">
				{isLogin ? (
					sessionId ? (
						<Link
							href={`/editing/${sessionId}`}
							type="submit"
							className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 
                    hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg text-center"
						>
							Edit interview
						</Link>
					) : (
						<Link
							href={`/booking/${company.id}`}
							type="submit"
							className="bg-gradient-to-br from-cyan-500 to-sky-600 hover:from-cyan-400 
                    hover:to-sky-500 py-2 px-3 text-white font-semibold rounded-md hover:bg-slate-200 text-lg text-center"
						>
							Book interview
						</Link>
					)
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

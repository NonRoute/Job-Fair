import Image from "next/image";

export default function CompanyInformationFormat({ header, picture, children }: { header: string; picture: string; children: React.ReactNode }) {
	return (
		<div className="">
			<div className="text-3xl font-bold text-black mb-4">{header}</div>
			<div className="gap-2 font-semibold">{children}</div>
			{/* <div className="w-auto h-[50%] relative rounded-t-lg">
				<Image src={picture} alt="Product picture" fill={true} />
			</div> */}
		</div>
	);
}

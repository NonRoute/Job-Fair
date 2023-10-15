export default function Center({ header, children }: { header: string; children: React.ReactNode }) {
	return (
		<div className="mx-auto w-1/3 min-w-fit m-8">
			<div className="text-5xl font-bold text-white mb-4">{header}</div>
			<div className="bg-white rounded-md shadow p-8 gap-6 flex flex-col">{children}</div>
		</div>
	)
}

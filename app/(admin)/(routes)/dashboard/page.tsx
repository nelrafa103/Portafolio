import { DataTable } from "@/components/data-table";
import convexClient from "@/app/(core)/lib/convex";
import { api } from "@/convex/_generated/api";

export default async function Page() {
	const query = await convexClient.query(api.projects.getProjects);

	return (
		<div className="flex flex-1 flex-col">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<DataTable data={query} />
				</div>
			</div>
		</div>
	);
}

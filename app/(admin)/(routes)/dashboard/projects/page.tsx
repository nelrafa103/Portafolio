import convexClient from "@/app/(core)/lib/convex";
import { DataTable } from "@/components/data-table";
import { api } from "@/convex/_generated/api";

export default async function Page() {
	const query = await convexClient.query(api.projects.getProjects);
	return <DataTable data={query} />;
}

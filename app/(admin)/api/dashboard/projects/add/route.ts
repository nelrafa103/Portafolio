import convexClient from "@/app/(core)/lib/convex";
import octokit from "@/app/(core)/lib/octokit";
import config from "@/app/config";
import { api } from "@/convex/_generated/api";
import { NextResponse, type NextRequest } from "next/server";

async function POST(req: NextRequest) {
	const { url, description, repo } = (await req.json()).data;
	const request = await octokit.request(
		`GET /repos/${config.github.owner}/${repo}`,
		{
			owner: config.github.owner,
			repo: repo,
			headers: {
				"X-GitHub-Api-Version": "2022-11-28",
			},
		},
	);

	 
	const client = await convexClient.mutation(api.featured.insertFeaturedProject, {
		project: request.data,
	});

	return NextResponse.json({ data:client });
}


export {POST}
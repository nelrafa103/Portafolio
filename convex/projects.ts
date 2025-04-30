import { internal } from "./_generated/api";
import {
	internalAction,
	internalMutation,
	internalQuery,
	query,
} from "./_generated/server";
import { algoliasearch } from "algoliasearch";
import { createFetchRequester } from "@algolia/requester-fetch";
import { Octokit } from "octokit";
import { v } from "convex/values";

export const updateProject = internalMutation({
	args: {
		repos: v.array(v.any()),
	},
	handler: async (ctx, args) => {
		const existinData = await ctx.db.query("projects").collect();

		for (const doc of existinData) {
			await ctx.db.delete(doc._id);
		}
		const insertions = await Promise.all(
			args.repos.map(async (repo) => await ctx.db.insert("projects", repo)),
		);
		return insertions;
	},
});

export const getProjects = query({
	args: {},
	handler: async (ctx, args) => {
		const projects = await ctx.db.query("projects").collect();
		return projects;
	},
});

export const getGithubRepos = internalAction({
	args: {},
	handler: async (ctx, args) => {
		const octokit = new Octokit({
			auth: process.env.GITHUB_TOKEN,
		});
		const request = await octokit.request(
			`GET /users/${process.env.GITHUB_OWNER}/repos`,
			{
				username: process.env.GITHUB_OWNER,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			},
		);

		const { data, headers, status } = request;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const names = (data as any[]).map((repo) => repo.name);
		const repos = await Promise.all(
			names.map(
				async (name) =>
					await octokit.request(
						`GET /repos/${process.env.GITHUB_OWNER}/${name}`,
						{
							owner: process.env.GITHUB_OWNER,
							repo: name,
							headers: {
								"X-GitHub-Api-Version": "2022-11-28",
							},
						},
					),
			),
		);

		const response = repos.map((repo) => repo.data);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const mutation: any = await ctx.runMutation(
			internal.projects.updateProject,
			{ repos: response },
		);
		return mutation;
	},
});

export const getAllProjects = internalQuery({
	args: {},
	handler: async (ctx, args) => {
		const projects = await ctx.db.query("projects").collect();
		return projects;
	},
});

export const updateSearchIndex = internalAction({
	args: {},
	handler: async (ctx, args) => {
		try {
			const client = algoliasearch(
				process.env.ALGOLIA_APP_ID || "",
				process.env.ALGOLIA_APP_KEY || "",
				{
					requester: createFetchRequester(),
				},
			);
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const response: any = await ctx.runQuery(
				internal.projects.getAllProjects,
			);
			await client.saveObjects({ indexName: "projects", objects: response });
			return response;
		} catch (error) {
			console.error("Error updating search index:", error);
			throw new Error("Failed to update search index");
		}
	},
});

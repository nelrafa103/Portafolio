import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const insertFeaturedProject = mutation({
	args: {
		project: v.any(),
	},
	handler: async ({ db }, args) => {
		const project = await db.insert("featuredProjects", args.project);
		return project;
	},
});


export const getAllFeaturedProjects = query({
    args: {},
    handler: async ({ db }, args) => {
        const projects = await db.query("featuredProjects").collect();
        return projects;
    },
})
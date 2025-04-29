import { api, internal } from "./_generated/api";
import { internalAction, internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
export const getLastYoutubeVideo = internalAction({
	args: {},
	handler: async (ctx, args) => {
		const request = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${process.env.CHANNEL_ID}&key=${process.env.API_KEY}`,
		);

		const [_, response] = (await request.json()).items;

    ctx.runMutation(internal.youtube.deleteAllVideos)
		const insertion = await ctx.runMutation(
			internal.youtube.setLastYoutubeVideo,
			{
				id: response.id.videoId,
			},
		);
		console.log(insertion);
	},
});

export const setLastYoutubeVideo = internalMutation({
	args: {
		id: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("videos", {
			channelId: process.env.CHANNEL_ID,
			videoId: args.id,
		});
	},
});

export const queryLastYoutubeVideo = query({
	args: {},
	handler: async (ctx, args) => {
		const video = await ctx.db.query("videos").take(1);
		return video;
	},
});

export const getAllVideos = query({
	args: {},
	handler: async (ctx, args) => {
		const videos = await ctx.db.query("videos").collect();
		return videos;
	},
});

export const deleteAllVideos = internalMutation({
	args: {},
	handler: async (ctx, args) => {
		const videos = await ctx.db.query("videos").collect();
		const deletions = await Promise.all(
			videos.map(async (video) => await ctx.db.delete(video._id)),
		);
    return deletions;
	},
});

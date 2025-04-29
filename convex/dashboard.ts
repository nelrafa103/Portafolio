import { query } from "./_generated/server";

export const getAmountOfVideos = query({
    args: {},
    handler: async ({ db }) => {
        const videos = await db.query("videos").collect();
        return videos.length;
    },
})

export const getAmountOfMissingMessages = query({
    args: {},
    handler: async ({ db }) => {
        const messages = await db.query("messages").collect();
        const missingMessages = messages.filter((message) => message.status === "missing");
        return missingMessages.length;
    },
})
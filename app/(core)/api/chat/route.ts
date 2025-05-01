import { google } from "@ai-sdk/google";

import { streamText } from "ai";
import { CoreMessage } from "ai";
import { coreMessageSchema } from "ai";
import data from "@/samples/sample1.json";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
	const { messages } = await req.json();

	const info = data.data.map((item) => item.chunk_text);

	const systemMessage = {
		role: "system",
		content: `
      Context about Nelcido:
    ${info}

      Please use this information to provide relevant answers about Nelcido.
    `,
	};

	const messagesWithContext = [systemMessage, ...messages];
	/*  (messages as Array<unknown>).push(personalInfo);
  (messages as Array<unknown>).push(profesionalInfo);
  (messages as Array<unknown>).push(aspirations);
  (messages as Array<unknown>).push(skills); */

	const result = streamText({
		model: google("gemini-2.0-flash"),
		messages: messagesWithContext,
	});

	return result.toDataStreamResponse({
		getErrorMessage: errorHandler,
	});
}

function errorHandler(error: unknown) {
	if (error == null) {
		return "unknown error";
	}

	if (typeof error === "string") {
		return error;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return JSON.stringify(error);
}

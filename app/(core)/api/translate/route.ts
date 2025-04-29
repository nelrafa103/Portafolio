import { NextResponse, type NextRequest } from "next/server";
import { TranslationServiceClient } from "@google-cloud/translate";
async function POST(req: NextRequest) {
	const { contents } = await req.json();
	const client = new TranslationServiceClient({
		keyFilename: "./portafolio-458003-69a6daeb5774.json",
	});
	const request = {
		parent: `projects/${process.env.GOOGLE_PROJECT_ID}`,
		contents,
		mimeType: "text/plain",
		targetLanguageCode: "en-US",
		sourceLanguageCode: "es-DO",
	};

    console.log("request", request);
	const translate = await client.translateText(request);

    return NextResponse.json({ data: translate, metadata: { headers: {}, status: 200 } })
}
export { POST };

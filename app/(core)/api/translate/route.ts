import { NextResponse, type NextRequest } from "next/server";
import Translationclient from "../../lib/translation";

async function POST(req: NextRequest) {
	const languageCodes = {
		targetLanguageCode: "",
		sourceLanguageCode: "",
	};
	const { contents } = await req.json();
	const headers = req.headers;
	const language = headers.get("Accept-Language") || "en";

	if (language.startsWith("en")) {
		languageCodes.targetLanguageCode = "en-US";
		languageCodes.sourceLanguageCode = "es-DO";
	} else {
		languageCodes.targetLanguageCode = "es-DO";
		languageCodes.sourceLanguageCode = "en-US";
	}

	const request = {
		parent: `projects/${process.env.GOOGLE_PROJECT_ID}`,
		contents,
		mimeType: "text/plain",
		...languageCodes,
	};

	const data = await Translationclient.translateText(request);

	return NextResponse.json({ data, metadata: { headers: {}, status: 200 } });
}
export { POST };

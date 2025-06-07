import { NextResponse, type NextRequest } from "next/server";
import Translationclient from "../../lib/translation";
import { setLanguageCodes } from "../../lib/language";

async function POST(req: NextRequest) {
  const { contents } = await req.json();
  const headers = req.headers;
  const language = headers.get("Accept-Language") || "en";

  const languageCode = setLanguageCodes(language);
  const request = {
    parent: `projects/${process.env.GOOGLE_PROJECT_ID}`,
    contents,
    mimeType: "text/plain",
    ...languageCode,
  };

  const data = await Translationclient.translateText(request);

  return NextResponse.json({ data, metadata: { headers: {}, status: 200 } });
}
export { POST };

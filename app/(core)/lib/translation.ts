import { TranslationServiceClient } from "@google-cloud/translate";

const Translationclient = new TranslationServiceClient({
	credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}"),
});


export default Translationclient
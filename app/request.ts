import { getRequestConfig } from "next-intl/server";
import { Langar } from "next/font/google";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
	// Provide a static locale, fetch a user setting,
	// read from `cookies()`, `headers()`, etc.

	let locale: string;
	const headersStore = await headers();
	const language = headersStore.get("Accept-Language") || "en";
	 
	if (language.startsWith("es")) {
    locale = "es"
  } else {
    locale = "en"
  }

	return {
		locale,
		messages: (await import(`@/app/i18n/${locale}.json`))
			.default,
	};
});

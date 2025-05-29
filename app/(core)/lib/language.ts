function setLanguageCodes(language: string) {
  if (language.startsWith("en")) {
    return {
      targetLanguageCode: "en-US",
      sourceLanguageCode: "es-DO",
    };
  } else {
    return {
      targetLanguageCode: "es-DO",
      sourceLanguageCode: "en-US",
    };
  }
}

export { setLanguageCodes };

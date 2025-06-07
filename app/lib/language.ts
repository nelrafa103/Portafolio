function setLanguageCodes(language: string) {
  if (language.startsWith("en")) {
    return {
      targetLanguageCode: "en-US",
      sourceLanguageCode: "es-DO",
    };
  }
  return {
    targetLanguageCode: "es-DO",
    sourceLanguageCode: "en-US",
  };
}

export { setLanguageCodes };

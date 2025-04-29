const config = {
  email: process.env.PERSONAL_EMAIL || "",
  convex: {
    url: process.env.NEXT_PUBLIC_CONVEX_URL || "",
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || "",
    sender: process.env.SENDGRID_SENDER || "",
  },
  github: {
    token: process.env.GITHUB_TOKEN || "",
    owner: process.env.GITHUB_OWNER || "",
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID || "",
    apiKey: process.env.ALGOLIA_API_KEY || "",
    indexName: process.env.ALGOLIA_INDEX_NAME || "",
  },
};

export default config;

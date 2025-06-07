import type { NextRequest } from "next/server";
import octokit from "../../lib/octokit";
import config from "@/app/config";
import { metadata } from "@/app/layout";
async function GET(req: NextRequest) {
  // Octokit.js
  // https://github.com/octokit/core.js#readme

  const request = await octokit.request(
    `GET /users/${config.github.owner}/repos`,
    {
      username: config.github.owner,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  const { data, headers, status } = request;
  if (status === 200) {
    return new Response(
      JSON.stringify({ data: data, metadata: { headers, status } }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify({ data: {}, metadata: { headers, status } }),
    {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
async function POST(request: NextRequest) {}
async function PUT(request: NextRequest) {}
async function DELETE(request: NextRequest) {}

export { GET, POST, PUT, DELETE };

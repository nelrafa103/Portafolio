import { type NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import convexClient from "../lib/convex";
import config from "@/app/config";
async function GET(req: NextRequest, res: NextResponse) {}

async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  try {
    const request = await convexClient.action(api.contactAction.sendContact, {
      to: config.email,
      from: config.sendgrid.sender,
      subject: "Contact Form Submission",
      text: `Someone with this email: ${formData.get("email")} wants to contact you`,
      email: formData.get("email") as string,
    });

    const response = request;
    if (response) {
      return NextResponse.redirect(new URL("/?success=true", req.url));
    }
    return NextResponse.redirect(new URL("/?success=false", req.url));
  } catch (error) {
    // Sentry capture here
    return NextResponse.redirect(new URL("/?success=false", req.url));
  }
}

export { GET, POST };

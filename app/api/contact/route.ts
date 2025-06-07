import { type NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import convexClient from "../../lib/convex";
import config from "@/app/config";

async function GET(req: NextRequest, res: NextResponse) {}

async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();
  try {
    const request = await convexClient.action(
      api.contactAction.requestContact,
      {
        name: formData.get("name")?.toString() || "",
        phone: formData.get("phoneNumber")?.toString() || "",
        from: config.sendgrid.sender,
        to: config.email,
        company: formData.get("companyName")?.toString() || "",
        country: formData.get("country")?.toString() || "",
      },
    );

    const response = request;
    if (response) {
      return NextResponse.redirect(new URL("/contact?succes=true", req.url));
    }
    return NextResponse.redirect(new URL("/contact?succes=false", req.url));
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export { GET, POST };

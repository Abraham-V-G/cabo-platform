import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tuemail@gmail.com",
      subject: "Direct Test Email",
      html: "<h1>This is a direct test email</h1>",
    });

    console.log("Resend response:", response);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ success: false, error });
  }
}